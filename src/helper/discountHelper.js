import db from "../models";

export const applyDiscount = async (discountCode, user) => {
	const NOW = new Date();
	const dateOnly = NOW.toISOString().split("T")[0];

	const foundCode = await db.Discount_code.findOne({
		where: {
			code: discountCode,
		},
	});
	if (!foundCode) {
		throw { status: 404, message: "Mã giảm giá không tồn tại!" };
	}
	const isUsedCode = await db.User_Discount.findOne({
		where: {
			user_id: user,
			discount_code_id: foundCode.id,
		},
	});

	if (dateOnly >= foundCode.expiry) {
		throw { status: 400, message: "Mã giảm giá đã hết thời gian sử dụng!" };
	}
	if (foundCode.usage_limit === foundCode.used_count) {
		throw { status: 400, message: "Mã giảm giả đã hết số lần sử dụng!" };
	}
	if (isUsedCode) {
		throw { status: 400, message: "Bạn đã sử dụng mã giảm giá này!" };
	}
	return foundCode;
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
export const CalculateTotalPrice = async (user, discount, itemData) => {
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
