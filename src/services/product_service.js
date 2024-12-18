import db from "../models";
import { calculatorQuantity } from "../utils/generalUtils";
export const addProduct = async (productData) => {
	try {
		const response = await db.Product.create(productData);
		if (response) {
			return { data: response };
		}
	} catch (error) {
		console.error(error);
		throw new Error("Database Error");
	}
};
export const updateProduct = async (productData) => {
	try {
		const response = await db.Product.update(productData, {
			where: { id: id },
		});
		if (response) {
			const findData = await db.Product.findByPk(id);
			return { message: "Update Successfully", data: findData };
		}
	} catch (error) {
		console.error(error);
		throw new Error("Database Error");
	}
};
export const deleteProduct = async (param) => {
	try {
		await db.Product.destroy({
			where: { id: param },
		});

		return { message: "Delete Successfully" };
	} catch (error) {
		console.error(error);
		throw new Error("Database Error");
	}
};
export const getOneProduct = async (param) => {
	try {
		const response = await db.Product.findByPk({
			where: { id: param },
			include: {
				model: db.Stock,
				attributes: ["id", "name", "location", "quantity"],
			},
		});
		calculatorQuantity(response);
		return { data: response };
	} catch (error) {
		console.error(error);
		throw new Error("Database Error");
	}
};
export const getProduct = async () => {
	try {
		const response = await db.Product.findAll({
			include: [
				{
					model: db.Category,
					attributes: ["id", "name"],
				},
				{
					model: db.Brand,
					attributes: ["id", "name"],
				},
				{
					model: db.Stock,
					attributes: ["id", "name", "location", "quantity"],
				},
			],
		});
		calculatorQuantity(response);
		return {
			data: response,
		};
	} catch (error) {
		console.error(error);
		throw new Error("Database Error");
	}
};
