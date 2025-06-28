import db from "../models/index.js";
import { successResponse, throwError } from "../utils/response-utils.js";

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
export const addBrand = async (data) => {
	await throwIfBrandNameExists(data.name);
	const response = await db.Brand.create(data);
	return successResponse("Thêm thành công!", response);
};

export const updateBrand = async (id, data) => {
	await getBrandOrThrowById(id);
	if (data.name) {
		await throwIfBrandNameExists(data.name);
	}
	await db.Brand.update(
		{ name: data.name, img: data.img, description: data.description },
		{
			where: {
				id: param,
			},
		},
	);
	return successResponse("Cập nhật thành công!");
};

export const deleteBrand = async (id) => {
	await getBrandOrThrowById(id);
	await db.Brand.destroy({
		where: {
			id: id,
		},
	});
	return successResponse("Xóa thành công!");
};

export const getAllBrand = async () => {
	const response = await db.Brand.findAll({
		attributes: ["id", "name", "img", "description"],
	});
	return successResponse("Lấy danh sách thương hiệu thành công!", response);
};

export const getOneBrand = async (id) => {
	const response = await db.Brand.findByPk(id, {
		attributes: ["id", "name", "img", "description"],
	});
	return successResponse("Lấy thông tin thương hiệu thành công!", response);
};
