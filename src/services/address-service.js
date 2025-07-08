import db from "../models/index.js";
import { mapPaginateResult } from "../utils/pagenation-utils.js";
import { successResponse, throwError } from "../utils/response-utils.js";

export const getAddressOrThrowById = async (id) => {
	const foundAddress = await db.Address.findOne({ where: { id } });
	if (!foundAddress) {
		throwError(404, "Không tìm thấy địa chỉ!");
	}
	return foundAddress;
};
export const createAddress = async (data) => {
	const createdAddress = await db.Address.create(data);
	return successResponse("Thêm địa chỉ thành công!", createdAddress);
};

export const getAddressByUserId = async (user_id) => {
	const foundAddresses = await db.Address.findAll({
		where: {
			user_id,
		},
	});
	return successResponse(
		"Lấy danh sách địa chỉ theo id người dùng thành công!",
		foundAddresses,
	);
};

export const getAllAddress = async (page = 1, email = null) => {
	const limit = 10;
	const where = {};
	if (email) {
		where.email = email;
	}
	const paginateResult = await db.Address.paginate({
		page,
		paginate: limit,
		order: [["createdAt", "DESC"]],
		include: [
			{
				model: db.User,
				attributes: ["email"],
				where,
			},
		],
	});

	const result = mapPaginateResult(page, paginateResult);

	return successResponse("Lấy danh sách địa chỉ thành công!", result);
};

export const updateAddress = async (id, user, data) => {
	const foundAddress = await getAddressOrThrowById(id);
	if (foundAddress.user_id !== user.id && user.role !== "ADMIN") {
		throwError(403, "Bạn không có quyền cập nhật địa chỉ của tài khoản khác!");
	}
	await db.Address.update(data, { where: { id } });
	return successResponse("Cập nhật địa chỉ thành công!");
};

export const deleteAddress = async (id, user) => {
	const foundAddress = await getAddressOrThrowById(id);
	if (foundAddress.user_id !== user.id && user.role !== "ADMIN") {
		throwError(403, "Bạn không có quyền xóa địa chỉ của tài khoản khác!");
	}
	await db.Address.destroy({
		where: {
			id,
		},
	});
	return successResponse("Xóa địa chỉ thành công!");
};
