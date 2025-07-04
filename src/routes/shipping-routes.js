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
 * /api/v1/shipping:
 *   get:
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
 *   get:
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

const routes = new Router();
routes.get("/", isAdmin, controller.getAllShippingController);
routes.get(
	"/:order_id",
	isAuthenticated,
	controller.getShippingByOrderIdController,
);
routes.put("/update/:id", isAdmin, controller.updateShippingController);
routes.delete("/delete/:id", isAdmin, controller.deleteShippingController);
export default routes;
