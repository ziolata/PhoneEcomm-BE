export const sendResponse = (res, status, data) => {
	return res.status(status).json(data);
};
export const throwError = (res, error) => {
	const statusError = error.status || 500;
	const messageError = error.message || "Server Internal Error";
	return res.status(statusError).json(messageError);
};
