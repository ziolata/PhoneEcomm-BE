import * as controller from "../controllers/user-controller.js";
import { Router } from "express";
import { isAuthenticated } from "../middleware/auth-middleware.js";

/**
 * @swagger
 * tags:
 *   name: User
 *   description: Quản lý người dùng
 */

/**
 * @swagger
 * /api/v1/user/profile:
 *   get:
 *     summary: Lấy thông tin người dùng
 *     tags: [User]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lấy thông tin thành công
 *       401:
 *         description: Chưa đăng nhập
 */

/**
 * @swagger
 * /api/v1/user/update_profile:
 *   put:
 *     summary: Cập nhật thông tin người dùng
 *     tags: [User]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               fullname:
 *                 type: string
 *               avatar:
 *                 type: string
 *               phone:
 *                 type: integer
 *             example:
 *               fullname: "Nguyen Van A"
 *               avatar: "https://example.com/avatar.jpg"
 *               phone: 123456789
 *     responses:
 *       200:
 *         description: Cập nhật thành công
 *       400:
 *         description: Dữ liệu không hợp lệ
 *       401:
 *         description: Chưa đăng nhập
 */

/**
 * @swagger
 * /api/v1/user/change_pass:
 *   post:
 *     summary: Đổi mật khẩu
 *     tags: [User]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *               newpassword:
 *                 type: string
 *             example:
 *               email: "nguyenvana@gmail.com"
 *               password: "oldpassword"
 *               newpassword: "newpassword"
 *     responses:
 *       200:
 *         description: Đổi mật khẩu thành công
 *       400:
 *         description: Sai mật khẩu cũ hoặc dữ liệu không hợp lệ
 *       401:
 *         description: Chưa đăng nhập
 */

/**
 * @swagger
 * /api/v1/user/forgot_password:
 *   post:
 *     summary: Quên mật khẩu
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *             example:
 *               email: "nguyenvana@gmail.com"
 *     responses:
 *       200:
 *         description: Đã gửi email đặt lại mật khẩu
 *       400:
 *         description: Email không tồn tại
 */

/**
 * @swagger
 * /api/v1/user/reset_password/{token}:
 *   post:
 *     summary: Đặt lại mật khẩu
 *     tags: [User]
 *     parameters:
 *       - in: path
 *         name: token
 *         required: true
 *         schema:
 *           type: string
 *         description: Token xác thực từ email
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               password:
 *                 type: string
 *             example:
 *               password: "newpassword"
 *     responses:
 *       200:
 *         description: Đặt lại mật khẩu thành công
 *       400:
 *         description: Yêu cầu không hợp lệ
 *       404:
 *         description: Yêu cầu đổi mật khẩu không hợp lệ
 */

const routes = new Router();

routes.post(
	"/change_pass",
	isAuthenticated,
	controller.changePasswordController,
);
routes.post("/forgot_password", controller.forgotPasswordController);
routes.post("/reset_password/:token", controller.resetPasswordController);
export default routes;
