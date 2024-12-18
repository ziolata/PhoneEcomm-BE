import * as Services from "../services/product_service";
import { uploadImage } from "../utils/cloudinary";

export const addProductController = async (req, res) => {
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
		console.log(error);
		return res.status(500).json({
			error: -1,
			message: "Server Internal Error",
		});
	}
};
export const updateProductController = async (req, res) => {
	try {
		const imgFile = req.files.img;
		const imgUrl = await uploadImage(
			imgFile.tempFilePath,
			req.body.name,
			"Product",
		);
		req.body.img = imgUrl;
		const response = await Services.addProduct(req.body);
		return res.status(201).json(response);
	} catch (error) {
		return res.status(500).json({
			error: -1,
			message: "Server Internal Error",
		});
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
export const getProductController = async (req, res) => {
	try {
		const response = await Services.getProduct();
		return res.status(200).json(response);
	} catch (error) {
		return res.status(500).json({
			error: -1,
			message: "Server Internal Error",
		});
	}
};
export const getOneProductController = async (req, res) => {
	try {
		const { id } = req.params;
		const response = await Services.getOneProduct(id);
		return res.status(200).json(response);
	} catch (error) {
		return res.status(500).json({
			error: -1,
			message: "Server Internal Error",
		});
	}
};
