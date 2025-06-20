import db from "../models/index.js";

export const addCategory = async (data) => {
	try {
		const existingCate = await db.Category.findOne({
			where: {
				name: data.name,
			},
		});
		if (existingCate) {
			throw { status: 400, message: "Danh mục đã tồn tại!" };
		}
		const response = await db.Category.create(data);
		return { data: response };
	} catch (error) {
		console.log(error);
		throw error;
	}
};
export const updateCategory = async (data) => {
	try {
		const foundCategory = await db.Category.findOne({
			where: {
				id: param,
			},
		});
		if (!foundCategory) {
			throw {
				status: 404,
				message: "Danh mục không tồn tại, cập nhật không thành công!",
			};
		}

		if (foundCategory.name === data.name) {
			throw {
				status: 400,
				message: "Tên danh mục đã tồn tại, cập nhật không thành công!",
			};
		}
		const response = await db.Category.update(
			{ name: data.name, img: data.img, description: data.description },
			{
				where: {
					id: param,
				},
			},
		);
		const findData = await db.Category.findByPk(param, {
			attributes: ["id", "name", "img", "description"],
		});
		if (response) {
			return {
				message: "Cập nhật thành công !",
				data: findData,
			};
		}
	} catch (error) {
		console.error(error);
		throw error;
	}
};
export const deleteCategory = async (id) => {
	try {
		const foundCategory = await db.Category.findOne({
			where: {
				id: param,
			},
		});
		if (!foundCategory) {
			throw {
				status: 404,
				message: "Danh mục không tồn tại, xóa không thành công!",
			};
		}
		await db.Category.destroy({
			where: {
				id: id,
			},
		});
		return {
			message: "Xóa thành công",
		};
	} catch (error) {
		console.error(error);
		throw error;
	}
};
export const getCategory = async () => {
	try {
		const response = await db.Category.findAll({
			attributes: ["id", "name", "img", "description"],
		});
		return {
			data: response,
		};
	} catch (error) {
		console.error(error);
		throw error;
	}
};
export const getOneCategory = async (id) => {
	try {
		const response = await db.Category.findByPk(id, {
			attributes: ["id", "name", "img", "description"],
		});
		return {
			data: response,
		};
	} catch (error) {
		console.error(error);
		throw error;
	}
};
