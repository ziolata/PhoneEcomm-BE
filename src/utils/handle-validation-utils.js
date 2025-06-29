export const handleValidate = (schema, data) => {
	const { error, value } = schema.validate(data, {
		abortEarly: false,
		stripUnknown: true,
	});

	if (error) {
		const messageErr = error.details.map((err) => err.message);
		throw { status: 400, message: messageErr };
	}

	return value;
};
