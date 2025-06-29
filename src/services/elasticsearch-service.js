import db from "../models/index.js";
import { client } from "../config/elastic.js";
import { successResponse } from "../utils/response-utils.js";

export const searchWithElastic = async (query) => {
	const esResult = await client.search({
		index: "product_variants",
		body: {
			query: {
				multi_match: {
					query: query,
					fields: ["name", "sku", "category", "brand"],
					fuzziness: "AUTO",
				},
			},
		},
	});
	if (esResult.hits.hits.length > 0) {
		return successResponse(
			`Kết quả tìm kiếm từ khóa: ${query}`,
			esResult.hits.hits.map((hit) => hit._source),
		);
	}
	return successResponse(
		`Không tìm thấy dữ liệu với từ khóa tìm kiếm: ${query}`,
	);
};

export const filterProductVariants = async ({ brand, category }) => {
	const esResult = await client.search({
		index: "product_variants",
		body: {
			query: {
				bool: {
					filter: [
						...(brand ? [{ term: { "brand.keyword": brand } }] : []),
						...(category ? [{ term: { "category.keyword": category } }] : []),
					],
				},
			},
		},
	});

	if (esResult.hits.hits.length > 0) {
		return successResponse(
			"Dữ liệu đã lọc",
			esResult.hits.hits.map((hit) => hit._source),
		);
	}
	return successResponse("Không tìm thấy dữ liệu!");
};

export const syncProductVariantsToElastic = async () => {
	try {
		const productVariants = await db.Product_variant.findAll({
			include: [
				{
					model: db.Product,
					attributes: ["name", "category_id"],
					include: [
						{ model: db.Category, attributes: ["name"] },
						{ model: db.Brand, attributes: ["name"] },
					],
				},
				{
					model: db.Variant_option_value,
					attributes: ["option_value_id"],
					include: {
						model: db.Option_value,
						attributes: ["value"],
						include: { model: db.Option, attributes: ["name"] },
					},
				},
			],
		});

		const total = productVariants.length;
		console.log(`Tổng số biến thể cần đồng bộ: ${total}`);

		let count = 0;

		for (const product of productVariants) {
			await client.index({
				index: "product_variants",
				id: String(product.id),
				body: {
					name: product.Product?.name || null,
					sku: product.sku,
					price: String(product.price),
					category: product.Product?.Category?.name || null,
					brand: product.Product?.Brand?.name || null,
				},
			});
			count++;

			// Tính phần trăm
			const percent = ((count / total) * 100).toFixed(2);
			console.log(`Đồng bộ: ${count}/${total} (${percent}%)`);
		}

		console.log("✅ Đồng bộ hoàn tất!");
		return { message: "Đồng bộ thành công!" };
	} catch (error) {
		console.error("❌ Lỗi khi đồng bộ:", error);
		throw error;
	}
};
