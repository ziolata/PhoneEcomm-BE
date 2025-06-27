import * as controller from "../controllers/user-controller.js";
import { Router } from "express";
import { isAdmin, isAuthenticated } from "../middleware/auth-middleware.js";

/**
 * @swagger
 * tags:
 *   name: User
 *   description: Quản lý người dùng
 */

/**
 * @swagger
 * /api/v1/user/all:
 *   get:
 *     summary: Lấy tất cả thông tin người dùng (chỉ dành cho admin)
 *     tags: [User]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lấy danh sách người dùng thành công!
 *       401:
 *         description: Chưa xác thực
 */

/**
 * @swagger
 * /api/v1/user/me:
 *   get:
 *     summary: Lấy thông tin người dùng hiện tại
 *     tags: [User]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lấy thông tin thành công
 *       401:
 *         description: Chưa xác thực
 */

/**
 * @swagger
 * /api/v1/user/{id}:
 *   get:
 *     summary: Lấy thông tin người dùng theo ID (chỉ dành cho admin)
 *     tags: [User]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID người dùng
 *     responses:
 *       200:
 *         description: Lấy thông tin thành công
 *       404:
 *         description: Không tìm thấy người dùng
 */

/**
 * @swagger
 * /api/v1/user/update/me:
 *   put:
 *     summary: Cập nhật thông tin người dùng hiện tại
 *     tags: [User]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               fullname:
 *                 type: string
 *               phone:
 *                 type: integer
 *               avatar:
 *                 type: string
 *                 format: binary
 *             example:
 *               fullname: "Nguyen Van A"
 *               phone: 0987654321
 *     responses:
 *       200:
 *         description: Cập nhật thành công!
 *       400:
 *         description: Dữ liệu không hợp lệ
 *       401:
 *         description: Chưa xác thực
 */

/**
 * @swagger
 * /api/v1/user/update/{id}:
 *   put:
 *     summary: Admin cập nhật thông tin người dùng theo ID
 *     tags: [User]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID người dùng
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               fullname:
 *                 type: string
 *               phone:
 *                 type: integer
 *               role_id:
 *                 type: integer
 *               avatar:
 *                 type: string
 *                 format: binary
 *             example:
 *               fullname: "Admin Updated"
 *               phone: 0987654321
 *               role_id: 2
 *     responses:
 *       200:
 *         description: Cập nhật thành công!
 *       403:
 *         description: Bạn không có quyền thay đổi vai trò!
 *       404:
 *         description: Không tìm thấy người dùng!
 */

/**
 * @swagger
 * /api/v1/user/delete/{id}:
 *   delete:
 *     summary: Xoá người dùng (chỉ dành cho admin)
 *     tags: [User]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID người dùng cần xoá
 *     responses:
 *       200:
 *         description: Xoá thành công
 *       403:
 *         description: Không có quyền
 *       404:
 *         description: Không tìm thấy người dùng
 */

const routes = new Router();
routes.get("/all", isAdmin, controller.getAllUserController);
routes.get("/me", isAuthenticated, controller.getUserController);
routes.get("/:id", controller.getUserController);
routes.put("/update/me", isAuthenticated, controller.updateUserController);
routes.put("update/:id", isAdmin, controller.updateUserController);
routes.delete("/delete/:id", isAdmin, controller.deleteUserController);

export default routes;
