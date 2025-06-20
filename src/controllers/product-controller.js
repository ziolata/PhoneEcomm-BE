import * as Services from "../services/product-service.js";
import { uploadImage } from "../utils/cloudinary-utils.js";

export const createProductController = async (req, res) => {
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
		const status = error.status;
		const message = error.message;
		return res.status(status).json({ message });
	}
};
export const updateProductController = async (req, res) => {
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
		const status = error.status;
		const message = error.message;
		return res.status(status).json({ message });
	}
};
export const deleteProductController = async (req, res) => {
	try {
		const { id } = req.params;
		const response = await Services.addProduct(id);
		return res.status(200).json(response);
	} catch (error) {
		return res.status(500).json({
			error: -1,
			message: "Server Internal Error",
		});
	}
};
export const getAllProductController = async (req, res) => {
	try {
		const response = await Services.getProduct();
		return res.status(200).json(response);
	} catch (error) {
		console.log(error);
	}
};
export const getOneProductController = async (req, res) => {
	try {
		const { id } = req.params;
		const response = await Services.getOneProduct(id);
		return res.status(200).json(response);
	} catch (error) {
		console.log(error);
	}
};
