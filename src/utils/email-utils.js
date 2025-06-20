import { transporter } from "../config/nodemailer.js";

export const sendResetEmail = async (to, link) => {
	const mailOptions = {
		from: `"Ecommerce App" <${process.env.EMAIL_USER}>`,
		to,
		subject: "Đặt lại mật khẩu",
		html: `<p>Bạn đã yêu cầu đặt lại mật khẩu.</p>
			<p>Nhấp vào liên kết dưới đây để đặt lại mật khẩu:</p>
			<a href="${link}">Click vào đây để đặt lại mật khẩu</a>
			<p>Liên kết này sẽ hết hạn sau 15 phút.</p>`,
	};

	await transporter.sendMail(mailOptions);
};

export const sendEmailOrder = async (to, products) => {
	const mailOptions = {
		from: `"Ecommerce App" <${process.env.EMAIL_USER}>`,
		to,
		subject: "Đơn đặt hàng từ PhoneStore",
		html: `
            <div style="font-family: Arial, sans-serif; text-align: center; padding: 20px; border: 1px solid #ddd;">
                <h2 style="color: #2c3e50;">Bạn đã đặt đơn hàng thành công! 🎉</h2>
                <p style="font-size: 16px; color: #555;">Cảm ơn bạn đã mua hàng tại <strong>PhoneStore</strong>.</p>
                
                <!-- Danh sách sản phẩm hiển thị theo hàng ngang -->
                <p style="font-size: 16px; color: #555;">Sản phẩm đã đặt:</p>
                <table style="width: 100%; text-align: center; margin: 20px auto;">
                
                    <tr>
                        ${products
													.map(
														(product) => `
                            <td style="padding: 10px;">
                                <img src="${product.img}" alt="${product.sku}" 
                                    style="width: 150px; border-radius: 10px; box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);" />
                                <p style="font-size: 16px; font-weight: bold; color: #333;">${product.sku}</p>
                            </td>
                        `,
													)
													.join("")}
                    </tr>
                </table>

                <!-- Nút xem đơn hàng -->
                <a href="https://your-ecommerce-site.com/" 
                   style="display: inline-block; padding: 10px 15px; background-color: #3498db; color: white; text-decoration: none; font-weight: bold; border-radius: 5px; margin-top: 20px;">
                    Xem chi tiết đơn hàng
                </a>
            </div>
        `,
	};

	await transporter.sendMail(mailOptions);
};
