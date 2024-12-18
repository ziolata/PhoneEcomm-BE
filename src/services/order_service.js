import db from "../models";
import { Nearest } from "../utils/NearestStock";
export const addOrder = async (data) => {
	try {
		const NOW = new Date();
		const dateOnly = NOW.toISOString().split("T")[0];
		let total_price = 0;
		total_price = Number.parseFloat(total_price);
		const discount = await db.Discount_code.findOne({
			where: {
				code: data.discount_code,
			},
		});
		const CartData = await db.Cart.findOne({
			where: {
				user_id: data.user_id,
			},
			include: {
				model: db.Cart_item,
				attributes: ["product_variant_id", "quantity"],
			},
		});
		for (const e of CartData.Cart_items) {
			console.log(e);
		}

		if (data.discount_code) {
			if (!discount) {
				throw { status: 400, message: "Voucher code does not exist" };
			}
			const checkUseDiscount = await db.Order.findOne({
				where: {
					discount_id: discount.id,
				},
			});
			if (checkUseDiscount) {
				throw { status: 400, message: "Voucher code already used" };
			}
			if (dateOnly <= discount.expiry) {
				throw { status: 400, message: "Voucher code has expired" };
			}
		}

		for (const q of CartData.Cart_items) {
			const productData = await db.Product_variant.findByPk(
				q.product_variant_id,
			);

			if (discount) {
				if (discount.discount_type === "percentage_discount") {
					if (discount.target_type === "all") {
						productData.price =
							productData.price - (discount.value * productData.price) / 100;
					} else if (
						discount.target_type === "product" &&
						discount.target_id === q.product_variant_id
					) {
						productData.price =
							productData.price - (discount.value * productData.price) / 100;
					} else if (
						discount.target_type === "category" &&
						discount.target_id === productData.category_id
					) {
						productData.price =
							productData.price - (discount.value * productData.price) / 100;
					} else if (
						discount.target_type === "brand" &&
						discount.target_id === productData.brand_id
					) {
						productData.price =
							productData.price - (discount.value * productData.price) / 100;
					}
				}
				if (discount.discount_type === "fixed_amount_discount") {
					if (discount.target_type === "all") {
						productData.price = productData.price - discount.value;
					} else if (
						discount.target_type === "product" &&
						discount.target_id === q.product_variant_id
					) {
						productData.price = productData.price - discount.value;
					} else if (
						discount.target_type === "category" &&
						discount.target_id === productData.category_id
					) {
						productData.price = productData.price - discount.value;
					} else if (
						discount.target_type === "brand" &&
						discount.target_id === productData.brand_id
					) {
						productData.price = productData.price - discount.value;
					}
					total_price += q.quantity * productData.price;
				}
			} else {
				total_price += q.quantity * productData.price;
			}
		}
		const response = await db.Order.create({
			user_id: data.user_id,
			total_amount: total_price + (total_price * 0.015 + 15000),
			discount_code_id: discount ? discount.id : null,
		});
		for (const q of CartData.Cart_items) {
			const productData = await db.Product_variant.findByPk(
				q.product_variant_id,
			);
			await db.Order_item.create({
				order_id: response.id,
				product_variant_id: q.product_variant_id,
				quantity: q.quantity,
				price: productData.price * q.quantity,
			});
		}
		await db.Shipping.create({
			order_id: response.id,
			address_id: data.shipping.address_id,
			type: data.shipping.type,
			status: "pending",
			shipfee: total_price * 0.015 + 15000,
		});

		// await db.Cart.destroy({
		// 	where: {
		// 		user_id: data.user_id,
		// 	},
		// });
		return {
			data: response,
		};
	} catch (error) {
		console.log(error);
		throw error;
	}
};
export const deleteOrder = async (param) => {
	try {
		await db.Order.destroy({
			where: { id: param },
		});

		return { message: "Delete Successfully" };
	} catch (error) {
		console.error(error);
		throw new Error("Database Error");
	}
};
export const updateOrder = async (data, param) => {
	try {
		const orderData = await db.Order.findByPk(param, {
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
		// Kiểm tra request status được gửi
		if (orderData.status !== data.status) {
			await db.Order.update(
				{
					status: data.status,
				},
				{
					where: { id: param },
				},
			);
			// Cập nhật lại tồn kho
			if (data.status === "shipping") {
				for (const e of orderData.Order_items) {
					let nereastStock = null;
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
						const findStock = await db.Inventory.findByPk(s.id);
						// Kiểm tra khoảng cách giữa kho và địa chỉ nhận hàng

						console.log(`log address: ${orderData.Shipping.Address}`);

						const distance = await Nearest(
							orderData.Shipping.Address.address_line_1,
							findStock.location,
						);
						if (distance < minDistance && s.quantity > e.quantity) {
							minDistance = distance;
							nereastStock = s;
						}
					}
					if (!nereastStock) {
						throw { status: 400, message: "Out of Inventoríes" };
					}
					await db.Inventory.update(
						{ quantity: nereastStock.quantity - e.quantity },
						{
							where: {
								id: nereastStock.id,
							},
						},
					);
					console.log(
						`Cập nhật tồn kho thành công tại kho ${nereastStock.id} cho sản phẩm ${e.product_variant_id}`,
					);
				}
			}

			return { message: "Update Successfully", data: orderData };
		}

		throw { status: 400, message: `Order status ${orderData.status} already` };
	} catch (error) {
		console.error(error);
		throw error;
	}
};
export const getOrder = async (user) => {
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
		throw new Error("Database Error");
	}
};
