import { v2 as cloudinary } from "cloudinary";
cloudinary.config({
	cloud_name: process.env.CLOUD_NAME,
	api_key: process.env.API_KEY,
	api_secret: process.env.API_SECRET,
});
export const uploadImage = async (filePath, name, folder) => {
	const result = await cloudinary.uploader.upload(filePath, {
		folder: folder, // Chỉ định thư mục
		public_id: name, // Tạo public_id từ tên sản phẩm
	});

	return result.secure_url;
};
