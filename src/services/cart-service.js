import db from "../models/index.js";
import { successResponse, throwError } from "../utils/response-utils.js";
import { checkInventoryByVariant } from "./inventory-service.js";

export const createCart = async (data) => {
	const [cart] = await db.Cart.findOrCreate({
		where: { user_id: data.user_id },
		defaults: {
			user_id: data.user_id,
		},
	});

	const foundProductVarian = await db.Product_variant.findOne({
		where: { id: data.product_variant_id },
		include: {
			model: db.Inventory,
			attributes: ["quantity"],
		},
	});
	if (!foundProductVarian) {
		throwError(404, "Sản phẩm không tồn tại!");
	}

	// Lấy dữ liệu item trong giỏ hàng
	const existingCartItem = await db.Cart_item.findOne({
		where: {
			product_variant_id: data.product_variant_id,
			cart_id: cart.id,
		},
	});
	if (existingCartItem) {
		// Kiểm tra kho còn hàng không, tổng lại số lượng hàng trong các kho của sản phẩm
		await checkInventoryByVariant(
			existingCartItem.product_variant_id,
			existingCartItem.quantity + 1,
		);
		await db.Cart_item.update(
			{
				quantity: existingCartItem.quantity + 1,
				price: (existingCartItem.quantity + 1) * foundProductVarian.price,
			},
			{
				where: {
					id: existingCartItem.id,
				},
			},
		);
		return successResponse(
			"Sản phẩm đã tồn tại, tăng số lượng sản phẩm trong giỏ hàng!",
		);
	}
	// Sản phẩm chưa tồn tại trong giỏ hàng

	await checkInventoryByVariant(data.product_variant_id, data.quantity);

	await db.Cart_item.create({
		cart_id: cart.id,
		product_variant_id: data.product_variant_id,
		quantity: data.quantity,
		price: foundProductVarian.price * data.quantity,
	});
	return successResponse("Thêm thành công!");
};

export const deleteCartItem = async (id, user) => {
	const itemExist = await db.Cart_item.findAll(
		{
			where: { id },
		},
		{
			include: {
				model: db.Cart,
				attributes: ["user_id"],
				where: {
					user_id: user.id,
				},
			},
		},
	);
	if (itemExist.Cart.user_id !== user.id) {
		throwError(
			403,
			"Bạn không thể xóa sản phẩm trong giỏ hàng của tài khoản khác!",
		);
	}
	if (!itemExist) {
		throwError(404, "Sản phẩm không tồn tại!");
	}
	await db.Cart_item.destroy({
		where: { id },
	});

	return successResponse("Xóa thành công!");
};

export const deleteCart = async (user_id, transaction = null) => {
	const foundCart = await db.Cart.findOne({
		where: { user_id },
	});
	if (!foundCart) {
		throwError(404, "Giỏ hàng không tồn tại!");
	}
	await db.Cart_item.destroy({
		where: { cart_id: foundCart.id },
		transaction,
	});
	await db.Cart.destroy({
		where: { id: foundCart.id },
		transaction,
	});
	return successResponse("Xóa thành công!");
};

export const getAllCart = async (user_id) => {
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
			user_id,
		},
	});
	return successResponse("Lấy danh sách giỏ hàng thành công!", response);
};

export const updateCart = async (id, data, user) => {
	const cartItemExist = await db.Cart_item.findOne({
		where: { id },
		include: {
			model: db.Cart,
			attributes: ["user_id"],
			where: { user_id: user.id },
		},
	});
	if (!cartItemExist) {
		throwError(404, "Sản phẩm này không tồn tại trong giỏ hàng !");
	}
	if (cartItemExist.Cart.user_id !== user.id) {
		throwError(
			403,
			"Bạn không thể cập nhật sản phẩm trong giỏ hàng của tài khoản khác!",
		);
	}

	if (data.quantity && data.quantity > 0) {
		// Kiểm tra tồn kho
		await checkInventoryByVariant(
			cartItemExist.product_variant_id,
			data.quantity,
		);
		await db.Cart_item.update(
			{
				quantity: data.quantity,
			},
			{
				where: { id },
			},
		);
	} else {
		await checkInventoryByVariant(
			cartItemExist.product_variant_id,
			cartItemExist.quantity + 1,
		);
		await db.Cart_item.update(
			{
				quantity: cartItemExist.quantity + 1,
			},
			{
				where: { id },
			},
		);
	}

	return successResponse("Cập nhật số lượng thành công!");
};
