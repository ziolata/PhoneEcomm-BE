import * as Services from "../services/product-service.js";
import { uploadImage } from "../utils/cloudinary-utils.js";

export const createProductController = async (req, res, next) => {
	try {
		const imgFile = req.files?.img;
		const imgUrl = await uploadImage(
			imgFile.tempFilePath,
			req.body.name,
			"Product",
		);
		req.body.img = imgUrl;
		console.log(req.body);
		const response = await Services.addProduct(req.body);

		return res.status(201).json(response);
	} catch (error) {
		next(error);
	}
};

export const updateProductController = async (req, res, next) => {
	try {
		const { id } = req.params;
		if (req.files?.img) {
			const imgFile = req.files.img;
			const imgUrl = await uploadImage(
				imgFile.tempFilePath,
				req.body.name,
				"Product",
			);

			req.body.img = imgUrl;
		}
		const response = await Services.updateProduct(req.body, id);
		return res.status(200).json(response);
	} catch (error) {
		next(error);
	}
};

export const deleteProductController = async (req, res, next) => {
	try {
		const { id } = req.params;
		const response = await Services.deleteProduct(id);
		return res.status(200).json(response);
	} catch (error) {
		next(error);
	}
};

export const getAllProductController = async (req, res, next) => {
	try {
		const response = await Services.getAllProduct();
		return res.status(200).json(response);
	} catch (error) {
		next(error);
	}
};

export const getOneProductController = async (req, res, next) => {
	try {
		const { id } = req.params;
		const response = await Services.getOneProduct(id);
		return res.status(200).json(response);
	} catch (error) {
		next(error);
	}
};
