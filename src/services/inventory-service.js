import db from "../models/index.js";
import { successResponse, throwError } from "../utils/response-utils.js";

export const getInventoryOrThrowById = async (id) => {
	const foundInventory = await db.Inventory.findByPk(id);
	if (!foundInventory) {
		throwError(404, "Không tìm thấy kho!");
	}
	return foundInventory;
};

const throwIfInventoryNameExists = async (name) => {
	const foundInventory = await db.Inventory.findOne({ where: { name } });
	if (foundInventory) {
		throwError(400, "Tên kho đã tồn tại!");
	}
	return foundInventory;
};

export const getAllInventory = async () => {
	const response = await db.Inventory.findAll();
	return successResponse("Lấy danh sách kho thành công", response);
};

export const getInventoryByVariantId = async (product_variant_id) => {
	const foundInventory = await db.Inventory.findAll({
		where: { product_variant_id },
	});
	if (!foundInventory) {
		throwError(
			404,
			`Không tìm thấy kho có của biến thể sản phẩm có id: ${product_variant_id}`,
		);
	}
	return successResponse(
		`Lấy thông tin kho biến thể sản phẩm có id: ${product_variant_id}`,
		foundInventory,
	);
};

export const getOneInventory = async (id) => {
	const response = await getInventoryOrThrowById(id);
	return successResponse(`Lấy thông tin kho có id:${id} thành công!`, response);
};

export const createInventory = async (data) => {
	await throwIfInventoryNameExists(data.name);
	const response = await db.Inventory.create(data);
	return successResponse("Thêm kho thành công!", response);
};

export const updateInventory = async (data, id) => {
	await getInventoryOrThrowById(id);
	if (data.name) {
		await throwIfInventoryNameExists(data.name);
	}
	await db.Inventory.update(data, {
		where: { id },
	});
	return successResponse("Cập nhật thành công!");
};

export const deleteInventory = async (id) => {
	await getInventoryOrThrowById(id);
	await db.Inventory.destroy({
		where: { id },
	});
	return successResponse("Xóa thành công!");
};
