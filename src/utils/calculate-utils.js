import node_geocoder from "node-geocoder";
import haversine from "haversine";
const options = {
	provider: "openstreetmap", // Dùng dịch vụ OpenStreetMap miễn phí
};
const geocoder = node_geocoder(options);
export const getCoordinates = async (address) => {
	try {
		const res = await geocoder.geocode(address);
		if (res.length > 0) {
			console.log(
				`Tọa độ của "${address}": Latitude: ${res[0].latitude}, Longitude: ${res[0].longitude}`,
			);
			return { latitude: res[0].latitude, longitude: res[0].longitude };
		}
		console.log(`Không tìm thấy tọa độ cho địa chỉ: "${address}"`);
		return null;
	} catch (error) {
		console.error("Lỗi:", error.message);
	}
};
export const calculateDistance = async (home, stock) => {
	const addrHome = await getCoordinates(home);
	const addrStock = await getCoordinates(stock);
	const distance = haversine(addrHome, addrStock);
	return distance;
};

export const calculatorQuantity = async (data) => {
	for (const q of data) {
		let totalQuantity = 0;
		for (const p of q.Product_variants) {
			if (p.Inventories) {
				for (const i of p.Inventories) {
					totalQuantity += i.quantity;
					p.setDataValue("totalQuantity", totalQuantity);
				}
			}
		}
	}
};
export const calculatorQuantityOnePrd = async (data) => {
	let totalQuantity = 0;
	for (const p of data.Product_variants) {
		if (p.Inventories) {
			for (const i of p.Inventories) {
				totalQuantity += i.quantity;
				p.setDataValue("totalQuantity", totalQuantity);
			}
		}
	}
};
export const calculatorProductVarianQuantity = async (data) => {
	let totalQuantity = 0;
	for (const p of data.Product_variants) {
		if (p.Inventories) {
			for (const i of p.Inventories) {
				totalQuantity += i.quantity;
				p.setDataValue("totalQuantity", totalQuantity);
			}
		}
	}
};

/**
 * Tính tổng giá trị đơn hàng sau khi áp dụng mã giảm giá (nếu có)
 * @async
 * @param {number} user - ID của người dùng
 * @param {string|null} discount - Mã giảm giá (có thể null)
 * @param {Array<Object>} itemData - Danh sách sản phẩm trong giỏ hàng
 * @param {number} itemData[].product_variant_id - ID của biến thể sản phẩm
 * @param {number} itemData[].quantity - Số lượng sản phẩm
 * @returns {Promise<{totalPrice: number, foundCode: Object|null}>} - Trả về tổng giá đơn hàng và thông tin mã giảm giá
 */
export const calculateTotalPrice = async (user, discount, itemData) => {
	let totalPrice = 0;
	let foundCode = null;
	let fix_amount = null;
	for (const q of itemData) {
		const foundProduct = await db.Product_variant.findByPk(
			q.product_variant_id,
		);
		if (discount) {
			foundCode = await applyDiscount(discount, user);
			// Điều kiện của code trừ theo %

			if (foundCode.discount_type === "percentage_discount") {
				if (
					foundCode.target_type === "all" ||
					(foundCode.target_type === "product_variant" &&
						foundCode.target_id === q.product_variant_id) ||
					(foundCode.target_type === "category" &&
						foundCode.target_id === foundProduct.category_id) ||
					(foundCode.target_type === "brand" &&
						foundCode.target_id === foundProduct.brand_id &&
						foundProduct.price >= foundCode.min_value)
				) {
					let max_discount_amount =
						(foundCode.value * foundProduct.price) / 100;
					if (max_discount_amount >= foundCode.max_discount_amount) {
						max_discount_amount = foundCode.max_discount_amount;
					}
					foundProduct.price = foundProduct.price - max_discount_amount;
				}
			}
			// Điều kiện của code trừ thẳng giá tiền
			if (foundCode.discount_type === "fixed_amount_discount") {
				if (
					foundCode.target_type === "all" ||
					(foundCode.target_type === "product_variant" &&
						foundCode.target_id === q.product_variant_id) ||
					(foundCode.target_type === "category" &&
						foundCode.target_id === foundProduct.category_id) ||
					(foundCode.target_type === "brand" &&
						foundCode.target_id === foundProduct.brand_id)
				) {
					fix_amount = true;
				}
			}
		}
		totalPrice += fix_amount
			? q.quantity * foundProduct.price - foundCode.value
			: q.quantity * foundProduct.price;
	}
	if (foundCode) {
		await db.User_Discount.create({
			user_id: user,
			discount_code_id: foundCode.id,
		});
	}
	return { totalPrice: totalPrice, foundCode };
};
