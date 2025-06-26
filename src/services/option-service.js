import db from "../models/index.js";
import { successResponse, throwError } from "../utils/response-utils.js";

export const getOptionOrThrowById = async (id) => {
	const foundOption = await db.Option.findByPk(id);
	if (!foundOption) {
		throwError(404, "Không tìm thấy kho!");
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
	await throwIfOptionNameExists(data.name);
	const response = await db.Option.create(data);
	return successResponse("Thêm thành công!", response);
};

export const getAllOption = async () => {
	const response = await db.Option.findAll();
	return successResponse("Lấy danh sách option thành công!", response);
};

export const updateOption = async (data, id) => {
	await getOptionOrThrowById(id);
	await throwIfOptionNameExists(data.name);
	await db.Option.update(
		{
			name: data.name,
		},
		{
			where: { id },
		},
	);
	return successResponse("Cập nhật thành công!");
};

export const deleteOption = async (data, id) => {
	await getOptionOrThrowById(id);
	await db.Option.destroy({
		where: { id },
	});
	return successResponse("Xóa thành công!");
};
