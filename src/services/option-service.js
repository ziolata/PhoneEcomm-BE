import db from "../models/index.js";
import { handleValidate } from "../utils/handle-validation-utils.js";
import { successResponse, throwError } from "../utils/response-utils.js";
import { optionValidate } from "../validations/option-validation.js";

export const getOptionOrThrowById = async (id) => {
	const foundOption = await db.Option.findByPk(id, {
		include: {
			model: db.Option_value,
			attributes: ["id", "value"],
		},
	});
	if (!foundOption) {
		throwError(404, "Option không tồn tại!");
	}
	return foundOption;
};

const throwIfOptionNameExists = async (name) => {
	const foundOption = await db.Option.findOne({ where: { name } });
	if (foundOption) {
		throwError(400, "Tên option đã tồn tại!");
	}
	return foundOption;
};

export const createOption = async (data) => {
	const validData = handleValidate(optionValidate, data);
	await throwIfOptionNameExists(validData.name);
	const createdOption = await db.Option.create(validData);
	return successResponse("Thêm thành công!", createdOption);
};

export const getAllOption = async () => {
	const foundOptions = await db.Option.findAll({
		include: {
			model: db.Option_value,
			attributes: ["id", "value"],
		},
	});
	return successResponse("Lấy danh sách option thành công!", foundOptions);
};

export const getOneOption = async (id) => {
	const foundOption = await getOptionOrThrowById(id);
	return successResponse("Lấy thông tin option thành công!", foundOption);
};

export const updateOption = async (data, id) => {
	const validData = handleValidate(optionValidate, data);
	await getOptionOrThrowById(id);
	await throwIfOptionNameExists(validData.name);
	await db.Option.update(
		{
			name: validData.name,
		},
		{
			where: { id },
		},
	);
	return successResponse("Cập nhật thành công!");
};

export const deleteOption = async (id) => {
	await getOptionOrThrowById(id);
	await db.Option.destroy({
		where: { id },
	});
	return successResponse("Xóa thành công!");
};
