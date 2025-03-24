import db from "../models";
import { calculateDistance } from "../helper/calculateDistance";
import { sendEmailOrder } from "../helper/sendEmail";
import { CalculateTotalPrice } from "../helper/discountHelper";
export const createOrder = async (data) => {
	try {
		const productVariantData = [];

		// Lấy dữ liệu từ giỏ hàng
		const CartData = await db.Cart.findOne({
			where: {
				user_id: data.user_id,
			},
			include: {
				model: db.Cart_item,
				attributes: ["product_variant_id", "quantity"],
			},
		});

		const foundEmail = await db.User.findOne({
			where: {
				id: data.user_id,
			},
		});
		const totalInfo = await CalculateTotalPrice(
			data.user_id,
			data.discount_code,
			CartData.Cart_items,
		);
		console.log(totalInfo);

		// Tạo dữ liệu order
		const response = await db.Order.create({
			user_id: data.user_id,
			total_amount: totalInfo.totalPrice,
			discount_code_id: totalInfo.foundCode ? totalInfo.foundCode.id : null,
		});
		// Tạo các order item dựa trên dữ liệu của giỏ hàng
		for (const q of CartData.Cart_items) {
			const productData = await db.Product_variant.findByPk(
				q.product_variant_id,
			);
			productVariantData.push(productData);
			await db.Order_item.create({
				order_id: response.id,
				product_variant_id: q.product_variant_id,
				quantity: q.quantity,
				price: productData.price * q.quantity,
			});
		}

		// Lưu các thông tin liên quan đến ship.
		// if (!data.shipping) {
		// 	throw { status: 400, message: "Vui lòng cập nhật địa chỉ nhận hàng!" };
		// }
		// await db.Shipping.create({
		// 	order_id: response.id,
		// 	address_id: data.shipping.address_id,
		// 	type: data.shipping.type,
		// 	status: "pending",
		// 	shipfee: total_price * 0.015 + 15000,
		// });
		// Xóa giỏ hàng khi đã checkout thành công
		await db.Cart.destroy({
			where: {
				user_id: data.user_id,
			},
		});

		sendEmailOrder(foundEmail.email, productVariantData);
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
		const foundOrder = await db.Order.findByPk(param);
		if (!foundOrder) {
			throw {
				status: 404,
				message: "Đơn đặt hàng không tồn tại, xóa không thành công!",
			};
		}
		await db.Order.destroy({
			where: { id: param },
		});

		return { message: "Xóa thành công!" };
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
				where: { id: param },
			},
		);
		// Cập nhật lại tồn kho khi status shipping
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
				console.log(
					`Cập nhật tồn kho thành công tại kho ${nereastStock.id} cho sản phẩm ${e.product_variant_id}`,
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
					attributes: [
						"id",
						"product_variant_id",
						"quantity",
						"price",
						"status",
					],
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
