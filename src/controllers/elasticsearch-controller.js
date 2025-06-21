import * as services from "../services/elasticsearch-service.js";

export const searchWithElasticSearchController = async (req, res, next) => {
	try {
		const { query } = req.query;
		const response = await services.searchWithElastic(query);
		return res.status(200).json(response);
	} catch (error) {
		next(error);
	}
};
export const syncElastic = async (req, res, next) => {
	try {
		const response = await services.syncProductVariantsToElastic();
		console.log("response:", response);
		return res.status(200).json(response);
	} catch (error) {
		next(error);
	}
};
