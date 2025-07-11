import db from "../models/index.js";
import { handleValidate } from "../utils/handle-validation-utils.js";
import { successResponse, throwError } from "../utils/response-utils.js";
import {
	brandValidate,
	updateBrandValidate,
} from "../validations/brand-validation.js";
import { uploadImage } from "../utils/cloudinary-utils.js";

const throwIfBrandNameExists = async (name) => {
	const foundBrand = await db.Brand.findOne({ where: { name } });
	if (foundBrand) {
		throwError(400, "Thương hiệu đã tồn tại!");
	}
	return foundBrand;
};
const getBrandOrThrowById = async (id) => {
	const foundBrand = await db.Brand.findByPk(id);
	if (!foundBrand) {
		throwError(404, "Thương hiệu không tồn tại!");
	}
};
export const createBrand = async (data, imgFile) => {
	const validData = handleValidate(brandValidate, data);

	await throwIfBrandNameExists(validData.name);

	const image = await uploadImage(
		imgFile.tempFilePath,
		validData.name,
		"Brands",
	);
	validData.img = image;

	const createdBrand = await db.Brand.create(validData);
	return successResponse("Thêm thành công!", createdBrand);
};

export const updateBrand = async (id, data, imgFile) => {
	await getBrandOrThrowById(id);
	const validData = handleValidate(updateBrandValidate, data);
	// Kiểm tra tồn tại nếu có trường name cập nhật
	if (validData.name) {
		await throwIfBrandNameExists(validData.name);
	}
	if (validData.img) {
		const image = await uploadImage(
			imgFile.tempFilePath,
			validData.name,
			"Brands",
		);
		validData.img = image;
	}
	await db.Brand.update(validData, {
		where: {
			id,
		},
	});
	return successResponse("Cập nhật thành công!");
};

export const deleteBrand = async (id) => {
	await getBrandOrThrowById(id);
	await db.Brand.destroy({
		where: {
			id,
		},
	});
	return successResponse("Xóa thành công!");
};

export const getAllBrand = async () => {
	const foundBrands = await db.Brand.findAll({
		attributes: ["id", "name", "img", "description"],
	});
	return successResponse("Lấy danh sách thương hiệu thành công!", foundBrands);
};

export const getOneBrand = async (id) => {
	const foundBrand = await getBrandOrThrowById(id);
	return successResponse("Lấy thông tin thương hiệu thành công!", foundBrand);
};
