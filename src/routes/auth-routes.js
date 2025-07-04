import * as controller from "../controllers/auth-controller.js";
import { Router } from "express";
import { isAuthenticated } from "../middleware/auth-middleware.js";

/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: Quản lý xác thực người dùng
 */

/**
 * @swagger
 * /api/v1/auth/register:
 *   post:
 *     summary: Đăng ký tài khoản
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               fullname:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *               repassword:
 *                 type: string
 *               sex:
 *                 type: string
 *                 enum: [male, female]
 *               phone:
 *                 type: string
 *
 *             example:
 *               fullname: "Nguyen Van A"
 *               email: "nguyenvana@gmail.com"
 *               password: "123456"
 *               repassword: "123456"
 *               sex: "male"
 *               phone: "0123456789"
 *     responses:
 *       201:
 *         description: Đăng ký thành công!
 *       400:
 *         description: Email đăng ký đã tồn tại!
 */

/**
 * @swagger
 * /api/v1/auth/login:
 *   post:
 *     summary: Đăng nhập tài khoản
 *     tags: [Auth]
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
 *             example:
 *               email: "nguyenvana@gmail.com"
 *               password: "123456"
 *     responses:
 *       200:
 *         description: Đăng nhập thành công!
 *       400:
 *         description: Sai tài khoản hoặc mật khẩu!
 */
/**
 * @swagger
 * /api/v1/auth/change_pass:
 *   post:
 *     summary: Đổi mật khẩu
 *     tags: [Auth]
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
 *               password: "oldpassword"
 *               newpassword: "newpassword"
 *               repassword: "reNewPassword"
 *     responses:
 *       200:
 *         description: Đổi mật khẩu thành công
 *       401:
 *        description: >
 *         - Phiên đăng nhập đã hết thời gian, vui lòng đăng nhập lại !
 *
 *         - Token xác thực không hợp lệ, vui lòng đăng nhập lại!
 *
 *         - Chưa đăng nhập: Vui lòng đăng nhập để tiếp tục.
 *       500:
 *         description: Đã xảy ra lỗi khi xác thực phiên đăng nhập, vui lòng thử lại sau!
 *       404:
 *         description: Email không tồn tại!
 */

/**
 * @swagger
 * /api/v1/auth/forgot:
 *   post:
 *     summary: Quên mật khẩu
 *     tags: [Auth]
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
 *         description: Yêu cầu đã được gửi vào email!
 *       404:
 *         description: Email không tồn tại!
 */

/**
 * @swagger
 * /api/v1/auth/reset_password/{token}:
 *   post:
 *     summary: Đặt lại mật khẩu
 *     tags: [Auth]
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
 *         description: Đặt lại mật khẩu thành công!
 *       404:
 *         description: Yêu cầu đổi mật khẩu không tồn tại!
 */
const routes = new Router();

routes.post("/register", controller.registerController);
routes.post("/login", controller.loginController);
routes.post(
	"/change_pass",
	isAuthenticated,
	controller.changePasswordController,
);
routes.post("/forgot", controller.forgotPasswordController);
routes.post("/reset_password/:token", controller.resetPasswordController);
export default routes;
