import db from "../models/index.js";
import { successResponse, throwError } from "../utils/response-utils.js";
import { handleValidate } from "../utils/handle-validation-utils.js";
import { optionValueValidate } from "../validations/option-validation.js";

export const getOptionValueOrThrowById = async (id) => {
	const foundOptionValue = await db.Option_value.findByPk(id);
	if (!foundOptionValue) {
		throwError(404, "Option_value không tồn tại!");
	}
	return foundOptionValue;
};

const throwIfValueExists = async (value) => {
	const foundOption = await db.Option_value.findOne({ where: { value } });
	if (foundOption) {
		throwError(400, "Giá trị đã tồn tại!");
	}
	return foundOption;
};

export const createOptionValue = async (data) => {
	const validData = handleValidate(optionValueValidate, data);
	await throwIfValueExists(validData.value);
	const response = await db.Option_value.create(validData);
	return successResponse("Thêm thành công!", response);
};

export const getAllOptionValue = async () => {
	const response = await db.Option_value.findAll();
	return successResponse("Lấy danh sách giá trị thành công!", response);
};

export const getOneOptionValue = async (id) => {
	const foundOptionValue = await getOptionValueOrThrowById(id);
	return successResponse("Lấy thông tin giá trị thành công!", foundOptionValue);
};

export const updateOptionValue = async (id, data) => {
	await getOptionValueOrThrowById(id);
	const validData = handleValidate(optionValueValidate, data);
	await throwIfValueExists(validData.value);
	await db.Option_value.update(validData, { where: { id } });
	return successResponse("Cập nhật thành công!");
};

export const deleteOptionValue = async (id) => {
	await getOptionValueOrThrowById(id);
	await db.Option_value.destroy({ where: { id } });
	return successResponse("Xóa thành công!");
};
