import * as controller from "../controllers/option-controller.js";
import { Router } from "express";
import { isAdmin } from "../middleware/auth-middleware.js";

/**
 * @swagger
 * tags:
 *   name: Option
 *   description: Quản lý các tuỳ chọn sản phẩm
 */

/**
 * @swagger
 * /api/v1/option:
 *   get:
 *     summary: Lấy danh sách tất cả option
 *     tags: [Option]
 *     responses:
 *       200:
 *         description: Lấy danh sách option thành công!
 */

/**
 * @swagger
 * /api/v1/option/add:
 *   post:
 *     summary: Thêm mới option
 *     tags: [Option]
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
 *             example:
 *               name: Màu sắc
 *     responses:
 *       201:
 *         description: Thêm thành công!
 *       400:
 *         description: Tên option đã tồn tại!
 *       401:
 *        description: >
 *         - Phiên đăng nhập đã hết thời gian, vui lòng đăng nhập lại !
 *
 *         - Token xác thực không hợp lệ, vui lòng đăng nhập lại!
 *
 *         - Chưa đăng nhập: Vui lòng đăng nhập để tiếp tục.
 *
 *         - Bạn không đủ quyền truy cập!
 *       500:
 *         description: Đã xảy ra lỗi khi xác thực phiên đăng nhập, vui lòng thử lại sau!
 */

/**
 * @swagger
 * /api/v1/option/update/{id}:
 *   put:
 *     summary: Cập nhật option
 *     tags: [Option]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID option cần cập nhật
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *             example:
 *               name: Kích thước
 *     responses:
 *       200:
 *         description: Cập nhật option thành công
 *       400:
 *         description: Tên option đã tồn tại!
 *       404:
 *         description: Option không tồn tại!
 *       401:
 *        description: >
 *         - Phiên đăng nhập đã hết thời gian, vui lòng đăng nhập lại !
 *
 *         - Token xác thực không hợp lệ, vui lòng đăng nhập lại!
 *
 *         - Chưa đăng nhập: Vui lòng đăng nhập để tiếp tục.
 *
 *         - Bạn không đủ quyền truy cập!
 *       500:
 *         description: Đã xảy ra lỗi khi xác thực phiên đăng nhập, vui lòng thử lại sau!
 */

/**
 * @swagger
 * /api/v1/option/delete/{id}:
 *   delete:
 *     summary: Xóa option
 *     tags: [Option]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID option cần xóa
 *     responses:
 *       200:
 *         description: Xóa option thành công
 *       404:
 *         description: Không tìm thấy option!
 *       401:
 *        description: >
 *         - Phiên đăng nhập đã hết thời gian, vui lòng đăng nhập lại !
 *
 *         - Token xác thực không hợp lệ, vui lòng đăng nhập lại!
 *
 *         - Chưa đăng nhập: Vui lòng đăng nhập để tiếp tục.
 *
 *         - Bạn không đủ quyền truy cập!
 *       500:
 *         description: Đã xảy ra lỗi khi xác thực phiên đăng nhập, vui lòng thử lại sau!
 */

const routes = new Router();
routes.post("/add", isAdmin, controller.createOptionController);
routes.get("/", controller.getAllOptionController);
routes.put("/update/:id", controller.updateOptionController);
routes.delete("/delete/:id", controller.deleteOptionController);
export default routes;
