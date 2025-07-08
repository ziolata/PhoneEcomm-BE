import db from "../models/index.js";
import { successResponse, throwError } from "../utils/response-utils.js";
import { handleValidate } from "../utils/handle-validation-utils.js";
import {
	optionValueValidate,
	updateOptionValueValidate,
} from "../validations/option-validation.js";
import { mapPaginateResult } from "../utils/pagenation-utils.js";

export const getOptionValueOrThrowById = async (id) => {
	const foundOptionValue = await db.Option_value.findByPk(id);
	if (!foundOptionValue) {
		throwError(404, "Giá trị không tồn tại!");
	}
	return foundOptionValue;
};

const throwIfValueExists = async (value) => {
	const foundOptionValue = await db.Option_value.findOne({ where: { value } });
	if (foundOption) {
		throwError(400, "Giá trị đã tồn tại!");
	}
	return foundOptionValue;
};

export const createOptionValue = async (data) => {
	const validData = handleValidate(optionValueValidate, data);
	await throwIfValueExists(validData.value);
	const createdOptionValue = await db.Option_value.create(validData);
	return successResponse("Thêm thành công!", createdOptionValue);
};

export const getAllOptionValue = async (page = 1, value = null) => {
	const limit = 10;
	const where = {};
	if (value) {
		where.value = { [Op.like]: `%${value}%` };
	}
	const paginateResult = await db.Option_value.paginate({
		page,
		paginate: limit,
		where,
		order: [["createdAt", "DESC"]],
		include: [
			{
				model: db.Option,
				attributes: ["id", "name"],
			},
		],
	});

	const result = mapPaginateResult(page, paginateResult);

	return successResponse("Lấy danh sách giá trị thành công!", result);
};

export const getOneOptionValue = async (id) => {
	const foundOptionValue = await getOptionValueOrThrowById(id);
	return successResponse("Lấy thông tin giá trị thành công!", foundOptionValue);
};

export const updateOptionValue = async (id, data) => {
	await getOptionValueOrThrowById(id);
	const validData = handleValidate(updateOptionValueValidate, data);
	await throwIfValueExists(validData.value);
	await db.Option_value.update(validData, { where: { id } });
	return successResponse("Cập nhật thành công!");
};

export const deleteOptionValue = async (id) => {
	await getOptionValueOrThrowById(id);
	await db.Option_value.destroy({ where: { id } });
	return successResponse("Xóa thành công!");
};
