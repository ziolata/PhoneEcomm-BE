import db, { sequelize } from "../models/index.js";
import { successResponse, throwError } from "../utils/response-utils.js";
import { handleValidate } from "../utils/handle-validation-utils.js";
import {
	productVariantValidate,
	updateProductVariantValidate,
} from "../validations/product-vadidation.js";
import { client } from "../config/elastic.js";

// Tạo mã Sku dựa trên id sản phẩm
const generateSku = (id) => {
	const prefix = "SP-";
	const idString = String(id).padStart(6, "0"); // '000123'
	return prefix + idString; // 'SP-000123'
};
const getProductVariantOrThrowById = async (id) => {
	const foundProductVariant = await db.Product_variant.findByPk(id, {
		include: [
			{
				model: db.Product,
				attributes: ["name"],
			},
			{
				model: db.Variant_option_value,
				attributes: ["id"],
				include: [
					{
						model: db.Option_value,
						attributes: ["value"],
						include: [
							{
								model: db.Option,
								attributes: ["name"],
							},
						],
					},
				],
			},
		],
	});
	if (!foundProductVariant) {
		throwError(404, "Không tìm thấy biến thể sản phẩm!");
	}
	return foundProductVariant;
};

export const createProductVariant = async (data) => {
	const transaction = await sequelize.transaction();
	try {
		const validData = handleValidate(productVariantValidate, data);
		const existingProduct = await db.Product.findByPk(validData.product_id);
		if (!existingProduct) {
			throwError(404, "Sản phẩm không tồn tại!");
		}
		const response = await db.Product_variant.create(validData, {
			transaction,
		});
		//  Thêm option Value cho Product Variant
		if (
			validData.Option_value &&
			Array.isArray(validData.Option_value) &&
			validData.Option_value.length > 0
		) {
			// Tạo ra mảng gồm product_variant_id và option_value_id
			const OptionValue = validData.Option_value.map((value) => ({
				product_variant_id: response.id,
				option_value_id: value,
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
		const sku = generateSku(response.id);
		await db.Product_variant.update(
			{ sku: sku },
			{ where: { id: response.id }, transaction },
		);
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
	const response = await db.Product_variant.findAll({
		include: [
			{
				model: db.Product,
				attributes: ["name"],
			},
			{
				model: db.Variant_option_value,
				attributes: ["id"],
				include: [
					{
						model: db.Option_value,
						attributes: ["value"],
						include: [
							{
								model: db.Option,
								attributes: ["name"],
							},
						],
					},
				],
			},
		],
	});
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
	const validData = handleValidate(updateProductVariantValidate, data);
	await db.Product_variant.update(
		{
			product_id: validData.product_id,
			img: validData.img,
			sku: validData.sku,
			price: validData.price,
		},
		{
			where: { id },
		},
	);
	// Lấy lại thông tin productVariant mới cập nhật!
	const updatedProductVariant = await db.Product_variant.findByPk(id, {
		include: [{ model: db.Product, attributes: ["name"] }],
	});
	// Đồng bộ lại dữ liệu Product Variant khi cập nhật vào Elasticsearch
	await client.index({
		index: "product_variants", // Index name
		id: String(response.id),
		body: {
			name: updatedProductVariant.Product.name,
			sku: updatedProductVariant.sku,
			price: updatedProductVariant.price,
		},
	});
	return successResponse("Cập nhật thành công!");
};

export const deleteProductVariant = async (id) => {
	await getProductVariantOrThrowById(id);
	// Xóa dữ liệu trong Variant_option_value trước
	await db.Variant_option_value.destroy({
		where: { product_variant_id: id },
	});
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
