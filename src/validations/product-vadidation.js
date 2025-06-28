import Joi from "joi";

export const productValidate = Joi.object({
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
	features: Joi.string().valid("hot", "discount", "over").required().messages({
		"any.only": "Features chỉ được nhận giá trị: 'hot', 'discount', 'over'!",
		"any.required": "Features là bắt buộc!",
	}),
});

export const productVariantValidate = Joi.object({
	product_id: Joi.number().integer().positive().required().messages({
		"number.base": "ID sản phẩm phải là số.",
		"number.integer": "ID sản phẩm phải là số nguyên.",
		"number.positive": "ID sản phẩm phải lớn hơn 0.",
		"any.required": "ID sản phẩm là bắt buộc.",
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
	sku: Joi.string().trim().min(3).max(50).required().messages({
		"string.base": "SKU phải là chuỗi.",
		"string.empty": "SKU không được để trống.",
		"string.min": "SKU phải có ít nhất 3 ký tự.",
		"string.max": "SKU không được vượt quá 50 ký tự.",
		"any.required": "SKU là bắt buộc.",
	}),
	price: Joi.number().positive().required().messages({
		"number.base": "Giá phải là số.",
		"number.positive": "Giá phải lớn hơn 0.",
		"any.required": "Giá là bắt buộc.",
	}),
});
