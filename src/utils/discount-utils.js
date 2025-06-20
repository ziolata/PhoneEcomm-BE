import db from "../models";

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
	const isUsedCode = await db.User_Discount.findOne({
		where: {
			user_id: user,
			discount_code_id: foundCode.id,
		},
	});

	if (dateOnly >= foundCode.expiry) {
		throw { status: 400, message: "Mã giảm giá đã hết thời gian sử dụng!" };
	}
	if (foundCode.usage_limit === foundCode.used_count) {
		throw { status: 400, message: "Mã giảm giả đã hết số lần sử dụng!" };
	}
	if (isUsedCode) {
		throw { status: 400, message: "Bạn đã sử dụng mã giảm giá này!" };
	}
	return foundCode;
};
