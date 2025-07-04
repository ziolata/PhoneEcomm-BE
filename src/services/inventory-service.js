import db from "../models/index.js";
import { calculateDistance } from "../utils/calculate-utils.js";
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
	return successResponse("Lấy danh sách kho thành công!", response);
};

export const getInventoryByVariantId = async (product_variant_id) => {
	const foundInventory = await db.Inventory.findAll({
		where: { product_variant_id },
	});
	if (!foundInventory) {
		throwError(404, "Không tìm thấy kho!");
	}
	return successResponse(
		"Lấy thông tin kho của biến thể sản phẩm!",
		foundInventory,
	);
};

export const getOneInventory = async (id) => {
	const response = await getInventoryOrThrowById(id);
	return successResponse("Lấy thông tin kho thành công!", response);
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

export const checkInventoryByVariant = async (variant_id, quantity) => {
	const foundProductVariant = await db.Product_variant.findByPk(variant_id, {
		include: {
			model: db.Inventory,
			attributes: ["quantity"],
		},
	});
	if (!foundProductVariant) throwError(404, "Sản phẩm không tồn tại!");
	if (foundProductVariant.Inventories.length === 0)
		throwError(404, "Không tìm thấy kho của sản phẩm!");
	const totalAvailable = foundProductVariant.Inventories.reduce(
		(sum, inv) => sum + inv.quantity,
		0,
	);

	if (totalAvailable < quantity)
		throwError(400, "Số lượng trong kho không đủ!");
	return totalAvailable;
};

export const nereastInventory = async (product_variant_id, userAdress) => {
	let nereastStock = null;
	let minDistance = Number.POSITIVE_INFINITY;
	const foundInventories = await db.Inventory.findAll({
		where: { product_variant_id },
	});
	if (foundInventories.length === 1) {
		return foundInventories[0].location;
	}
	for (const inventory of foundInventories) {
		const distance = await calculateDistance(userAdress, inventory.location);
		if (distance < minDistance) {
			minDistance = distance;
			nereastStock = inventory;
		}
	}
	if (nereastStock) {
		return nereastStock.location;
	}
	throwError(400, "Không tìm thấy địa chỉ kho gần nhất!");
};
