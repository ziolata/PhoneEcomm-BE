import * as services from "../services/inventory-service.js";

export const getAllInventoryController = async (req, res) => {
	try {
		const response = await services.getAllInventory();
		return res.status(200).json(response);
	} catch (error) {
		console.log(error);
	}
};
export const getOneInventoryController = async (req, res) => {
	try {
		const { id } = req.params;
		const response = await services.getOneInventory(id);
		return res.status(200).json(response);
	} catch (error) {
		console.log(error);
	}
};
export const createInventoryController = async (req, res) => {
	try {
		const response = await services.addInventory(req.body);
		return res.status(201).json(response);
	} catch (error) {
		const status = error.status;
		const message = error.message;
		return res.status(status).json({ message });
	}
};
export const updateInventoryController = async (req, res) => {
	try {
		const { id } = req.params;
		const response = await services.updateInventory(req.body, id);
		return res.status(200).json(response);
	} catch (error) {
		const status = error.status;
		const message = error.message;
		return res.status(status).json({ message });
	}
};
export const deleteInventoryController = async (req, res) => {
	try {
		const response = await services.deleteInventory(req.params);
		return res.status(200).json(response);
	} catch (error) {
		const status = error.status;
		const message = error.message;
		return res.status(status).json({ message });
	}
};
