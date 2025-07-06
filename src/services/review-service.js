import db from "../models/index.js";
import { successResponse, throwError } from "../utils/response-utils.js";
import { handleValidate } from "../utils/handle-validation-utils.js";
import {
	reviewValidate,
	updateReviewValidate,
} from "../validations/review-validation.js";
import { uploadImage } from "../utils/cloudinary-utils.js";

const getOrThrowReviewById = async (id) => {
	const foundReview = await db.Review.findByPk(id);
	if (!foundReview) {
		throwError(404, "Không tìm thấy đánh giá!");
	}
	return foundReview;
};

export const createReview = async (data, user_id, imgFile) => {
	// Khi có files tạo data.img để validData nhận được
	if (imgFile) {
		data.img = { size: imgFile.size };
	}
	const validData = handleValidate(reviewValidate, data);
	const existingProduct = await db.Order_item.findOne({
		where: {
			product_variant_id: validData.product_variant_id,
		},
		include: {
			model: db.Order,
			attributes: ["user_id", "status"],
			where: {
				user_id,
				status: "completed",
			},
		},
	});
	const existingReview = await db.Review.findOne({
		where: {
			product_variant_id: validData.product_variant_id,
			user_id,
		},
	});
	if (!existingProduct) {
		throwError(400, "Bạn chưa mua sản phẩm này không thể đánh giá!");
	}
	if (existingReview) {
		throwError(400, "Sản phẩm này bạn đã đánh giá!");
	}
	// Upload img đánh giá nếu không có lỗi
	if (validData.img) {
		const image = await uploadImage(
			imgFile.tempFilePath,
			`p${validData.product_variant_id}-u${user_id}`,
			"Reviews",
		);
		validData.img = image;
	}
	const response = await db.Review.create(validData);
	return successResponse("Đánh giá thành công!", response);
};

export const getAllReview = async (product_variant_id) => {
	const response = await db.Review.findAll({ where: { product_variant_id } });
	return successResponse(
		`Lấy danh sách đánh giá của sản phẩm ${product_variant_id} thành công!`,
		response,
	);
};

export const getOneReview = async (id) => {
	const foundReview = await getOrThrowReviewById(id);
	return successResponse(
		`Lấy danh sách đánh giá của sản phẩm ${id} thành công!`,
		foundReview,
	);
};

export const deleteReview = async (id, user) => {
	const foundReview = await getOrThrowReviewById(id);
	if (foundReview.user_id !== user.id && user.role !== "ADMIN") {
		throwError(403, "Bạn không thể xóa đánh giá của tài khoản khác!");
	}
	await db.Review.destroy({ where: { id } });
	return successResponse("Xóa thành công!");
};

export const updateReview = async (id, data, user, imgFile) => {
	if (imgFile) {
		data.img = { size: imgFile.size };
	}
	const validData = handleValidate(updateReviewValidate, data);
	const foundReview = await getOrThrowReviewById(id);
	if (validData.product_variant_id) {
		throwError(400, "Product_variant_id không thể cập nhật!");
	}

	if (foundReview.user_id !== user.id && user.role !== "ADMIN") {
		throwError(403, "Bạn không thể chỉnh sửa đánh giá của tài khoản khác!");
	}

	if (validData.img) {
		const image = await uploadImage(
			imgFile.tempFilePath,
			`p${foundReview.product_variant_id}-u${user.id}`,
			"Reviews",
		);
		validData.img = image;
	}

	await db.Review.update(validData, {
		where: {
			id,
		},
	});
	return successResponse("Cập nhật thành công!");
};
