import db from "../models/index.js";
import { handleValidate } from "../utils/handle-validation-utils.js";
import { successResponse, throwError } from "../utils/response-utils.js";
import {
	categoryValidate,
	updateCategoryValidate,
} from "../validations/category-validation.js";
import { uploadImage } from "../utils/cloudinary-utils.js";

const throwIfCategoryNameExists = async (name) => {
	const foundCategory = await db.Category.findOne({ where: { name } });
	if (foundCategory) {
		throwError(400, "Danh mục đã tồn tại!");
	}
	return foundCategory;
};
const getCategoryOrThrowById = async (id) => {
	const foundCategory = await db.Category.findByPk(id);
	if (!foundCategory) {
		throwError(404, "Danh mục không tồn tại!");
	}
};
export const createCategory = async (data, imgFile) => {
	const validData = handleValidate(categoryValidate, data);
	await throwIfCategoryNameExists(validData.name);

	const image = await uploadImage(
		imgFile.tempFilePath,
		validData.name,
		"Categories",
	);
	validData.img = image;

	const createdCategory = await db.Category.create(validData);
	return successResponse("Thêm thành công!", createdCategory);
};

export const updateCategory = async (id, data, imgFile) => {
	await getCategoryOrThrowById(id);

	const validData = handleValidate(updateCategoryValidate, data);
	// Kiêm tra tồn tại nếu có trường name cập nhật
	if (validData.name) {
		await throwIfCategoryNameExists(validData.name);
	}
	if (validData.img) {
		const image = await uploadImage(
			imgFile.tempFilePath,
			validData.name,
			"Categories",
		);
		validData.img = image;
	}
	await db.Category.update(validData, {
		where: {
			id,
		},
	});
	return successResponse("Cập nhật thành công!");
};

export const deleteCategory = async (id) => {
	await getCategoryOrThrowById(id);
	await db.Category.destroy({
		where: {
			id,
		},
	});
	return successResponse("Xóa thành công!");
};

export const getAllCategory = async () => {
	const foundCategories = await db.Category.findAll();
	return successResponse("Lấy danh sách danh mục thành công!", foundCategories);
};

export const getOneCategory = async (id) => {
	const foundCategory = await db.Category.findByPk(id);
	return successResponse("Lấy thông tin danh mục thành công!", foundCategory);
};
