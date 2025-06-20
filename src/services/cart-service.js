import db from "../models/index.js";

export const createCart = async (data) => {
	try {
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
		console.log(productVariant);

		if (!existingCart) {
			const cart = await db.Cart.create(data);
			cartId = cart.id;
		}

		if (productVariant) {
			if (productVariant.Inventories.length === 0) {
				throw { status: 404, message: "Không tìm thấy kho hàng của sản phẩm!" };
			}
			const existingCartItem = await db.Cart_item.findOne({
				where: {
					product_variant_id: data.product_variant_id,
				},
			});
			for (const inventory of productVariant.Inventories) {
				totalQuantity += inventory.quantity;
			}
			console.log(totalQuantity);

			if (totalQuantity < existingCartItem.quantity + 1) {
				throw { status: 400, message: "Sản phẩm đã hết hàng!" };
			}
			if (totalQuantity < data.quantity) {
				throw { status: 400, message: "Sản phẩm đã hết hàng!" };
			}
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
				return { message: "Cập nhật thành công!" };
			} else {
				await db.Cart_item.create({
					cart_id: cartId ? cartId : existingCart.id,
					product_variant_id: data.product_variant_id,
					quantity: data.quantity,
					price: productVariant.price * data.quantity,
				});
				return { message: "Thêm thành công" };
			}
		}
	} catch (error) {
		console.error(error);
		throw error;
	}
};
export const deleteCartItem = async (param) => {
	try {
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
			throw { status: 400, message: "Sản phẩm không tồn tại!" };
		}
		await db.Cart_item.destroy({
			where: { id: param },
		});

		return { message: "Xóa thành công!" };
	} catch (error) {
		console.error(error);
		throw error;
	}
};
export const getAllCart = async (user) => {
	try {
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
export const updateCart = async (data) => {
	try {
		const cartItemExist = await db.Cart_item.findOne(
			{
				where: data.id,
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
		const isInStock = await db.Product_variant.findOne(
			{
				where: {
					id: cartItemExist.product_variant_id,
				},
			},
			{
				include: {
					model: Inventory,
					attributes: ["quantity"],
					where: {
						quantity: { [Op.gt]: 0 },
					},
				},
			},
		);
		if (!cartItemExist || !isInStock) {
			throw { status: 404, message: "Hàng hoặc kho không tồn tại" };
		}
		await db.Cart_item.update(
			{
				quantity: cartItemExist.quantity + 1,
			},
			{
				where: {
					id: data.id,
				},
			},
		);
		return { message: "Cập nhật số lượng thành công!" };
	} catch (error) {
		console.log(error);
		throw error;
	}
};
