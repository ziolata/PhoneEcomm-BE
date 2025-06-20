import * as services from "../services/product-variant-service.js";
import { uploadImage } from "../utils/cloudinary-utils.js";

export const createProductVariantController = async (req, res) => {
	try {
		const imgFile = req.files?.img;
		const imgUrl = await uploadImage(
			imgFile.tempFilePath,
			req.body.name,
			"ProductVariant",
		);
		req.body.img = imgUrl;
		const response = await services.createProductVariant(req.body);
		return res.status(201).json(response);
	} catch (error) {
		const status = error.status;
		const message = error.message;
		return res.status(status).json({ message });
	}
};

export const getAllProductVariantController = async (req, res) => {
	try {
		const response = await services.getAllProductVariant(req.body);
		return res.status(200).json(response);
	} catch (error) {
		console.log(error);
	}
};

export const getOneProductVariantController = async (req, res) => {
	try {
		const { id } = req.params;
		const response = await services.getOneProductVariant(id);
		return res.status(200).json(response);
	} catch (error) {
		console.log(error);
	}
};
export const updateProductVariantController = async (req, res) => {
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
		const response = await services.updateProductVariant(req.body, id);
		return res.status(200).json(response);
	} catch (error) {
		const status = error.status;
		const message = error.message;
		return res.status(status).json({ message });
	}
};
export const deleteProductVariantController = async (req, res) => {
	try {
		const { id } = req.params;
		const response = await services.deleteProductVariant(id);
		return res.status(200).json(response);
	} catch (error) {
		const status = error.status;
		const message = error.message;
		return res.status(status).json({ message });
	}
};
