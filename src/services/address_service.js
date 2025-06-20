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
export const getAllAddress = async (user) => {
	try {
		const response = await db.Address.findAll({
			where: {
				user_id: user,
			},
		});
		return response;
	} catch (error) {
		console.log(error);
		throw error;
	}
};
