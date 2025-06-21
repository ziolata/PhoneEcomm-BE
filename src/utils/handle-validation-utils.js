export const handleValidate = (schema, data) => {
	const { error } = schema.validate(data, { abortEarly: false });
	if (error) {
		const messageErr = error.details.map((err) => err.message);
		throw { status: 400, message: messageErr };
	}
	return true;
};
