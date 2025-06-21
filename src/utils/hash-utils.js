import bcrypt from "bcryptjs";

export const hashPassword = (password) => {
	return bcrypt.hashSync(password, bcrypt.genSaltSync(10));
};
