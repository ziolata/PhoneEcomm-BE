import db from "../models/index.js";

export const getAllInventory = async () => {
	try {
		const response = await db.Inventory.findAll();
		return { data: response };
	} catch (error) {
		console.log(error);
		throw error;
	}
};
export const getOneInventory = async (id) => {
	try {
		const response = await db.Inventory.findByPk(id);
		return { data: response };
	} catch (error) {
		console.log(error);
		throw error;
	}
};
export const createInventory = async (data) => {
	try {
		const existingInventory = await db.Inventory.findOne({
			where: {
				name: data.name,
			},
		});
		if (existingInventory.name === data.name) {
			throw {
				status: 400,
				message: "Tên kho đã tồn tại, vui lòng chọn tên khác",
			};
		}
		if (!existingInventory) {
			throw {
				status: 404,
				message: "Kho không tồn tại, cập nhật không thành công",
			};
		}
		const response = await db.Inventory.create(data);
		return { data: response };
	} catch (error) {
		console.log(error);
		throw error;
	}
};
export const updateInventory = async (data, param) => {
	try {
		const existingInventory = await db.Inventory.findOne({
			where: {
				id: param,
			},
		});
		if (!existingInventory) {
			throw {
				status: 404,
				message: "Kho không tồn tại, cập nhật không thành công",
			};
		}
		if (existingInventory.name === data.name) {
			throw {
				status: 400,
				message: "Tên kho đã tồn tại, vui lòng chọn tên khác",
			};
		}
		const response = await db.Inventory.update(
			{
				name: data.name,
				quantity: data.quantity,
				location: data.location,
				product_variant_id: product_variant_id,
			},
			{
				where: {
					id: param,
				},
			},
		);
		return { data: response };
	} catch (error) {
		console.log(error);
		throw error;
	}
};
export const deleteInventory = async (param) => {
	try {
		const existingInventory = await db.Inventory.findOne({
			where: {
				id: param,
			},
		});
		if (!existingInventory) {
			throw {
				status: 404,
				message: "Kho không tồn tại, xóa không thành công",
			};
		}
		await db.Inventory.destroy({
			where: {
				id: param,
			},
		});
		return { message: "Xóa thành công!" };
	} catch (error) {
		console.log(error);
	}
};
