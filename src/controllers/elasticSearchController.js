import * as services from "../services/elasticSearch_service";

export const searchWithElasticSearchController = async (req, res) => {
	try {
		console.log(req.query);

		const { query } = req.query;
		const response = await services.searchWithElastic(query);
		console.log("response:", response);

		return res.status(200).json(response);
	} catch (error) {
		console.log(error);
	}
};
export const syncElastic = async (req, res) => {
	try {
		const response = await services.syncProductVariantsToElastic();
		console.log("response:", response);

		return res.status(200).json(response);
	} catch (error) {
		console.log(error);
	}
};
