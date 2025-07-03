import Joi from "joi";

export const productValidate = Joi.object({
	name: Joi.string().required().messages({
		"string.base": "Tên sản phẩm phải là chuỗi!",
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
	features: Joi.string().valid("hot", "discount", "over").messages({
		"any.only": "Features chỉ được nhận giá trị: 'hot', 'discount', 'over'!",
		"any.required": "Features là bắt buộc!",
	}),
	category_id: Joi.number().integer().positive().required().messages({
		"number.base": "ID danh mục phải là số.",
		"number.integer": "ID danh mục phải là số nguyên.",
		"number.positive": "ID danh mụcphải lớn hơn 0.",
		"any.required": "ID danh mục là bắt buộc.",
	}),
	brand_id: Joi.number().integer().positive().required().messages({
		"number.base": "ID thương hiệu phải là số.",
		"number.integer": "ID thương hiệu phải là số nguyên.",
		"number.positive": "ID thương hiệu phải lớn hơn 0.",
		"any.required": "ID thương hiệu là bắt buộc.",
	}),
});

export const updateProductValidate = Joi.object({
	name: Joi.string().messages({
		"string.base": "Tên sản phẩm phải là chuỗi!",
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
	description: Joi.string().messages({
		"any.required": "Mô tả không được để trống!",
	}),
	features: Joi.string().valid("hot", "discount", "over").messages({
		"any.only": "Features chỉ được nhận giá trị: 'hot', 'discount', 'over'!",
	}),
	category_id: Joi.number().integer().positive().messages({
		"number.base": "ID danh mục phải là số.",
		"number.integer": "ID danh mục phải là số nguyên.",
		"number.positive": "ID danh mụcphải lớn hơn 0.",
	}),
	brand_id: Joi.number().integer().positive().messages({
		"number.base": "ID thương hiệu phải là số.",
		"number.integer": "ID thương hiệu phải là số nguyên.",
		"number.positive": "ID thương hiệu phải lớn hơn 0.",
	}),
});

export const productVariantValidate = Joi.object({
	product_id: Joi.number().integer().positive().required().messages({
		"number.base": "ID sản phẩm phải là số.",
		"number.integer": "ID sản phẩm phải là số nguyên.",
		"number.positive": "ID sản phẩm phải lớn hơn 0.",
		"any.required": "ID sản phẩm là bắt buộc.",
	}),
	img: Joi.alternatives()
		.required()
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
	price: Joi.number().positive().required().messages({
		"number.base": "Giá phải là số.",
		"number.positive": "Giá phải lớn hơn 0.",
		"any.required": "Giá là bắt buộc.",
	}),
}).unknown(true);

export const updateProductVariantValidate = Joi.object({
	product_d: Joi.number().integer().positive().messages({
		"number.base": "ID sản phẩm phải là số.",
		"number.integer": "ID sản phẩm phải là số nguyên.",
		"number.positive": "ID sản phẩm phải lớn hơn 0.",
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
	price: Joi.number().positive().messages({
		"number.base": "Giá phải là số.",
		"number.positive": "Giá phải lớn hơn 0.",
		"any.required": "Giá là bắt buộc.",
	}),
}).unknown(true);
