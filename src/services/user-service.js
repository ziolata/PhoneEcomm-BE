import db from "../models/index.js";
import { handleValidate } from "../utils/handle-validation-utils.js";
import { successResponse, throwError } from "../utils/response-utils.js";
import { userSchema } from "../validations/user-validation.js";

export const getUser = async (user_id) => {
	const foundUser = await db.User.findOne({
		where: {
			id: user_id,
		},
		attributes: { exclude: ["password"] },
	});
	return successResponse("Lấy thông tin thành công!", foundUser);
};

export const getAllUser = async () => {
	const foundUsers = await db.User.findAll({
		attributes: { exclude: ["password"] },
	});
	return successResponse("Lấy danh sách người dùng thành công!", foundUsers);
};

export const updateUser = async (data, role, user_id) => {
	if (data.role_id && role !== "admin") {
		throwError(403, "Bạn không có quyền thay đổi vai trò!");
	}
	const foundUser = await db.User.findOne({ where: { id: user_id } });
	if (!foundUser) {
		throwError(404, "Không tìm thấy người dùng!");
	}
	const validData = handleValidate(userSchema, data);
	await db.User.update(validData, {
		where: { id: user_id },
	});
	return successResponse("Cập nhật thành công!");
};

export const deleteUser = async (id) => {
	await db.User.destroy({
		where: { id },
	});
	return successResponse("Cập nhật thành công!");
};
