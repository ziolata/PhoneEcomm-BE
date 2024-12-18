import jwt from "jsonwebtoken";
import createHttpError from "http-errors";

export const verifyToken = (token) => {
	if (!token) {
		return createHttpError.Unauthorized();
	}
	return jwt.verify(token, process.env.JWT_SECRET);
};
export const productRequestBody = (data, file) => {
	const { name, img, category_id, brand_id, stock_id } = data;
	return {
		name,
		img: file,
		category_id,
		brand_id,
		stock_id,
	};
};
