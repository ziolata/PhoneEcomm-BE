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
	// Gắn giá trị cho img nếu có file gửi lên
	if (imgFile) {
		data.img = { size: imgFile.size };
	}
	const validData = handleValidate(brandValidate, data);

	await throwIfBrandNameExists(validData.name);

	const image = await uploadImage(
		imgFile.tempFilePath,
		validData.name,
		"Brands",
	);
	validData.img = image;

	const response = await db.Brand.create(validData);
	return successResponse("Thêm thành công!", response);
};

export const updateBrand = async (id, data, imgFile) => {
	await getBrandOrThrowById(id);
	if (imgFile) {
		data.img = { size: imgFile.size };
	}
	const validData = handleValidate(updateBrandValidate, data);

	// Kiểm tra tồn tại nếu có trường name cập nhật
	if (validData.name) {
		await throwIfBrandNameExists(validData.name);
	}

	// Giá trị img tồn tại thì bắt đầu upload và lấy url upload gắn vào valid.img
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
