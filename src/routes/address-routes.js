import * as controller from "../controllers/address-controller.js";
import { Router } from "express";
import { isAdmin, isAuthenticated } from "../middleware/auth-middleware.js";

/**
 * @swagger
 * tags:
 *   name: Address
 *   description: API quản lý địa chỉ người dùng
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
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               phone:
 *                 type: string
 *               address_line_1:
 *                 type: string
 *               address_line_2:
 *                 type: string
 *               address_type:
 *                 type: string
 *                 enum: [Home, Office]
 *               address_default:
 *                 type: string
 *                 enum: [Yes, No]
 *     responses:
 *       201:
 *         description: Thêm địa chỉ thành công!
 *       401:
 *        description: >
 *         - Phiên đăng nhập đã hết thời gian, vui lòng đăng nhập lại !
 *
 *         - Token xác thực không hợp lệ, vui lòng đăng nhập lại!
 *
 *         - Chưa đăng nhập: Vui lòng đăng nhập để tiếp tục.
 *       500:
 *         description: Đã xảy ra lỗi khi xác thực phiên đăng nhập, vui lòng thử lại sau!
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
 *       401:
 *        description: >
 *         - Phiên đăng nhập đã hết thời gian, vui lòng đăng nhập lại !
 *
 *         - Token xác thực không hợp lệ, vui lòng đăng nhập lại!
 *
 *         - Chưa đăng nhập: Vui lòng đăng nhập để tiếp tục.
 *       500:
 *         description: Đã xảy ra lỗi khi xác thực phiên đăng nhập, vui lòng thử lại sau!
 */

/**
 * @swagger
 * /api/v1/address/update/{id}:
 *   put:
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
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               phone:
 *                 type: string
 *               address_line_1:
 *                 type: string
 *               address_line_2:
 *                 type: string
 *               address_type:
 *                 type: string
 *                 enum: [Home, Office]
 *               address_default:
 *                 type: string
 *                 enum: [Yes, No]
 *     responses:
 *       200:
 *         description: Cập nhật địa chỉ thành công!
 *       404:
 *         description: Không tìm thấy địa chỉ!
 *       403:
 *         description: Bạn không có quyền cập nhật địa chỉ của tài khoản khác!
 *       401:
 *        description: >
 *         - Phiên đăng nhập đã hết thời gian, vui lòng đăng nhập lại !
 *
 *         - Token xác thực không hợp lệ, vui lòng đăng nhập lại!
 *
 *         - Chưa đăng nhập: Vui lòng đăng nhập để tiếp tục.
 *       500:
 *         description: Đã xảy ra lỗi khi xác thực phiên đăng nhập, vui lòng thử lại sau!
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
 *       403:
 *         description: Bạn không có quyền xóa địa chỉ của tài khoản khác!
 *       401:
 *        description: >
 *         - Phiên đăng nhập đã hết thời gian, vui lòng đăng nhập lại !
 *
 *         - Token xác thực không hợp lệ, vui lòng đăng nhập lại!
 *
 *         - Chưa đăng nhập: Vui lòng đăng nhập để tiếp tục.
 *       500:
 *         description: Đã xảy ra lỗi khi xác thực phiên đăng nhập, vui lòng thử lại sau!
 */

const routes = new Router();

routes.post("/add", isAuthenticated, controller.createAddressController);
routes.get("/", isAdmin, controller.getAllAddressController);
routes.get("/me", isAuthenticated, controller.getAddressByUserIdController);
routes.put("/update/:id", isAuthenticated, controller.updateAddressController);
routes.delete(
	"/delete/:id",
	isAuthenticated,
	controller.deleteAddressController,
);

export default routes;
