import db from "../models";
export const addDiscount = async (data) => {
	try {
		const findDiscount = await db.Discount_code.findOne({
			where: {
				code: data.code,
			},
		});
		if (findDiscount) {
			throw { status: 400, message: "Discount code already exists" };
		}
		const response = await db.Discount_code.create(data);
		if (response) {
			return { data: response };
		}
	} catch (error) {
		console.error(error);
		throw error;
	}
};
