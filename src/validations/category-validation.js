import Joi from "joi";

export const categoryValidate = Joi.object({
	name: Joi.string().required().messages({
		"string.name": "Tên sản phẩm không hợp lệ!",
		"any.required": "Tên sản phẩm không được để trống!",
	}),
	img: Joi.alternatives().try(
		Joi.string().uri().messages({
			"string.uri": "Img phải là đường dẫn hợp lệ",
		}),
		Joi.object().keys({
			size: Joi.number()
				.max(2 * 1024 * 1024)
				.messages({
					"number.max": "Kích thước ảnh phải dưới 2MB",
				}),
		}),
	),
	description: Joi.string().required().messages({
		"any.required": "Mô tả không được để trống!",
	}),
});
