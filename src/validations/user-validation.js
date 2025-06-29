import Joi from "joi";
const pattern = /^[a-zA-Z0-9!@#$%&*]{6,25}$/;

export const userSchema = Joi.object({
	fullname: Joi.string().min(6).messages({
		"string.required": "Họ và tên là bắt buộc",
	}),
	avatar: Joi.alternatives().try(
		Joi.string().uri().messages({
			"string.uri": "Avatar phải là đường dẫn hợp lệ",
		}),
		Joi.object().keys({
			size: Joi.number()
				.max(2 * 1024 * 1024)
				.messages({
					"number.max": "Kích thước ảnh phải dưới 2MB",
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
});

export const changePasswordValidate = Joi.object({
	password: Joi.string().regex(pattern).required().messages({
		"any.required": "Mật khẩu là bắt buộc",
		"string.pattern.base": "Mật khẩu phải có độ dài từ 6 - 25 ký tự",
	}),
	newpassword: Joi.string()
		.regex(pattern)
		.disallow(Joi.ref("password"))
		.required()
		.messages({
			"any.required": "Mật khẩu mới là bắt buộc.",
			"string.pattern.base":
				"Mật khẩu mới phải có độ dài từ 6 - 25 ký tự và chứa ít nhất 1 chữ cái và 1 số.",
			"any.invalid": "Mật khẩu mới không được trùng với mật khẩu hiện tại.",
		}),

	repassword: Joi.string().valid(Joi.ref("newpassword")).required().messages({
		"any.only": "Mật khẩu nhập lại không khớp với mật khẩu mới.",
		"any.required": "Bạn phải nhập lại mật khẩu mới.",
	}),
	sex: Joi.string().valid("male", "female").required().messages({
		"any.only": "Trường chỉ được nhận giá trị: 'male', 'female'!",
		"any.required": "Trường này là bắt buộc!",
	}),
});
