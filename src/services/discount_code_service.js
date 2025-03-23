import db from "../models";
export const createDiscount = async (data) => {
	try {
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
		return { data: response };
	} catch (error) {
		console.error(error);
		throw error;
	}
};
