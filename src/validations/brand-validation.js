import Joi from "joi";

export const brandValidate = Joi.object({
	name: Joi.string().required().messages({
		"string.base": "Tên sản phẩm phải là chuỗi!",
		"any.required": "Tên sản phẩm không được để trống!",
	}),
	img: Joi.alternatives()
		.required()
		.messages({ "any.required": "Trường img là bắt buộc!" })
		.try(
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

export const updateBrandValidate = Joi.object({
	name: Joi.string().messages({
		"string.base": "Tên sản phẩm phải là chuỗi!",
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
	description: Joi.string().messages({}),
});
