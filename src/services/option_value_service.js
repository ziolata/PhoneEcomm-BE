import db from "../models";

export const addOptionValue = async (data) => {
	try {
		const response = await db.Option_value.create(data);
		return { data: response };
	} catch (error) {
		console.log(error);
	}
};
