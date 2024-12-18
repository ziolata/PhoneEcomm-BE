import db from "../models";

export const addOption = async (data) => {
	try {
		const response = await db.Option.create(data);
		return { data: response };
	} catch (error) {
		console.log(error);
	}
};
