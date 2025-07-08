import db from "../models/index.js";
import { handleValidate } from "../utils/handle-validation-utils.js";
import { successResponse, throwError } from "../utils/response-utils.js";
import {
	productValidate,
	updateProductValidate,
} from "../validations/product-validation.js";
import { uploadImage } from "../utils/cloudinary-utils.js";
import { mapPaginateResult } from "../utils/pagenation-utils.js";
import { Op } from "sequelize";

const checkCategoryAndBrandExist = async (category_id, brand_id) => {
	const foundCategory = await db.Category.findByPk(category_id);
	if (!foundCategory) {
		throwError(404, "Danh mục không tồn tại!");
	}
	const foundBrand = await db.Brand.findByPk(brand_id);
	if (!foundBrand) {
		throwError(404, "Thương hiệu không tồn tại!");
	}
};

const getProductOrThrowById = async (id) => {
	const foundProduct = await db.Product.findByPk(id);
	if (!foundProduct) {
		throwError(404, "Không tìm thấy sản phẩm!");
	}
	return foundProduct;
};

const throwIfProductNameValueExists = async (name) => {
	const foundProduct = await db.Product.findOne({ where: { name } });
	if (foundProduct) {
		throwError(400, "Tên sản phẩm đã tồn tại!");
	}
	return foundProduct;
};

export const createProduct = async (data, imgFile) => {
	if (imgFile) {
		data.img = { size: imgFile.size };
	}
	const validData = handleValidate(productValidate, data);
	await checkCategoryAndBrandExist(validData.category_id, validData.brand_id);
	await throwIfProductNameValueExists(validData.name);

	const image = await uploadImage(
		imgFile.tempFilePath,
		validData.name,
		"Products",
	);
	validData.img = image;

	const createdProduct = await db.Product.create(validData);
	return successResponse("Thêm thành công!", createdProduct);
};

export const updateProduct = async (id, data, imgFile) => {
	if (imgFile) {
		data.img = { size: imgFile.size };
	}
	const validData = handleValidate(updateProductValidate, data);
	await getProductOrThrowById(id);
	if (validData.category_id && validData.brand_id) {
		await checkCategoryAndBrandExist(validData.category_id, validData.brand_id);
	}
	if (validData.name) {
		await throwIfProductNameValueExists(validData.name);
	}
	if (validData.img) {
		const image = await uploadImage(
			imgFile.tempFilePath,
			validData.name,
			"Products",
		);
		validData.img = image;
	}
	await db.Product.update(validData, {
		where: { id },
	});
	return successResponse("Cập nhật thành công!");
};

export const deleteProduct = async (id) => {
	await getProductOrThrowById(id);
	await db.Product.destroy({
		where: { id },
	});

	return successResponse("Xóa thành công!");
};

export const getOneProduct = async (id) => {
	const foundProduct = await getProductOrThrowById(id);
	return successResponse("Lấy thông tin sản phẩm thành công!", foundProduct);
};

export const getAllProduct = async (page = 1, name = null) => {
	const limit = 10;
	const where = {};
	if (name) {
		where.name = { [Op.like]: `%${name}%` };
	}
	const paginateResult = await db.Product.paginate({
		page,
		paginate: limit,
		where,
		order: [["createdAt", "DESC"]],
		include: [
			{
				model: db.Category,
				attributes: ["id", "name"],
			},
			{
				model: db.Brand,
				attributes: ["id", "name"],
			},
			{
				model: db.Product_variant,
				attributes: ["id", "sku", "price"],
				include: {
					model: db.Inventory,
					attributes: ["id", "name", "quantity", "location"],
				},
			},
		],
	});

	const result = mapPaginateResult(page, paginateResult);

	return successResponse("Lấy danh sách sản phẩm thành công!", result);
};
