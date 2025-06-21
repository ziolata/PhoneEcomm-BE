import db from "../models/index.js";
import { successResponse, throwError } from "../utils/response-utils.js";

export const createCart = async (data) => {
	let cartId;
	let totalQuantity = 0;
	const existingCart = await db.Cart.findOne({
		where: {
			user_id: data.user_id,
		},
	});

	const productVariant = await db.Product_variant.findOne({
		where: { id: data.product_variant_id },
		include: {
			model: db.Inventory,
			attributes: ["quantity"],
		},
	});
	// Tài khoản chưa tạo giỏ hàng
	if (!existingCart) {
		const cart = await db.Cart.create(data);
		cartId = cart.id;
	}

	if (productVariant) {
		// Kiểm tra kho hàng của sản phẩm nếu sản phẩm tồn tại
		if (productVariant.Inventories.length === 0) {
			throwError(404, "Không tìm thấy kho hàng của sản phẩm!");
		}
		// Lấy dữ liệu item trong giỏ hàng
		const existingCartItem = await db.Cart_item.findOne({
			where: {
				product_variant_id: data.product_variant_id,
			},
		});
		// Tính tổng số lượng trong kho của sản phẩm
		for (const inventory of productVariant.Inventories) {
			totalQuantity += inventory.quantity;
		}
		if (totalQuantity < existingCartItem.quantity + 1) {
			throw { status: 400, message: "Sản phẩm đã hết hàng!" };
		}
		if (totalQuantity < data.quantity) {
			throw { status: 400, message: "Sản phẩm đã hết hàng!" };
		}
		// Sản phẩm đã tồn tại trong giỏ hàng khi click thêm hàng thì sẽ + 1 vào số lượng
		if (existingCartItem) {
			await db.Cart_item.update(
				{
					quantity: existingCartItem.quantity + 1,
					price: (existingCartItem.quantity + 1) * productVariant.price,
				},
				{
					where: {
						id: existingCartItem.id,
					},
				},
			);
			return successResponse("Sản phẩm đã tồn tại trong giỏ hàng!");
		}
		// Sản phẩm chưa tồn tại trong giỏ hàng
		await db.Cart_item.create({
			cart_id: cartId ? cartId : existingCart.id,
			product_variant_id: data.product_variant_id,
			quantity: data.quantity,
			price: productVariant.price * data.quantity,
		});
		return successResponse("Thêm thành công!");
	}
};

export const deleteCartItem = async (param) => {
	const itemExist = await db.Cart_item.findAll(
		{
			where: { id: param },
		},
		{
			include: {
				model: Cart,
				attributes: ["user_id"],
				where: {
					user_id: user_id,
				},
			},
		},
	);
	if (!itemExist) {
		throwError(404, "Sản phẩm không tồn tại!");
	}
	await db.Cart_item.destroy({
		where: { id: param },
	});

	return successResponse("Xóa thành công!");
};

export const getAllCart = async (user) => {
	const response = await db.Cart.findAll({
		include: {
			model: db.Cart_item,
			attributes: ["id", "quantity", "price"],
			include: {
				model: db.Product_variant,
				attributes: ["id", "img", "sku", "price"],
			},
		},
		where: {
			user_id: user,
		},
	});
	return successResponse("Lấy danh sách giỏ hàng thành công!", response);
};

export const updateCart = async (id, user_id) => {
	const cartItemExist = await db.Cart_item.findOne({
		where: { id },
		include: {
			model: Cart,
			attributes: ["user_id"],
			where: { user_id },
		},
	});
	// Chỉ  tiếp tục nếu sản phẩm được thêm số lượng có quantity > 0
	const isInStock = await db.Product_variant.findOne({
		where: {
			id: cartItemExist.product_variant_id,
		},
		include: {
			model: Inventory,
			attributes: ["quantity"],
			where: {
				quantity: { [Op.gt]: 0 },
			},
		},
	});
	if (!cartItemExist || !isInStock) {
		throwError(404, "Hàng hoặc kho không tồn tại!");
	}
	await db.Cart_item.update(
		{
			quantity: cartItemExist.quantity + 1,
		},
		{
			where: { id },
		},
	);
	return successResponse("Cập nhật số lượng thành công!");
};
