import db from "../models";

export const getDataInventory = async () => {
	try {
		const response = await db.Inventory.findAll();
		return { data: response };
	} catch (error) {
		console.log(error);
		throw error;
	}
};
export const addInventory = async (data) => {
	try {
		const response = await db.Inventory.create(data);
		return { data: response };
	} catch (error) {
		console.log(error);
		throw error;
	}
};
export const updateStock = async (data, param) => {
	try {
		const response = await db.Stock.update(data, {
			where: {
				id: param,
			},
		});
		return { data: response };
	} catch (error) {
		console.log(error);
		throw error;
	}
};
export const deleteStock = async (param) => {
	try {
		await db.Stock.destroy({
			where: {
				id: param,
			},
		});
		return { message: "Delete successfully" };
	} catch (error) {}
};
