import db from "../models/index.js";
import { successResponse, throwError } from "../utils/response-utils.js";

export const getShippingByOrderId = async (order_id) => {
	const foundShipping = await db.Shipping.findOne({ where: { order_id } });
	if (!foundShipping) {
		throwError(404, "Đơn hàng không tồn tại!");
	}
	return successResponse("Lấy địa chỉ nhận hàng thành công!");
};

export const updateShipping = async (id, data) => {
	const foundShipping = await db.Shipping.findByPk(id);
	if (!foundShipping) {
		throwError(404, "Địa chỉ nhận hàng không tồn tại!");
	}
	await db.Shipping.update(data, { where: { id } });
	return successResponse("Cập nhật thành công!");
};

export const deleteShipping = async (id, data) => {
	const foundShipping = await db.Shipping.findByPk(id);
	if (!foundShipping) {
		throwError(404, "Địa chỉ nhận hàng không tồn tại!");
	}
	await db.Shipping.destroy({ where: { id } });
	return successResponse("Xóa thành công!");
};
