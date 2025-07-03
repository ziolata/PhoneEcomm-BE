import Joi from "joi";

export const optionValidate = Joi.object({
	name: Joi.string().required().messages({
		"any.required": "Tên option không được để trống!",
		"string.base": "Tên option phải là dạng string!",
		"string.empty": "Tên option không được để trống!",
	}),
});

export const optionValueValidate = Joi.object({
	value: Joi.string().required().messages({
		"any.required": "value không được để trống!",
	}),
	option_id: Joi.number().integer().positive().required().messages({
		"number.base": "ID Option_id phải là số.",
		"number.integer": "ID Option_id phải là số nguyên.",
		"number.positive": "ID Option_id phải lớn hơn 0.",
		"any.required": "ID Option_id là bắt buộc.",
	}),
});

export const updateOptionValueValidate = Joi.object({
	value: Joi.string().messages({}),
	option_id: Joi.number().integer().positive().messages({
		"number.base": "ID Option_id phải là số.",
		"number.integer": "ID Option_id phải là số nguyên.",
		"number.positive": "ID Option_id phải lớn hơn 0.",
	}),
});
