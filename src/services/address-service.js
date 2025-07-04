import db from "../models/index.js";
import { successResponse, throwError } from "../utils/response-utils.js";

export const getAddressOrThrowById = async (id) => {
	const foundAddress = await db.Address.findOne({ where: { id } });
	if (!foundAddress) {
		throwError(404, `Không tìm thấy địa chỉ có id: ${id}!`);
	}
	return foundAddress;
};
export const createAddress = async (data) => {
	const response = await db.Address.create(data);
	return successResponse("Thêm địa chỉ thành công!", response);
};

export const getAllAddressByUserId = async (user_id) => {
	const response = await db.Address.findAll({
		where: {
			user_id,
		},
	});
	if (!response) {
		throwError(400, `Không tìm thấy địa chỉ của user_id: ${user_id}`);
	}
	return successResponse(
		`Lấy danh sách địa chỉ của user_id: ${user_id} thành công!`,
		response,
	);
};

export const updateAddress = async (id, user, data) => {
	const foundAddress = await getAddressOrThrowById(id);
	if (foundAddress.user_id !== user.id && user.role !== "ADMIN") {
		throwError(400, "Bạn không có quyền cập nhật địa chỉ của tài khoản khác!");
	}
	await db.Address.update(data, { where: { id } });
	return successResponse("Cập nhật địa chỉ thành công!");
};

export const deleteAddress = async (id, user) => {
	const foundAddress = await getAddressOrThrowById(id);
	if (foundAddress.user_id !== user.id && user.role !== "ADMIN") {
		throwError(400, "Bạn không có quyền xóa địa chỉ của tài khoản khác!");
	}
	await db.Address.destroy({
		where: {
			id,
		},
	});
	return successResponse("Xóa địa chỉ thành công!");
};
