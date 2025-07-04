export const errorHandler = (err, req, res, next) => {
	const status = err.status || 500;
	const errorName = err.error || "Unknown Error";

	res.status(status).json({
		success: false,
		status,
		error: errorName,
		message: err.message || "Đã có lỗi xảy ra!",
		path: req.originalUrl,
		method: req.method,
		timestamp: new Date().toISOString(),
	});
};
