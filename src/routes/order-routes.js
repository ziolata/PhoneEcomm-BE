import * as controller from "../controllers/order-controller.js";
import { Router } from "express";
import { isAuthenticated } from "../middleware/auth-middleware.js";

/**
 * @swagger
 * tags:
 *   name: Order
 *   description: Quản lý đơn đặt hàng
 */

/**
 * @swagger
 * /api/v1/order:
 *   get:
 *     summary: Lấy danh sách đơn hàng của người dùng
 *     tags: [Order]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lấy danh sách đơn hàng thành công
 *       401:
 *         description: Chưa đăng nhập
 */

/**
 * @swagger
 * /api/v1/order/add:
 *   post:
 *     summary: Tạo đơn hàng mới từ giỏ hàng
 *     tags: [Order]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               discount_code:
 *                 type: string
 *             example:
 *               discount_code: GIAM10
 *     responses:
 *       200:
 *         description: Đặt hàng thành công
 *       400:
 *         description: Dữ liệu không hợp lệ hoặc giỏ hàng rỗng
 *       401:
 *         description: Chưa đăng nhập
 */

/**
 * @swagger
 * /api/v1/order/update/{id}:
 *   put:
 *     summary: Cập nhật trạng thái đơn hàng (Chức năng cho Admin hoặc xử lý nội bộ)
 *     tags: [Order]
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID đơn hàng cần cập nhật
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               status:
 *                 type: string
 *                 enum: [pending, paid, shipping, canceled, completed]
 *             example:
 *               status: shipping
 *     responses:
 *       200:
 *         description: Cập nhật trạng thái thành công
 *       400:
 *         description: Trạng thái không hợp lệ hoặc kho hết hàng
 *       404:
 *         description: Đơn hàng không tồn tại
 */

const routes = new Router();

routes.get("/", isAuthenticated, controller.getAllOrderController);
routes.post("/add", isAuthenticated, controller.createOrderController);
routes.put("/update/:id", controller.updateOrderController);

export default routes;
