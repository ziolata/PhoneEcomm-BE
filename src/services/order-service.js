import db, { sequelize } from "../models/index.js";
import { sendEmailOrder } from "../utils/email-utils.js";
import { mapPaginateResult } from "../utils/pagenation-utils.js";
import { successResponse, throwError } from "../utils/response-utils.js";
import { deleteCart } from "./cart-service.js";
import { applyDiscount } from "./discountcode-service.js";
import { calculateShippingFee } from "./geocode-service.js";
import { nereastInventory } from "./inventory-service.js";

//Tính tổng giá trị đơn hàng
const calculateTotalPrice = async (user, discount, itemData) => {
	let totalPrice = 0;
	let foundCode = null;
	let fix_amount = null;
	if (discount) {
		foundCode = await applyDiscount(discount, user);
	}
	for (const q of itemData) {
		const foundProduct = await db.Product_variant.findByPk(
			q.product_variant_id,
		);
		// Có áp mã giảm giá
		if (!foundProduct) {
			throwError(404, `Sản phẩm có id:${q.product_variant_id} không tồn tại!`);
		}
		if (foundCode) {
			// Điều kiện của code trừ theo %

			if (foundCode.discount_type === "percentage_discount") {
				if (
					foundCode.target_type === "all" ||
					(foundCode.target_type === "product_variant" &&
						foundCode.target_id === q.product_variant_id) ||
					(foundCode.target_type === "category" &&
						foundCode.target_id === foundProduct.category_id) ||
					(foundCode.target_type === "brand" &&
						foundCode.target_id === foundProduct.brand_id &&
						foundProduct.price >= foundCode.min_value)
				) {
					// Số tiền được giảm giá
					let max_discount_amount =
						(foundCode.value * foundProduct.price) / 100;

					if (
						foundCode.max_discount_amount &&
						max_discount_amount >= foundCode.max_discount_amount
					) {
						max_discount_amount = foundCode.max_discount_amount;
					}
					foundProduct.price = foundProduct.price - max_discount_amount;
				}
			}
			// Điều kiện của code trừ thẳng giá tiền
			if (foundCode.discount_type === "fixed_amount_discount") {
				if (
					foundCode.target_type === "all" ||
					(foundCode.target_type === "product_variant" &&
						foundCode.target_id === q.product_variant_id) ||
					(foundCode.target_type === "category" &&
						foundCode.target_id === foundProduct.category_id) ||
					(foundCode.target_type === "brand" &&
						foundCode.target_id === foundProduct.brand_id)
				) {
					fix_amount = true;
				}
			}
		}
		totalPrice += fix_amount
			? q.quantity * foundProduct.price - foundCode.value
			: q.quantity * foundProduct.price;
	}
	if (foundCode) {
		await db.User_Discount.create({
			user_id: user,
			discount_code_id: foundCode.id,
		});
	}
	return { totalPrice: totalPrice, foundCode };
};

export const createOrder = async (data, user_id) => {
	// Khởi tạo transaction
	const transaction = await sequelize.transaction();
	try {
		const productVariantData = []; // Lưu SP để gửi email
		const warehouseAddresses = []; // Lưu các kho của từng SP
		const orderItems = []; // Lưu dữ liệu để bulk insert

		// Lấy dữ liệu từ giỏ hàng
		const foundCart = await db.Cart.findOne({
			where: { user_id },
			include: {
				model: db.Cart_item,
				attributes: ["product_variant_id", "quantity"],
			},
		});
		if (!foundCart) {
			throwError(404, "Giỏ hàng đang trống không thể đặt hàng!");
		}

		// Lấy email user
		const foundEmail = await db.User.findOne({
			where: { id: user_id },
		});

		// Tính tổng giá + kiểm tra mã giảm giá
		const totalInfo = await calculateTotalPrice(
			user_id,
			data.discount_code,
			foundCart.Cart_items,
		);

		// Tạo đơn hàng
		const createdOrder = await db.Order.create(
			{
				user_id,
				total_amount: totalInfo.totalPrice,
				discount_code_id: totalInfo.foundCode ? totalInfo.foundCode.id : null,
			},
			{ transaction },
		);

		// Lấy địa chỉ giao hàng
		const foundAddress = await db.Address.findOne({
			where: {
				id: data.shipping.address_id,
				user_id,
			},
		});
		if (!foundAddress) {
			throwError(404, "Địa chỉ nhận hàng không tồn tại!");
		}

		// Tạo order_item thành một mảng, tìm kho gần nhất
		for (const q of foundCart.Cart_items) {
			// Lấy dữ liệu sản phẩm variant
			const productData = await db.Product_variant.findByPk(
				q.product_variant_id,
			);
			productVariantData.push(productData);

			// Tìm kho gần nhất và kiểm tra tồn kho
			const warehouse = await nereastInventory(
				q.product_variant_id,
				foundAddress.address_line_1,
				q.quantity,
			);
			warehouseAddresses.push(warehouse.location);

			// Chuẩn bị dữ liệu để bulk insert
			orderItems.push({
				order_id: createdOrder.id,
				product_variant_id: q.product_variant_id,
				quantity: q.quantity,
				price: productData.price * q.quantity,
			});
		}

		// Bulk insert order items
		await db.Order_item.bulkCreate(orderItems, { transaction });

		//Tính phí ship dựa trên tất cả warehouse ====
		const shippingFees = await Promise.all(
			warehouseAddresses.map((wa) =>
				calculateShippingFee(foundAddress.address_line_1, wa),
			),
		);
		const shippingFee = Math.min(...shippingFees);

		if (!data.shipping) {
			throw { status: 400, message: "Vui lòng cập nhật địa chỉ nhận hàng!" };
		}

		// Lưu thông tin shipping
		await db.Shipping.create(
			{
				order_id: createdOrder.id,
				address_id: data.shipping.address_id,
				type: data.shipping.type,
				status: "pending",
				Shipfee: totalInfo.totalPrice * 0.005 + shippingFee,
			},
			{ transaction },
		);

		// Xoá giỏ hàng sau khi checkout thành công
		await deleteCart(user_id, transaction);

		// Commit transaction
		await transaction.commit();

		// Gửi email thông tin đơn hàng
		await sendEmailOrder(foundEmail.email, productVariantData);

		return successResponse("Đặt hàng thành công!", createdOrder);
	} catch (error) {
		// Rollback nếu có lỗi
		await transaction.rollback();
		throw error;
	}
};

export const deleteOrder = async (id) => {
	const foundOrder = await db.Order.findByPk(id);
	if (!foundOrder) {
		throwError(404, "Đơn đặt hàng không tồn tại, xóa không thành công!");
	}
	await db.Order.destroy({
		where: { id },
	});

	return { message: "Xóa thành công!" };
};

export const updateOrder = async (data, id) => {
	const foundOrder = await db.Order.findOne({
		where: { id },
		include: [
			{
				model: db.Order_item,
				attributes: ["id", "product_variant_id", "quantity", "price"],
			},
			{
				model: db.Shipping,
				attributes: ["shipfee"],
				include: {
					model: db.Address,
					attributes: ["address_line_1"],
				},
			},
		],
	});

	// Kiểm tra tránh cùng một trạng thái cập nhật nhiều lần
	if (foundOrder.status === data.status) {
		throw {
			status: 400,
			message: `Trạng thái đang là:${foundOrder.status} `,
		};
	}
	await db.Order.update(
		{
			status: data.status,
		},
		{
			where: { id },
		},
	);
	// Cập nhật lại tồn kho khi status shipping
	if (data.status === "shipping") {
		for (const e of foundOrder.Order_items) {
			const nereastStock = await nereastInventory(
				e.product_variant_id,
				foundOrder.Shipping.Address.address_line_1,
				e.quantity,
			);
			await db.Inventory.update(
				{ quantity: nereastStock.quantity - e.quantity },
				{
					where: {
						id: nereastStock.id,
					},
				},
			);
		}
	}

	return successResponse("Cập nhật thành công!");
};

export const getOrderByUser = async (page = 1, user_id = null) => {
	const limit = 10;
	const paginateResult = await db.Order.paginate({
		page,
		paginate: limit,
		where: { user_id },
		order: [["createdAt", "DESC"]],
		include: [
			{
				model: db.Order_item,
				attributes: ["id", "product_variant_id", "quantity", "price"],
			},
			{
				model: db.Shipping,
			},
		],
	});
	const result = mapPaginateResult(page, paginateResult);
	return successResponse("Lấy danh sách đơn hàng thành công!", result);
};

export const getAllOrder = async (page = 1, email = null) => {
	const limit = 10;
	const where = {};
	if (email) {
		where.email = email;
	}
	const paginateResult = await db.Order.paginate({
		page,
		paginate: limit,
		order: [["createdAt", "DESC"]],
		include: [
			{
				model: db.Order_item,
				attributes: ["id", "product_variant_id", "quantity", "price"],
			},
			{
				model: db.Shipping,
				attributes: ["id"],
			},
			{
				model: db.User,
				attributes: ["email"],
				where,
			},
		],
	});
	const result = mapPaginateResult(page, paginateResult);
	return successResponse("Lấy danh sách đơn hàng thành công!", result);
};

export const getOneOrder = async (id, user) => {
	const foundOrder = await db.Order.findByPk(id);
	if (foundOrder.user_id !== user.id && user.role !== "ADMIN") {
		throwError(403, "Bạn không có quyền coi đơn hàng của tài khoản khác!");
	}
	if (!foundOrder) {
		throwError(404, "Không tìm thấy đơn hàng!");
	}
	return successResponse("Lấy thông tin đơn hàng thành công", foundOrder);
};
