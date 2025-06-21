import db from "../models/index.js";
import { successResponse, throwError } from "../utils/response-utils.js";

const throwIfCategoryNameExists = async (name) => {
	const foundCategory = await db.Category.findOne({ where: name });
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
	await throwIfCategoryNameExists(data.name);
	const response = await db.Category.create(data);
	return successResponse("Thêm thành công!", response);
};

export const updateCategory = async (id, data) => {
	await getCategoryOrThrowById(id);
	if (data.name) {
		await throwIfCategoryNameExists(data.name);
	}
	await db.Category.update(
		{ name: data.name, img: data.img, description: data.description },
		{
			where: {
				id: param,
			},
		},
	);
	return successResponse("Cập nhật thành công!");
};

export const deleteCategory = async (id) => {
	await getCategoryOrThrowById(id);
	await db.Category.destroy({
		where: {
			id: id,
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
