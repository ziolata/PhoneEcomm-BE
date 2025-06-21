import db from "../models/index.js";
import { successResponse } from "../utils/response-utils.js";
export const createDiscount = async (data) => {
	const existingDiscount = await db.Discount_code.findOne({
		where: {
			code: data.code,
		},
	});
	// check mã giảm giá
	if (existingDiscount) {
		throw { status: 400, message: "Mã giảm giá đã tồn tại" };
	}
	const response = await db.Discount_code.create(data);
	return successResponse("Thêm mã khuyến mãi thành công!", response);
};
