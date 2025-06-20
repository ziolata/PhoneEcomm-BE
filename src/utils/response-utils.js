export const successResponse = (message, data) => {
	return {
		success: true,
		message: message,
		data,
	};
};
export const throwError = (statusCode, mess) => {
	const errorNames = {
		400: "Bad Request",
		401: "Unauthorized",
		403: "Forbidden",
		404: "Not Found",
		409: "Conflict",
	};

	const error = new Error(mess);
	error.error = errorNames[statusCode] || "Unknown Error";
	error.status = statusCode;

	throw error;
};
