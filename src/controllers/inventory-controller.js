import * as services from "../services/inventory-service.js";

export const getAllInventoryController = async (req, res, next) => {
	try {
		const page = Number.parseInt(req.query.page) || 1;
		const name = req.query.name;
		const response = await services.getAllInventory(page, name);
		return res.status(200).json(response);
	} catch (error) {
		next(error);
	}
};

export const getOneInventoryController = async (req, res, next) => {
	try {
		const { id } = req.params;
		const response = await services.getOneInventory(id);
		return res.status(200).json(response);
	} catch (error) {
		next(error);
	}
};

export const getInventoryByVariantIdController = async (req, res, next) => {
	try {
		const { product_variant_id } = req.params;
		const response = await services.getInventoryByVariantId(product_variant_id);
		return res.status(200).json(response);
	} catch (error) {
		next(error);
	}
};

export const createInventoryController = async (req, res, next) => {
	try {
		const response = await services.createInventory(req.body);
		return res.status(201).json(response);
	} catch (error) {
		next(error);
	}
};

export const updateInventoryController = async (req, res, next) => {
	try {
		const { id } = req.params;
		const response = await services.updateInventory(req.body, id);
		return res.status(200).json(response);
	} catch (error) {
		next(error);
	}
};

export const deleteInventoryController = async (req, res, next) => {
	try {
		const { id } = req.params;
		const response = await services.deleteInventory(id);
		return res.status(200).json(response);
	} catch (error) {
		next(error);
	}
};
