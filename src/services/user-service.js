import db from "../models/index.js";
import { handleValidate } from "../utils/handle-validation-utils.js";
import { mapPaginateResult } from "../utils/pagenation-utils.js";
import { successResponse, throwError } from "../utils/response-utils.js";
import { userSchema } from "../validations/user-validation.js";
import { uploadImage } from "../utils/cloudinary-utils.js";

export const getUser = async (user_id) => {
	const foundUser = await db.User.findOne({
		where: {
			id: user_id,
		},
		attributes: { exclude: ["password"] },
	});
	return successResponse("Lấy thông tin thành công!", foundUser);
};

export const getAllUser = async (page = 1, email = null) => {
	const limit = 10;
	const where = {};
	if (email) {
		where.email = email; // giá trị email khớp Tuyệt đối
		// where.email = { [Op.like]: `%${email}%` }; // giá trị email tương đối
	}
	const paginateResult = await db.User.paginate({
		page,
		paginate: limit,
		where,
		order: [["createdAt", "DESC"]],
		attributes: { exclude: ["password", "password_reset_token"] },
	});
	const result = mapPaginateResult(page, paginateResult);
	return successResponse("Lấy danh sách người dùng thành công!", result);
};

export const updateUser = async (data, role, user_id, imgFile) => {
	if (data.role_id && role !== "admin") {
		throwError(403, "Bạn không có quyền thay đổi vai trò!");
	}
	const foundUser = await db.User.findOne({ where: { id: user_id } });
	if (!foundUser) {
		throwError(404, "Không tìm thấy người dùng!");
	}
	const validData = handleValidate(userSchema, data);

	if (validData.avatar) {
		const uploadResult = await uploadImage(
			imgFile.tempFilePath,
			`avatar_${user_id}`,
			"avatar",
		);
		validData.avatar = uploadResult;
	}
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
