import db from "../models/index.js";
import { successResponse, throwError } from "../utils/response-utils.js";

export const getOptionValueOrThrowById = async (id) => {
	const foundOptionValue = await db.Option_value.findByPk(id);
	if (!foundOptionValue) {
		throwError(404, "Không tìm thấy kho!");
	}
	return foundOptionValue;
};

const throwIfOptionValueValueExists = async (value) => {
	const foundOptionValue = await db.Option_value.findOne({ where: { value } });
	if (foundOptionValue) {
		throwError(400, "Giá trị đã tồn tại!");
	}
	return foundOptionValue;
};

export const createOptionValue = async (data) => {
	await throwIfOptionValueValueExists(data.value);
	const response = await db.Option_value.create(data);
	return successResponse("Thêm thành công!", response);
};

export const getAllOptionValue = async () => {
	const response = await db.Option_value.findAll();
	return successResponse("Lấy danh sách giá trị thành công!", response);
};
