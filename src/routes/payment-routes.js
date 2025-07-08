import * as controller from "../controllers/payment-controller.js";
import { Router } from "express";
import { isAdmin, isAuthenticated } from "../middleware/auth-middleware.js";

/**
 * @swagger
 * tags:
 *   name: Payment
 *   description: Các API quản lý thanh toán
 */

/**
 * @swagger
 * /api/v1/payment/create_payment:
 *   post:
 *     summary: Thanh toán đơn hàng
 *     tags: [Payment]
 *     security:
 *       - bearerAuth: []
 *     description: |
 *
 *        Thẻ test:
 *         - Ngân hàng: NCB
 *         - Số thẻ: 9704198526191432198
 *         - Tên chủ thẻ:NGUYEN VAN A
 *         - Ngày phát hành:07/15
 *         - Mật khẩu OTP:123456
 *
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               order_id:
 *                 type: string
 *
 *             example:
 *               order_id: "1"
 *     responses:
 *       200:
 *         description: Thêm rạp chiếu thành công
 *       400:
 *         description: Rạp chiếu đã tồn tại
 *       401:
 *         description: Chưa đăng nhập hoặc không có quyền
 */

/**
 * @swagger
 * /api/v1/payment/:
 *   post:
 *     summary: Lấy danh sách thanh toán đơn hàng (dành cho Admin)
 *     tags: [Payment]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: page
 *         in: path
 *         description: số trang (không nhập mặc định sẽ = 1)
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               order_id:
 *                 type: string
 *
 *             example:
 *               order_id: "1"
 *     responses:
 *       200:
 *         description: Thêm rạp chiếu thành công
 *       400:
 *         description: Rạp chiếu đã tồn tại
 *       401:
 *         description: Chưa đăng nhập hoặc không có quyền
 */
const routes = new Router();

routes.post(
	"/create_payment",
	isAuthenticated,
	controller.createPaymentController,
);
routes.get("/vnpay_return", controller.getPaymentController);
routes.get("/", isAdmin, controller.getAllPaymentController);

export default routes;
