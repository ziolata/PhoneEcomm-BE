import db from "../models";

export const addCart = async (data) => {
	try {
		let idCart;
		const existingCart = await db.Cart.findOne({
			where: {
				user_id: data.user_id,
			},
		});
		const existingCartItem = await db.Cart_item.findOne({
			where: {
				product_variant_id: data.cart_item.product_variant_id,
			},
		});
		const productVariant = await db.Product_variant.findOne({
			where: { id: data.cart_item.product_variant_id },
			include: {
				model: db.Inventory,
				attributes: ["quantity"],
			},
		});
		if (!existingCart) {
			const cart = await db.Cart.create(data);
			idCart = cart.id;
		}
		for (const inventory of productVariant.Inventories) {
			if (inventory.quantity < data.cart_item.quantity) {
				throw { status: 400, message: "Out of Inventories" };
			}
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
		} else {
			await db.Cart_item.create({
				cart_id: idCart ? idCart : existingCart.id,
				product_variant_id: data.cart_item.product_variant_id,
				quantity: data.cart_item.quantity,
				price: productVariant.price * data.cart_item.quantity,
			});
		}
	} catch (error) {
		console.error(error);
		throw error;
	}
};
export const deleteProduct = async (param) => {
	try {
		await db.Cart.destroy({
			where: { id: param },
		});

		return { message: "Delete Successfully" };
	} catch (error) {
		console.error(error);
		throw new Error("Database Error");
	}
};
export const getCart = async (user) => {
	try {
		const response = await db.Cart.findAll({
			attributes: ["id", "quantity"],
			include: {
				model: db.Product,
				attributes: ["id", "name", "img"],
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
		throw new Error("Database Error");
	}
};
