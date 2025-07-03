import * as controller from "../controllers/shipping-controller.js";
import { Router } from "express";
import { isAdmin, isAuthenticated } from "../middleware/auth-middleware.js";

/**
 * @swagger
 * tags:
 *   name: Shipping
 *   description: API quản lý thông tin nhận hàng
 */

/**
 * @swagger
 * /api/v1/shipping/:
 *   post:
 *     summary: Lấy tất cả thông tin Shipping (chỉ cho Admin)
 *     tags: [Shipping]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lấy danh sách địa chỉ nhận hàng thành công!
 *       404:
 *         description: Đơn hàng không tồn tại
 */

/**
 * @swagger
 * /api/v1/shipping/{order_id}:
 *   post:
 *     summary: Lấy thông tin giao hàng theo order_id
 *     tags: [Shipping]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: order_id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Lấy địa chỉ nhận hàng thành công
 *       404:
 *         description: Đơn hàng không tồn tại
 */

/**
 * @swagger
 * /api/v1/shipping/update/{id}:
 *   put:
 *     summary: Cập nhật thông tin giao hàng
 *     tags: [Shipping]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Shipping'
 *     responses:
 *       200:
 *         description: Cập nhật thành công
 *       404:
 *         description: Địa chỉ nhận hàng không tồn tại
 */

/**
 * @swagger
 * /api/v1/shipping/delete/{id}:
 *   delete:
 *     summary: Xóa thông tin giao hàng
 *     tags: [Shipping]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Xóa thành công
 *       404:
 *         description: Địa chỉ nhận hàng không tồn tại
 */

const routes = new Router();
routes.get("/", isAdmin, controller.getAllShippingController);
routes.get(
	"/:order_id",
	isAuthenticated,
	controller.getShippingByOrderIdController,
);
routes.get("/update/:id", isAdmin, controller.updateShippingController);
routes.delete("/delete/:id", isAdmin, controller.deleteShippingController);
export default routes;
