import db from "../models/index.js";
import { successResponse, throwError } from "../utils/response-utils.js";
import { mapPaginateResult } from "../utils/pagenation-utils.js";

export const getShippingByOrderId = async (page = 1, order_id = null) => {
	const limit = 10;
	const paginateResult = await db.Shipping.paginate({
		page,
		paginate: limit,
		where: { order_id },
		order: [["createdAt", "DESC"]],
		include: [
			{
				model: db.Address,
			},
			{
				model: db.Order,
				attributes: ["id", "total_amount", "status"],
				include: [
					{
						model: db.User,
						attributes: ["id", "email"],
					},
				],
			},
		],
	});

	const result = mapPaginateResult(page, paginateResult);

	return successResponse("Lấy danh sách địa chỉ nhận hàng thành công!", result);
};

export const getAllShipping = async (page = 1, email = null) => {
	const limit = 10;
	const where = {};
	if (email) {
		where.email = email;
	}
	const paginateResult = await db.Shipping.paginate({
		page,
		paginate: limit,
		order: [["createdAt", "DESC"]],
		include: [
			{
				model: db.Address,
			},
			{
				model: db.Order,
				attributes: ["id", "total_amount", "status"],
				include: [
					{
						model: db.User,
						attributes: ["id", "email"],
						where,
					},
				],
			},
		],
	});

	const result = mapPaginateResult(page, paginateResult);

	return successResponse("Lấy danh sách địa chỉ nhận hàng thành công!", result);
};

export const updateShipping = async (id, data) => {
	const foundShipping = await db.Shipping.findByPk(id);
	if (!foundShipping) {
		throwError(404, "Địa chỉ nhận hàng không tồn tại!");
	}
	await db.Shipping.update(data, { where: { id } });
	return successResponse("Cập nhật thành công!");
};

export const deleteShipping = async (id) => {
	const foundShipping = await db.Shipping.findByPk(id);
	if (!foundShipping) {
		throwError(404, "Địa chỉ nhận hàng không tồn tại!");
	}
	await db.Shipping.destroy({ where: { id } });
	return successResponse("Xóa thành công!");
};
