import db, { sequelize } from "../models/index.js";
import { successResponse, throwError } from "../utils/response-utils.js";
import { client } from "../config/elastic.js";

const getProductVariantOrThrowById = async (id) => {
	const foundProductVariant = await db.Product_variant.findByPk(id);
	if (!foundProductVariant) {
		throwError(404, "Không tìm thấy biến thể sản phẩm!");
	}
	return foundProductVariant;
};

export const createProductVariant = async (data) => {
	const transaction = await sequelize.transaction();
	try {
		const existingProduct = await db.Product.findByPk(data.product_id);
		if (!existingProduct) {
			throwError(404, "Sản phẩm không tồn tại!");
		}
		const response = await db.Product_variant.create(data, { transaction });
		//  Thêm option Value cho Product Variant
		if (data.Option_value && data.Option_value.length > 0) {
			const OptionValue = data.Option_value.map((value) => ({
				product_variant_id: response.id,
				option_value_id: value.id,
			}));
			const valueIdExist = await db.Option_value.findAll({
				where: {
					id: OptionValue.map((i) => i.option_value_id),
				},
			});
			if (valueIdExist.length !== OptionValue.length) {
				throwError(404, "Một số value option không hợp lệ!");
			}
			await db.Variant_option_value.bulkCreate(OptionValue, { transaction });
		}
		await transaction.commit();
		const productInfo = await db.Product.findOne({
			where: {
				id: response.product_id,
			},
			include: [
				{
					model: db.Category,
					attributes: ["name"],
				},
				{
					model: db.Brand,
					attributes: ["name"],
				},
			],
		});
		// Đồng bộ dữ liệu Product Variant vào Elasticsearch
		await client.index({
			index: "product_variants", // Index name
			id: String(response.id),
			body: {
				name: productInfo.name,
				sku: response.sku,
				price: response.price,
				category: productInfo.Category.name,
				brand: productInfo.Brand.name,
			},
		});
		return successResponse("Thêm thành công!", response);
	} catch (error) {
		await transaction.rollback();
		throw error;
	}
};

export const getAllProductVariant = async () => {
	const response = await db.Product_variant.findAll();
	return successResponse(
		"Lấy danh sách biến thể sản phẩm thành công!",
		response,
	);
};

export const getOneProductVariant = async (id) => {
	const foundProductVarian = await getProductVariantOrThrowById(id);
	return successResponse(
		`Lấy thông tin biến thể sản phẩm có id:${id} thành công! `,
		foundProductVarian,
	);
};

export const updateProductVariant = async (data, id) => {
	await getProductVariantOrThrowById(id);
	const foundProduct = await db.Product.findByPk(data.product_id);
	if (foundProduct) {
		throw { status: 404, message: "Product id không tồn tại!" };
	}
	const response = await db.Product_variant.update(
		{
			product_id: data.product_id,
			img: data.img,
			sku: data.sku,
			price: data.price,
		},
		{
			where: { id },
		},
	);
	// Đồng bộ lại dữ liệu Product Variant khi cập nhật vào Elasticsearch
	await client.index({
		index: "product_variants", // Index name
		id: String(response.id),
		body: {
			name: foundProduct.name,
			sku: response.sku,
			price: response.price,
		},
	});
	return successResponse("Cập nhật thành công!");
};

export const deleteProductVariant = async (id) => {
	await getProductVariantOrThrowById(id);
	await db.Product_variant.destroy({
		where: { id },
	});
	// Xóa dữ liệu khỏi elastic đồng bộ với database
	await client.delete({
		index: "product_variants",
		id: String(id),
	});
	return successResponse("Xóa thành công!");
};
