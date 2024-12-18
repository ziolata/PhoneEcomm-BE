import * as services from "../services/product_variant_service";

export const addProductVariantController = async (req, res) => {
	try {
		const response = await services.addProduct_variant(req.body);
		return res.status(201).json(response);
	} catch (error) {
		console.log(error);
	}
};
