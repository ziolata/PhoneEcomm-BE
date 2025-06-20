import Joi from "joi";

export const productValidate = Joi.object({
	name: Joi.string().required().messages({
		"string.name": "Tên sản phẩm không hợp lệ!",
		"any.required": "Tên sản phẩm không được để trống!",
	}),
	img: Joi.object().keys({
		size: Joi.number()
			.required()
			.max(2 * 1024 * 1024)
			.message({
				"string.img": "Ảnh không được trống",
				"number.max": "Kích thước ảnh phải dưới 2MB",
			}),
	}),
	description: Joi.string().required().messages({
		"any.required": "Mô tả không được để trống!",
	}),
	features: Joi.string().valid("hot", "discount", "over").required().messages({
		"any.only": "Features chỉ được nhận giá trị: 'hot', 'discount', 'over'!",
		"any.required": "Features là bắt buộc!",
	}),
});
