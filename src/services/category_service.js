import db from "../models";

export const addCategory = async (data) => {
	try {
		const response = await db.Category.create(data);
		if (response) {
			return {
				message: "Create category successfully",
				data: {
					id: response.id,
					name: response.name,
					img: response.img,
					description: response.description,
				},
			};
		}
	} catch (error) {
		console.error(error);
		throw new Error("Database Error");
	}
};
export const updateCategory = async (data) => {
	try {
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
				message: "update category successfully",
				data: findData,
			};
		}
	} catch (error) {
		console.error(error);
		throw new Error("Database Error");
	}
};
export const deleteCategory = async (id) => {
	try {
		const response = await db.Category.destroy({
			where: {
				id: id,
			},
		});
		if (response) {
			return {
				message: "Delete successfully",
			};
		}
	} catch (error) {
		console.error(error);
		throw new Error("Database Error");
	}
};
export const getCategory = async () => {
	try {
		const response = await db.Category.findAll({
			attributes: ["id", "name", "img", "description"],
		});
		if (response) {
			return {
				data: response,
			};
		}
	} catch (error) {
		console.error(error);
		throw new Error("Database Error");
	}
};
export const getOneCategory = async (id) => {
	try {
		const response = await db.Category.findByPk(id, {
			attributes: ["id", "name", "img", "description"],
		});
		if (response) {
			return {
				data: response,
			};
		}
	} catch (error) {
		console.error(error);
		throw new Error("Database Error");
	}
};
