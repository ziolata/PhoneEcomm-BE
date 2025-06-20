import db, { sequelize } from "../models/index.js";
import { client } from "../config/elastic.js";

export const createProductVariant = async (data) => {
	const transaction = await sequelize.transaction();
	try {
		const existingProduct = await db.Product.findByPk(data.product_id);
		if (!existingProduct) {
			throw { status: 404, message: "product_id không tồn tại!" };
		}
		const response = await db.Product_variant.create(data, { transaction });
		//  Thêm option Value cho Product Variant
		if (data.Option_value && data.Option_value.length > 0) {
			const OptionValue = data.Option_value.map((value) => ({
				product_variant_id: response.id,
				option_value_id: value.id,
			}));
			const valueIdExist = await db.Option_value.findAll({
				where: {
					id: OptionValue.map((i) => i.option_value_id),
				},
			});
			if (valueIdExist.length !== OptionValue.length) {
				throw { status: 400, message: "Một số giá trị option không hợp lệ!" };
			}
			await db.Variant_option_value.bulkCreate(OptionValue);
		}
		await transaction.commit();
		const productInfo = await db.Product.findOne({
			where: {
				id: response.product_id,
			},
		});
		// Thêm dữ liệu Product Variant vào Elasticsearch
		await client.index({
			index: "product_variants", // Index name
			id: String(response.id),
			body: {
				name: productInfo.name,
				sku: response.sku,
				price: response.price,
			},
		});

		return { data: response };
	} catch (error) {
		console.log(error);
		await transaction.rollback();
		throw error;
	}
};

export const getAllProductVariant = async () => {
	try {
		const response = await db.Product_variant.findAll();
		return { data: response };
	} catch (error) {
		console.log(error);
	}
};

export const getOneProductVariant = async (param) => {
	try {
		const response = await db.Product_variant.findByPk(param);
		return { data: response };
	} catch (error) {
		console.log(error);
	}
};
export const updateProductVariant = async (data, param) => {
	try {
		const foundProduct = await db.Product.findByPk(data.product_id);
		if (foundProduct) {
			throw { status: 404, message: "Product id không tồn tại!" };
		}
		const response = await db.Product_variant.update(
			{
				product_id: data.product_id,
				img: data.img,
				sku: data.sku,
				price: data.price,
			},
			{
				where: { id: param },
			},
		);
		await client.index({
			index: "product_variants", // Index name
			id: String(response.id),
			body: {
				name: foundProduct.name,
				sku: response.sku,
				price: response.price,
			},
		});
		return { message: "Cập nhật thành công!" };
	} catch (error) {
		console.error(error);
		throw error;
	}
};
export const deleteProductVariant = async (id) => {
	try {
		const existingProductVariant = await db.Product_variant.findByPk(id);
		if (!existingProductVariant) {
			throw { status: 404, message: "Biến thể không tồn tại, xóa thất bại!" };
		}
		await db.Product_variant.destroy({
			where: {
				id: id,
			},
		});
		return {
			message: "Xóa thành công!",
		};
	} catch (error) {
		console.error(error);
		throw error;
	}
};
