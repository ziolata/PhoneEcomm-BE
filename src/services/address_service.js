import db from "../models";

export const addAddress = async (data) => {
	try {
		const response = await db.Address.create(data);
		return response;
	} catch (error) {
		console.log(error);
		throw error;
	}
};
