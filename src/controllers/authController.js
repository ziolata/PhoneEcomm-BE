import { register, login } from "../services/auth_service";
import { authSchema } from "../validations/authValidation";

export const registerController = async (req, res) => {
	try {
		const response = await register(req.body);
		return res.status(201).json(response);
	} catch (error) {
		const status = error.status;
		const message = error.message;
		return res.status(status).json({ message });
	}
};
export const loginController = async (req, res) => {
	try {
		const { email, password } = req.body;
		const response = await login(email, password);
		return res.status(200).json(response);
	} catch (error) {
		const status = error.status;
		const message = error.message;
		return res.status(status).json({ message });
	}
};
