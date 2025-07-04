import Joi from "joi";

export const reviewValidate = Joi.object({
	review: Joi.string().required().messages({
		"string.base": "Đánh giá phải là chuỗi!",
		"any.required": "Đánh giá không được để trống!",
	}),
	product_variant_id: Joi.number().integer().positive().required().messages({
		"number.base": "ID sản phẩm đánh giá phải là số.",
		"number.integer": "ID  phẩm đánh giá là số nguyên.",
		"number.positive": "ID  phẩm đánh giá phải lớn hơn 0.",
		"any.required": "ID phẩm đánh giá là bắt buộc.",
	}),
	user_id: Joi.number().integer().positive().required().messages({
		"number.base": "user_id phải là số.",
		"number.integer": "user_id là số nguyên.",
		"number.positive": "user_id lớn hơn 0.",
		"any.required": "user_id là bắt buộc.",
	}),
	rating: Joi.number().precision(2).min(1).max(5).required().messages({
		"number.base": "Sao đánh giá phải là số!",
		"number.min": "Số sao đánh giá phải lớn hoặc bằng 1!",
		"number.max": "Số sao đánh giá lơn nhất là 5!",
		"any.required": "Số sao đánh giá là bắt buộc!",
	}),
});

export const updateReviewValidate = Joi.object({
	review: Joi.string().messages({
		"string.base": "Đánh giá phải là chuỗi!",
	}),
	rating: Joi.number().precision(2).min(1).max(5).messages({
		"number.base": "Sao đánh giá phải là số!",
		"number.min": "Số sao đánh giá phải lớn hoặc bằng 1!",
		"number.max": "Số sao đánh giá lơn nhất là 5!",
	}),
});
