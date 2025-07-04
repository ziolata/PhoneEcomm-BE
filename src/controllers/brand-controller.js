import * as Services from "../services/brand-service.js";
import { uploadImage } from "../utils/cloudinary-utils.js";

export const createBrandController = async (req, res, next) => {
	try {
		const response = await Services.createBrand(req.body, req.files?.img);
		return res.status(201).json(response);
	} catch (error) {
		next(error);
	}
};

export const updateBrandController = async (req, res, next) => {
	try {
		const { id } = req.params;
		const response = await Services.updateBrand(id, req.body, req.files?.img);
		return res.status(200).json(response);
	} catch (error) {
		next(error);
	}
};

export const deleteBrandController = async (req, res, next) => {
	try {
		const { id } = req.params;
		const response = await Services.deleteBrand(id);
		return res.status(200).json(response);
	} catch (error) {
		next(error);
	}
};

export const getAllBrandController = async (req, res, next) => {
	try {
		const response = await Services.getAllBrand();
		return res.status(200).json(response);
	} catch (error) {
		next(error);
	}
};

export const getOneBrandController = async (req, res, next) => {
	try {
		const { id } = req.params;
		const response = await Services.getOneBrand(id);
		return res.status(200).json(response);
	} catch (error) {
		next(error);
	}
};
