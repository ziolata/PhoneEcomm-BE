import db, { sequelize } from "../models/index.js";
import {
	calculateDistance,
	calculateShippingFee,
} from "../utils/calculate-utils.js";
import { sendEmailOrder } from "../utils/email-utils.js";
import { successResponse, throwError } from "../utils/response-utils.js";
import { deleteCart } from "./cart-service.js";
import { applyDiscount } from "./discountcode-service.js";
import {
	checkInventoryByVariant,
	nereastInventory,
} from "./inventory-service.js";

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
		const productVariantData = [];
		let warehouseAddress = null;
		// Lấy dữ liệu từ giỏ hàng
		const CartData = await db.Cart.findOne({
			where: {
				user_id,
			},
			include: {
				model: db.Cart_item,
				attributes: ["product_variant_id", "quantity"],
			},
		});
		if (!CartData) {
			throwError(404, "Giỏ hàng đang trống không thể đặt hàng!");
		}
		const foundEmail = await db.User.findOne({
			where: {
				id: user_id,
			},
		});
		const totalInfo = await calculateTotalPrice(
			user_id,
			data.discount_code,
			CartData.Cart_items,
		);
		// Tạo dữ liệu order
		const response = await db.Order.create(
			{
				user_id,
				total_amount: totalInfo.totalPrice,
				discount_code_id: totalInfo.foundCode ? totalInfo.foundCode.id : null,
			},
			{ transaction },
		);

		const foundAddress = await db.Address.findOne({
			where: {
				id: data.shipping.address_id,
				user_id,
			},
		});

		if (!foundAddress) {
			throwError(404, "Địa chỉ nhận hàng không tồn tại!");
		}
		// Tạo các order item dựa trên dữ liệu của giỏ hàng

		for (const q of CartData.Cart_items) {
			const productData = await db.Product_variant.findByPk(
				q.product_variant_id,
			);
			warehouseAddress = await nereastInventory(
				productData.id,
				foundAddress.address_line_1,
			);
			productVariantData.push(productData);
			await checkInventoryByVariant(q.product_variant_id, q.quantity);
			await db.Order_item.create(
				{
					order_id: response.id,
					product_variant_id: q.product_variant_id,
					quantity: q.quantity,
					price: productData.price * q.quantity,
				},
				{ transaction },
			);
		}

		// Tính phi ship
		const feeShipByKm = await calculateShippingFee(
			foundAddress.address_line_1,
			warehouseAddress,
		);
		if (!data.shipping) {
			throw { status: 400, message: "Vui lòng cập nhật địa chỉ nhận hàng!" };
		}
		// Lưu các thông tin liên quan đến ship.
		await db.Shipping.create(
			{
				order_id: response.id,
				address_id: data.shipping.address_id,
				type: data.shipping.type,
				status: "pending",
				Shipfee: totalInfo.totalPrice * 0.005 + feeShipByKm,
			},
			{ transaction },
		);

		// Xóa giỏ hàng khi đã checkout thành công

		await deleteCart(user_id, transaction);
		// Đảm bảo mọi dòng code đều chạy đúng và lưu thay đổi
		await transaction.commit();
		await sendEmailOrder(foundEmail.email, productVariantData);
		return successResponse("Đặt hàng thành công!", response);
	} catch (error) {
		// Rollback lại những thứ đã lưu khi có lỗi
		await transaction.rollback();
		throw error;
	}
};

export const deleteOrder = async (id) => {
	try {
		const foundOrder = await db.Order.findByPk(id);
		if (!foundOrder) {
			throw {
				status: 404,
				message: "Đơn đặt hàng không tồn tại, xóa không thành công!",
			};
		}
		await db.Order.destroy({
			where: { id },
		});

		return { message: "Xóa thành công!" };
	} catch (error) {
		console.error(error);
		throw new Error("Database Error");
	}
};

export const updateOrder = async (data, id) => {
	try {
		const orderData = await db.Order.findOne({
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
		if (orderData.status === data.status) {
			throw {
				status: 400,
				message: `Trạng thái đang là:${orderData.status} `,
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
			let nereastStock = null;
			for (const e of orderData.Order_items) {
				let minDistance = Number.POSITIVE_INFINITY;
				const findProduct = await db.Product_variant.findByPk(
					e.product_variant_id,
					{
						include: {
							model: db.Inventory,
							attributes: ["id", "quantity", "location"],
						},
					},
				);

				for (const s of findProduct.Inventories) {
					const inventory = await db.Inventory.findByPk(s.id);
					// Tính khoảng cách từ địa chỉ giao hàng đến vị trí của kho
					const distance = await calculateDistance(
						orderData.Shipping.Address.address_line_1,
						inventory.location,
					);
					// Kiểm tra xem kho này có gần hơn kho hiện tại và còn đủ hàng không
					if (distance < minDistance && s.quantity > e.quantity) {
						minDistance = distance;
						nereastStock = s;
					}
				}
				if (!nereastStock) {
					throw {
						status: 400,
						message: "Kho hết hàng! không thể đổi trạng thái!",
					};
				}
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

		return { message: "Cập nhật trạng thái thành công", data: orderData };
	} catch (error) {
		console.error(error);
		throw error;
	}
};

export const getAllOrder = async (user) => {
	try {
		const response = await db.Order.findAll({
			include: [
				{
					model: db.Order_item,
					attributes: ["id", "product_variant_id", "quantity", "price"],
				},
				{
					model: db.Shipping,
					attributes: ["id"],
				},
			],
			where: {
				user_id: user,
			},
		});
		if (response) {
			return {
				data: response,
			};
		}
	} catch (error) {
		console.error(error);
		throw error;
	}
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
