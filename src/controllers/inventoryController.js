import * as services from "../services/inventory_service";

export const getInventoryController = async (req, res) => {
	try {
		const response = await services.getDataInventory();
		return res.status(200).json(response);
	} catch (error) {
		console.log(error);
	}
};
export const addInventoryController = async (req, res) => {
	try {
		const response = await services.addInventory(req.body);
		return res.status(201).json(response);
	} catch (error) {
		console.log(error);
		return { error };
	}
};
export const updateStockController = async (req, res) => {
	try {
		const response = await services.updateStock(req.body, req.params);
		return res.status(200).json(response);
	} catch (error) {
		console.log(error);
		return { error };
	}
};
export const deleteStockController = async (req, res) => {
	try {
		const response = await services.deleteStock(req.params);
		return res.status(203).json(response);
	} catch (error) {
		console.log(error);
		return { error };
	}
};
