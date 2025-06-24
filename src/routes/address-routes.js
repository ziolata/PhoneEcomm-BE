import * as controller from "../controllers/address-controller.js";
import { Router } from "express";
import { isAuthenticated } from "../middleware/auth-middleware.js";

/**
 * @swagger
 * tags:
 *   name: Address
 *   description: API quản lý địa chỉ người dùng
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Address:
 *       type: object
 *       properties:
 *         user_id:
 *           type: integer
 *         shipping_id:
 *           type: integer
 *         name:
 *           type: string
 *         phone:
 *           type: integer
 *         address_line_1:
 *           type: integer
 *         address_line_2:
 *           type: integer
 *         address_type:
 *           type: string
 *           enum: [Home, Office]
 *         address_default:
 *           type: string
 *           enum: [Yes, No]
 *       example:
 *         user_id: 1
 *         shipping_id: 10
 *         name: Nguyễn Văn A
 *         phone: 0123456789
 *         address_line_1: 123
 *         address_line_2: 456
 *         address_type: Home
 *         address_default: Yes
 */

/**
 * @swagger
 * /api/v1/address/add:
 *   post:
 *     summary: Thêm địa chỉ mới
 *     tags: [Address]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Address'
 *     responses:
 *       200:
 *         description: Thêm địa chỉ thành công
 *       401:
 *         description: Chưa đăng nhập
 */

/**
 * @swagger
 * /api/v1/address:
 *   get:
 *     summary: Lấy danh sách địa chỉ của người dùng
 *     tags: [Address]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lấy danh sách địa chỉ thành công
 *       400:
 *         description: Không tìm thấy địa chỉ
 *       401:
 *         description: Chưa đăng nhập
 */

/**
 * @swagger
 * /api/v1/address/update/{id}:
 *   get:
 *     summary: Cập nhật địa chỉ
 *     tags: [Address]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID của địa chỉ cần cập nhật
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Address'
 *     responses:
 *       200:
 *         description: Cập nhật địa chỉ thành công
 *       400:
 *         description: Không có quyền cập nhật
 *       401:
 *         description: Chưa đăng nhập
 */

/**
 * @swagger
 * /api/v1/address/delete/{id}:
 *   get:
 *     summary: Xóa địa chỉ
 *     tags: [Address]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID của địa chỉ cần xóa
 *     responses:
 *       200:
 *         description: Xóa địa chỉ thành công
 *       400:
 *         description: Không có quyền xóa
 *       401:
 *         description: Chưa đăng nhập
 */

const routes = new Router();

routes.post("/add", isAuthenticated, controller.createAddressController);
routes.get("/", isAuthenticated, controller.getAllAddressByUserIdController);
routes.get("/update/:id", isAuthenticated, controller.updateAddressController);
routes.get("/delete/:id", isAuthenticated, controller.deleteAddressController);

export default routes;
