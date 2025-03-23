import db from "../models";

export const createAddress = async (data) => {
	try {
		const response = await db.Address.create(data);
		return { data: response };
	} catch (error) {
		console.log(error);
		throw error;
	}
};
export const getAllAddress = async () => {
	try {
		const response = await db.Address.findAll();
		return response;
	} catch (error) {
		console.log(error);
		throw error;
	}
};
