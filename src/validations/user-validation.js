import Joi from "joi";

export const userSchema = Joi.object({
	fullname: Joi.string().min(6).messages({
		"string.min": "Họ và tên phải có ít nhất 6 ký tự!",
	}),
	avatar: Joi.alternatives().try(
		Joi.string().uri().messages({
			"string.uri": "Avatar phải là đường dẫn hợp lệ",
		}),
		Joi.object({
			size: Joi.number()
				.max(2 * 1024 * 1024)
				.messages({
					"number.max": "Kích thước ảnh phải dưới 2MB",
				}),
			mimetype: Joi.string()
				.valid("image/jpeg", "image/png", "image/webp")
				.messages({
					"any.only": "Chỉ cho phép ảnh jpg, png, webp",
				}),
		}),
	),
	phone: Joi.string()
		.pattern(/^[0-9]{10,11}$/)
		.messages({
			"string.pattern.base":
				"Số điện thoại phải có 10-11 chữ số và chỉ chứa số",
		}),
	email: Joi.string()
		.email({ tlds: { allow: false } }) // kiểm tra định dạng email
		.messages({
			"string.email": "Email không hợp lệ",
		}),
	sex: Joi.string().valid("male", "female").messages({
		"any.only": "Trường chỉ được nhận giá trị: 'male', 'female'!",
		"any.required": "Trường này là bắt buộc!",
	}),
});
