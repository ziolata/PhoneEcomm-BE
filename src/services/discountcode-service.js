import db from "../models/index.js";
import { mapPaginateResult } from "../utils/pagenation-utils.js";
import { successResponse, throwError } from "../utils/response-utils.js";
export const createDiscount = async (data) => {
	const existingDiscount = await db.Discount_code.findOne({
		where: {
			code: data.code,
		},
	});
	// check mã giảm giá
	if (existingDiscount) {
		throw { status: 400, message: "Mã giảm giá đã tồn tại!" };
	}
	const response = await db.Discount_code.create(data);
	return successResponse("Thêm mã khuyến mãi thành công!", response);
};

export const getAllDiscount = async (page = 1, discount_type = null) => {
	const limit = 10;
	const where = {};
	if (discount_type) {
		where.discount_type = discount_type;
	}
	const paginateResult = await db.Discount_code.paginate({
		page,
		paginate: limit,
		order: [["createdAt", "DESC"]],
	});

	const result = mapPaginateResult(page, paginateResult);

	return successResponse("Lấy danh sách mã giảm giá thành công!", result);
};

export const deleteDiscount = async (id) => {
	const foundDiscount = await db.Discount_code.findByPk(id);
	if (!foundDiscount) {
		throwError(404, "Mã giảm giá không tồn tại!");
	}
	await db.Discount_code.destroy({ where: { id } });
	return successResponse("Xóa thành công!");
};

export const applyDiscount = async (discountCode, user) => {
	const NOW = new Date();
	const dateOnly = NOW.toISOString().split("T")[0];

	const foundCode = await db.Discount_code.findOne({
		where: {
			code: discountCode,
		},
	});
	if (!foundCode) {
		throw { status: 404, message: "Mã giảm giá không tồn tại!" };
	}
	await db.Discount_code.update(
		{ used_count: foundCode.used_count + 1 },
		{
			where: { id: foundCode.id },
		},
	);
	const isUsedCode = await db.User_Discount.findOne({
		where: {
			user_id: user,
			discount_code_id: foundCode.id,
		},
	});

	if (dateOnly >= foundCode.expiry) {
		throw { status: 400, message: "Mã giảm giá đã hết thời gian sử dụng!" };
	}
	if (
		foundCode.usage_limit !== null &&
		foundCode.usage_limit === foundCode.used_count
	) {
		throw { status: 400, message: "Mã giảm giả đã hết số lần sử dụng!" };
	}
	if (foundCode.usage_limit === null && isUsedCode) {
		throw { status: 400, message: "Mã giảm giá đã được sử dụng!" };
	}
	return foundCode;
};
