import db from "../models/index.js";

export const createAddress = async (data) => {
	try {
		const response = await db.Address.create(data);
		return { data: response };
	} catch (error) {
		console.log(error);
		throw error;
	}
};

export const getAllAddress = async (user) => {
	try {
		const response = await db.Address.findAll({
			where: {
				user_id: user,
			},
		});
		return response;
	} catch (error) {
		console.log(error);
		throw error;
	}
};

export const updateAddress = async (id, user, data) => {
	try {
		const foundAddress = db.Address.findOne({
			where: id,
		});
		if (!foundAddress) {
			throw {
				status: 404,
				message: "Địa chỉ không tồn tại, cập nhật không thành công!",
			};
		}
		if (foundAddress.user_id !== user.id && user.role !== "ADMIN") {
			throw {
				status: 400,
				message: "Bạn không cập nhật được địa chỉ của tài khoản khác !",
			};
		}
		await db.Address.update(data, { where: id });
		return { message: "Cập nhật địa chỉ thành công!" };
	} catch (error) {
		console.log(error);
		throw error;
	}
};

export const deleteAddress = async (id, user) => {
	try {
		const foundAddress = db.Address.findOne({
			where: id,
		});
		if (!foundAddress) {
			throw {
				status: 404,
				message: "Địa chỉ không tồn tại, cập nhật không thành công!",
			};
		}
		if (foundAddress.user_id !== user.id && user.role !== "ADMIN") {
			throw {
				status: 400,
				message: "Bạn không cập nhật được địa chỉ của tài khoản khác !",
			};
		}
		await db.Address.destroy({ where: id });
		return { message: "Xóa địa chỉ thành công!" };
	} catch (error) {
		console.log(error);
		throw error;
	}
};
