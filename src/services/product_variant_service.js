import db from "../models";

export const addProduct_variant = async (data) => {
	try {
		const response = await db.Product_variant.create(data);
		return { data: response };
	} catch (error) {
		console.log(error);
	}
};
