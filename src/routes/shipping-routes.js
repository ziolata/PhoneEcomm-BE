import * as controller from "../controllers/shipping-controller.js";
import { Router } from "express";
import { isAuthenticated } from "../middleware/auth-middleware.js";

/**
 * @swagger
 * tags:
 *   name: Shipping
 *   description: API quản lý thông tin nhận hàng
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Shipping:
 *       type: object
 *       required:
 *         - order_id
 *         - type
 *         - status
 *         - Shipfee
 *       properties:
 *         order_id:
 *           type: integer
 *         type:
 *           type: string
 *           enum: [Post office, Express delivery]
 *         status:
 *           type: string
 *           enum: [pending, shipped, completed]
 *         Shipfee:
 *           type: number
 *           format: float
 *       example:
 *         order_id: 101
 *         type: Express delivery
 *         status: pending
 *         Shipfee: 25000.5
 */

/**
 * @swagger
 * /api/shipping/:
 *   post:
 *     summary: Lấy thông tin giao hàng theo order_id
 *     tags: [Shipping]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - order_id
 *             properties:
 *               order_id:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Lấy địa chỉ nhận hàng thành công
 *       404:
 *         description: Đơn hàng không tồn tại
 */

/**
 * @swagger
 * /api/shipping/update/{id}:
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
 * /api/shipping/delete/{id}:
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
routes.post("/", isAuthenticated, controller.getShippingController);
routes.get("/update/:id", isAdmin, controller.updateShippingController);
routes.delete("/delete/:id", isAdmin, controller.deleteShippingController);
export default routes;
