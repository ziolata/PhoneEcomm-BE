import db from "../models/index.js";
import { handleValidate } from "../utils/handle-validation-utils.js";
import { successResponse, throwError } from "../utils/response-utils.js";
import {
	categoryValidate,
	updateCategoryValidate,
} from "../validations/category-validation.js";

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
		throwError(404, "Danh mục không tồn tại");
	}
};
export const addCategory = async (data) => {
	const validData = handleValidate(categoryValidate, data);
	await throwIfCategoryNameExists(categoryValidate.name);
	const response = await db.Category.create(validData);
	return successResponse("Thêm thành công!", response);
};

export const updateCategory = async (id, data) => {
	const validData = handleValidate(updateCategoryValidate, data);
	await throwIfCategoryNameExists(validData.name);
	await getCategoryOrThrowById(id);
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
	const response = await db.Category.findAll({
		attributes: ["id", "name", "img", "description"],
	});
	return successResponse("Lấy danh sách danh mục thành công!", response);
};

export const getOneCategory = async (id) => {
	const response = await db.Category.findByPk(id, {
		attributes: ["id", "name", "img", "description"],
	});
	return successResponse(
		`Lấy thông tin danh mục có id: ${id} thành công!`,
		response,
	);
};
