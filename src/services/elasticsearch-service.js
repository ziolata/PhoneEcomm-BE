import db from "../models/index.js";
import { client } from "../config/elastic.js";

export const searchWithElastic = async (query) => {
	try {
		const esResult = await client.search({
			index: "product_variants",
			body: {
				query: {
					multi_match: {
						query: query,
						fields: ["name", "sku"],
						fuzziness: "AUTO",
					},
				},
			},
		});

		if (esResult.hits.hits.length > 0) {
			return {
				source: "Elasticsearch",
				data: esResult.hits.hits.map((hit) => hit._source),
			};
		}
	} catch (error) {
		console.log(error);
	}
};

export const syncProductVariantsToElastic = async () => {
	try {
		// Đồng bộ dữ liệu từ bảng product_varian sang index cùng tên trong elastic
		const productVariants = await db.Product_variant.findAll({
			include: [
				{
					model: db.Product,
					attributes: ["name", "category_id"],
					include: {
						model: db.Category,
						attributes: ["name"],
					},
				},
				{
					model: db.Variant_option_value,
					attributes: ["option_value_id"],
					include: {
						model: db.Option_value,
						attributes: ["value"],
						include: {
							model: db.Option,
							attributes: ["name"],
						},
					},
				},
			],
		});
		for (const product of productVariants) {
			await client.index({
				index: "product_variants",
				id: String(product.id),
				body: {
					name: product.Product.name ? product.Product.name : null,
					sku: product.sku,
					price: String(product.price),
					category: product.Product.Category.name,
				},
			});
		}
		console.log("Đồng bộ hoàn tất!");
		return { message: "Đồng bộ thành công!" };
	} catch (error) {
		console.log(error);
	}
};
