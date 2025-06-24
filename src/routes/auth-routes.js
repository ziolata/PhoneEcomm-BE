import {
	registerController,
	loginController,
} from "../controllers/auth-controller.js";
import { Router } from "express";

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
 *             example:
 *               fullname: "Nguyen Van A"
 *               email: "nguyenvana@gmail.com"
 *               password: "123456"
 *     responses:
 *       200:
 *         description: Đăng ký thành công
 *       400:
 *         description: Email đã tồn tại hoặc dữ liệu không hợp lệ
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
 *         description: Đăng nhập thành công
 *       400:
 *         description: Sai tài khoản hoặc mật khẩu
 */

const routes = new Router();

routes.post("/register", registerController);
routes.post("/login", loginController);

export default routes;
