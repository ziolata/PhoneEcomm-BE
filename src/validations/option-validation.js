import Joi from "joi";

export const optionValidate = Joi.object({
	name: Joi.string().required().messages({
		"any.required": "Tên option không được để trống!",
	}),
});
export const optionValueValidate = Joi.object({
	value: Joi.string().required().messages({
		"any.required": "Tên option không được để trống!",
	}),
});
