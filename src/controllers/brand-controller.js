import * as Services from "../services/brand-service.js";
import { uploadImage } from "../utils/cloudinary-utils.js";

export const createBrandController = async (req, res, next) => {
	try {
		const imgFile = req.files.img;
		const uploadResult = await uploadImage(
			imgFile.tempFilePath,
			req.body.name,
			"Brand",
		);
		req.body.img = uploadResult;
		const response = await Services.addBrand(req.body);
		return res.status(201).json(response);
	} catch (error) {
		next(error);
	}
};

export const updateBrandController = async (req, res, next) => {
	try {
		const { id } = req.params;
		if (req.files?.img) {
			const imgFile = req.files.img;
			const uploadResult = await uploadImage(
				imgFile.tempFilePath,
				req.body.name,
				"Brand",
			);
			req.body.img = uploadResult;
		}
		const response = await Services.updateBrand(id, data);
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
