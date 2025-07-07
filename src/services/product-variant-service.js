import db, { sequelize } from "../models/index.js";
import { successResponse, throwError } from "../utils/response-utils.js";
import { handleValidate } from "../utils/handle-validation-utils.js";
import {
	productVariantValidate,
	updateProductVariantValidate,
} from "../validations/product-validation.js";
import { uploadImage } from "../utils/cloudinary-utils.js";
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
						attributes: ["id", "value"],
						include: [
							{
								model: db.Option,
								attributes: ["id", "name"],
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

export const createProductVariant = async (data, imgFile) => {
	const transaction = await sequelize.transaction();
	try {
		// Gắn giá trị cho img nếu có file gửi lên
		if (imgFile) {
			data.img = { size: imgFile.size };
		}
		const validData = handleValidate(productVariantValidate, data);

		const checkProduct = await db.Product.findByPk(validData.product_id);
		if (!checkProduct) {
			throwError(404, "Sản phẩm không tồn tại!");
		}
		// Giá trị img trong valid tồn tại thì bắt đầu upload và lấy url upload gắn vào valid.img
		const image = await uploadImage(
			imgFile.tempFilePath,
			validData.name,
			"Product-Variants",
		);
		validData.img = image;

		const createdProductVariant = await db.Product_variant.create(validData, {
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
				product_variant_id: createdProductVariant.id,
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
		const sku = generateSku(createdProductVariant.id);
		await db.Product_variant.update(
			{ sku: sku },
			{ where: { id: createdProductVariant.id }, transaction },
		);
		const productInfo = await db.Product.findOne({
			where: {
				id: createdProductVariant.product_id,
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
			id: String(createdProductVariant.id),
			body: {
				name: productInfo.name,
				sku: sku,
				price: response.price,
				category: productInfo.Category.name,
				brand: productInfo.Brand.name,
			},
		});
		await transaction.commit();

		return successResponse("Thêm thành công!", createdProductVariant);
	} catch (error) {
		await transaction.rollback();
		throw error;
	}
};

export const getAllProductVariant = async () => {
	const foundProductVariants = await db.Product_variant.findAll({
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
						attributes: ["id", "value"],
						include: [
							{
								model: db.Option,
								attributes: ["id", "name"],
							},
						],
					},
				],
			},
		],
	});
	return successResponse(
		"Lấy danh sách biến thể sản phẩm thành công!",
		foundProductVariants,
	);
};

export const getOneProductVariant = async (id) => {
	const foundProductVarian = await getProductVariantOrThrowById(id);
	return successResponse(
		"Lấy thông tin biến thể thành công! ",
		foundProductVarian,
	);
};

export const updateProductVariant = async (id, data, imgFile) => {
	await getProductVariantOrThrowById(id);

	if (imgFile) {
		data.img = { size: imgFile.size };
	}

	const validData = handleValidate(updateProductVariantValidate, data);

	if (validData.img) {
		const image = await uploadImage(
			imgFile.tempFilePath,
			validData.name,
			"Products",
		);
		validData.img = image;
	}

	await db.Product_variant.update(
		{
			product_id: validData.product_id,
			img: validData.img,
			price: validData.price,
		},
		{ where: { id } },
	);

	// Xử lý Option_value
	if (validData.Option_value && validData.Option_value.length > 0) {
		// Luôn ép thành mảng
		const optionValueArray = Array.isArray(validData.Option_value)
			? validData.Option_value
			: [validData.Option_value];

		// Validate option_value_id tồn tại kèm option cha
		const valueIdExist = await db.Option_value.findAll({
			where: { id: optionValueArray },
			include: { model: db.Option, attributes: ["id", "name"] },
		});

		if (valueIdExist.length !== optionValueArray.length) {
			throwError(404, "Một số value option không hợp lệ!");
		}

		// Lấy các Variant_option_value hiện có của variant
		const existingVariantOptionValues = await db.Variant_option_value.findAll({
			where: { product_variant_id: id },
			include: {
				model: db.Option_value,
				include: { model: db.Option, attributes: ["id", "name"] },
			},
		});

		// Xoá variant_option_value cũ có cùng option cha
		for (const existValue of valueIdExist) {
			const duplicated = existingVariantOptionValues.find(
				(v) => v.Option_value.Option.id === existValue.Option.id,
			);
			if (duplicated) {
				await db.Variant_option_value.destroy({
					where: { id: duplicated.id },
				});
			}
		}

		// Chuẩn bị dữ liệu để insert mới
		const OptionValue = optionValueArray.map((value) => ({
			product_variant_id: id,
			option_value_id: value,
		}));

		await db.Variant_option_value.bulkCreate(OptionValue);
	}

	// Nếu thay đổi product_id, price, img thì đồng bộ lại ES
	if (validData.product_id || validData.price || validData.img) {
		const updatedProductVariant = await db.Product_variant.findByPk(id, {
			include: [{ model: db.Product, attributes: ["name"] }],
		});

		await client.index({
			index: "product_variants",
			id: String(id),
			body: {
				name: updatedProductVariant.Product.name,
				sku: updatedProductVariant.sku,
				price: updatedProductVariant.price,
			},
		});
	}

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
