import Joi from "joi";
const pattern = /^[a-zA-Z0-9!@#$%&*]{6,25}$/;
export const userSchema = Joi.object({
	email: Joi.string()
		.email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
		.required(),
	password: Joi.string().regex(pattern).required(),
});
