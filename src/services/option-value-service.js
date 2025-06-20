import db from "../models/index.js";

export const createOptionValue = async (data) => {
	try {
		const existingValue = await db.Option_value.findOne({
			where: {
				value: data.value,
			},
		});
		if (existingValue) {
			throw { status: 404, message: "Giá trị đã tồn tại!" };
		}
		const response = await db.Option_value.create(data);
		return { data: response };
	} catch (error) {
		console.log(error);
	}
};
export const getAllOptionValue = async () => {
	try {
		const response = await db.Option_value.findAll();
		return { data: response };
	} catch (error) {
		console.log(error);
		throw error;
	}
};
