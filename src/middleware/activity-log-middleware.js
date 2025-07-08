import db from "../models/index.js"; // giả sử bạn đang load models ở đây

export const auditLogger = async (req, res, next) => {
	try {
		const role = req.user.role;
		console.log(role);

		// Nếu không phải admin và staff thì bỏ qua
		if (role !== "ADMIN" && role !== "STAFF") return next();

		// Lấy tên model hoặc resource từ URL
		const target = req.originalUrl.split("/")[3];

		// Chỉ log khi là POST, DELETE, PUT, hoặc PATCH thành công
		console.log(req.method);
		console.log(req.body);

		if (
			req.method === "POST" ||
			req.method === "DELETE" ||
			req.method === "PUT" ||
			(req.method === "PATCH" && res.statusCode >= 200 && res.statusCode < 300)
		) {
			await db.Activity_log.create({
				user_id: req.user.id,
				role: req.user.role,
				action: req.method,
				target: target,
				target_id: req.params?.id || null,
				description: `${req.method} ${target} ${req.params?.id || ""} ${JSON.stringify(req.body) || ""}`,
				ip_address: req.ip,
			});
		}
	} catch (error) {
		console.log(error);
	}

	next();
};
