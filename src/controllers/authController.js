import { register, login } from "../services/auth_service";

export const registerController = async (req, res) => {
	try {
		const { email, password } = req.body;
		if (!email || !password)
			return res.status(400).json({
				error: 1,
				message: "Missing Payloads",
			});
		console.log(email, password);
		const response = await register(email, password);

		return res.status(200).json(response);
	} catch (error) {
		return res.status(500).json({
			error: -1,
			message: "Server Internal Error",
		});
	}
};
export const loginController = async (req, res) => {
	try {
		const { email, password } = req.body;
		const response = await login(email, password);
		return res.status(200).json(response);
	} catch (error) {
		return res.status(500).json({
			error: -1,
			message: "Server Internal Error",
		});
	}
};
