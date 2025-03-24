import db from "../models";
import {
	calculatorQuantity,
	calculatorQuantityOnePrd,
} from "../helper/calculateQInventory";
import { handleValidate } from "../utils/handleValidation";
import { productValidate } from "../validations/productVadidation";
export const createProduct = async (data) => {
	try {
		handleValidate(productValidate, data);
		const foundCategory = await db.Category.findByPk(data.category_id);
		const foundBrand = await db.Brand.findByPk(data.brand_id);

		if (!foundCategory) {
			throw {
				status: 404,
				message: "Danh mục không tồn tại, cập nhật không thành công!",
			};
		}
		if (!foundBrand) {
			throw {
				status: 404,
				message: "Thương hiệu không tồn tại, cập nhật không thành công!",
			};
		}
		const existingProduct = await db.Product.findOne({
			where: {
				name: data.name,
			},
		});
		if (existingProduct) {
			throw { status: 400, message: "Tên sản phẩm đã tồn tại!" };
		}
		const response = await db.Product.create(data, { transaction });
		return { data: response };
	} catch (error) {
		console.error(error);
		throw error;
	}
};
export const updateProduct = async (data, param) => {
	try {
		handleValidate(productValidate, data);
		const foundProduct = await db.Product.findByPk(param);
		const foundCategory = await db.Category.findByPk(data.category_id);
		const foundBrand = await db.Brand.findByPk(data.brand_id);
		if (!foundProduct) {
			throw {
				status: 404,
				message: "Sản phẩm không tồn tại, cập nhật không thành công!",
			};
		}
		if (!foundCategory) {
			throw {
				status: 404,
				message: "Danh mục không tồn tại, cập nhật không thành công!",
			};
		}
		if (!foundBrand) {
			throw {
				status: 404,
				message: "Thương hiệu không tồn tại, cập nhật không thành công!",
			};
		}
		await db.Product.update(
			{
				name: data.name,
				img: data.img,
				description: data.description,
				features: data.features,
				category_id: data.category_id,
				brand_id: data.brand_id,
			},
			{
				where: { id: param },
				transaction,
			},
		);
		return { message: "Cập nhật thành công!" };
	} catch (error) {
		console.error(error);
		throw error;
	}
};
export const deleteProduct = async (param) => {
	try {
		const foundProduct = await db.Product.findOne({
			where: {
				id: param,
			},
		});
		if (!foundProduct) {
			throw {
				status: 404,
				message: "Sản phẩm không tồn tại, xóa không thành công !",
			};
		}
		await db.Product.destroy({
			where: { id: param },
		});

		return { message: "Xóa thành công !" };
	} catch (error) {
		console.error(error);
		throw error;
	}
};
export const getOneProduct = async (param) => {
	try {
		const response = await db.Product.findOne({
			where: { id: param },
			include: {
				model: db.Product_variant,
				include: {
					model: db.Inventory,
					attributes: ["id", "name", "quantity", "location"],
				},
			},
		});
		return { data: response };
	} catch (error) {
		console.error(error);
		throw error;
	}
};
export const getAllProduct = async () => {
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
					model: db.Product_variant,
					attributes: ["id", "sku", "price"],
					include: {
						model: db.Inventory,
						attributes: ["id", "name", "quantity", "location"],
					},
				},
			],
		});
		return {
			data: response,
		};
	} catch (error) {
		console.error(error);
		throw error;
	}
};
