import crypto from "crypto";
import { format } from "date-fns";
import db from "../models";

export const vnpConfig = {
	vnp_TmnCode: process.env.vnp_TmnCode,
	vnp_HashSecret: process.env.vnp_HashSecret,
	vnp_Url: process.env.vnp_Url,
	vnp_ReturnUrl: process.env.vnp_ReturnUrl,
};

export const createPayment = async (data) => {
	const findOrder = await db.Order.findByPk(data.order_id);
	const vnp_TmnCode = vnpConfig.vnp_TmnCode;
	const vnp_HashSecret = vnpConfig.vnp_HashSecret;
	const vnp_Url = vnpConfig.vnp_Url;
	const vnp_ReturnUrl = vnpConfig.vnp_ReturnUrl;
	const date = new Date();
	const createDate = format(date, "yyyyMMddHHmmss");
	console.log(createDate);
	const vnp_TxnRef = format(date, "HHmmss");
	const orderInfo = `Thanh toan don hang ${data.order_id}`;
	const orderType = "billpayment";
	const locale = "vn";
	const currCode = "VND";
	const ipAddr = data.ip;
	const params = {
		vnp_Amount: findOrder.total_amount * 100,
		vnp_Command: "pay",
		vnp_CreateDate: createDate,
		vnp_CurrCode: currCode,
		vnp_IpAddr: data.ip,
		vnp_Locale: locale,
		vnp_OrderInfo: orderInfo,
		vnp_OrderType: orderType,
		vnp_ReturnUrl: vnp_ReturnUrl,
		vnp_TmnCode: vnp_TmnCode,
		vnp_TxnRef: vnp_TxnRef,
		vnp_Version: "2.1.0",
	};

	const sortedParams = new URLSearchParams(params).toString();
	const signData = crypto
		.createHmac("sha512", vnp_HashSecret)
		.update(sortedParams)
		.digest("hex");

	// Tạo URL thanh toán
	const paymentUrl = `${vnp_Url}?${sortedParams}&vnp_SecureHash=${signData}`;
	return { paymentUrl };
};

export const getPayment = async (data) => {
	const vnp_Params = data;
	const secureHash = vnp_Params.vnp_SecureHash;
	// biome-ignore lint/performance/noDelete: <explanation>
	delete vnp_Params.vnp_SecureHash;
	// biome-ignore lint/performance/noDelete: <explanation>
	delete vnp_Params.vnp_SecureHashType;

	// Sắp xếp lại các tham số
	const sortedParams = new URLSearchParams(vnp_Params).toString();

	// Kiểm tra chữ ký
	const hashSecret = vnpConfig.vnp_HashSecret;
	const calculatedHash = crypto
		.createHmac("sha512", hashSecret)
		.update(sortedParams)
		.digest("hex");
	const str = vnp_Params.vnp_OrderInfo;
	const number = str.match(/\d+/);
	if (secureHash === calculatedHash) {
		console.log(vnp_Params);
		if (vnp_Params.vnp_ResponseCode === "00") {
			const response = await db.Payment.create({
				order_id: number,
				amount: vnp_Params.vnp_Amount / 100,
				status: "Successfully",
			});

			return { message: "Giao dịch thành công", response };
		}
		await db.Payment.create({
			order_id: number,
			amount: vnp_Params.vnp_Amount / 100,
			status: "Failled",
		});
		return { message: "Thanh toán thất bại" };
	}
	return { message: "URL đã bị thay đổi, không hợp lệ" };
};
