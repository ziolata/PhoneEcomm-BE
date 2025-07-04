import * as controller from "../controllers/cart-controller.js";
import { Router } from "express";
import { isAuthenticated } from "../middleware/auth-middleware.js";

/**
 * @swagger
 * tags:
 *   name: Cart
 *   description: API quản lý giỏ hàng
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     CartItem:
 *       type: object
 *       properties:
 *         product_variant_id:
 *           type: integer
 *         quantity:
 *           type: integer
 *         price:
 *           type: number
 *           format: float
 *       example:
 *         product_variant_id: 1
 *         quantity: 2
 *         price: 5000000
 */

/**
 * @swagger
 * /api/v1/cart:
 *   get:
 *     summary: Lấy danh sách giỏ hàng của người dùng
 *     tags: [Cart]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lấy danh sách giỏ hàng thành công
 *       401:
 *         description: Chưa đăng nhập
 */

/**
 * @swagger
 * /api/v1/cart/add:
 *   post:
 *     summary: Thêm sản phẩm vào giỏ hàng
 *     tags: [Cart]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               user_id:
 *                 type: integer
 *               product_variant_id:
 *                 type: integer
 *               quantity:
 *                 type: integer
 *             example:
 *               user_id: 1
 *               product_variant_id: 2
 *               quantity: 1
 *     responses:
 *       200:
 *         description: Thêm sản phẩm vào giỏ hàng thành công
 *       400:
 *         description: Sản phẩm đã hết hàng hoặc dữ liệu không hợp lệ
 *       401:
 *         description: Chưa đăng nhập
 */

/**
 * @swagger
 * /api/v1/cart/update:
 *   put:
 *     summary: Cập nhật số lượng sản phẩm trong giỏ hàng (tăng số lượng)
 *     tags: [Cart]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: integer
 *               user_id:
 *                 type: integer
 *             example:
 *               id: 1
 *               user_id: 1
 *     responses:
 *       200:
 *         description: Cập nhật số lượng thành công
 *       400:
 *         description: Hàng đã hết hoặc không có quyền cập nhật
 *       401:
 *         description: Chưa đăng nhập
 */

/**
 * @swagger
 * /api/v1/cart/delete/{id}:
 *   delete:
 *     summary: Xóa sản phẩm khỏi giỏ hàng
 *     tags: [Cart]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID của cart_item cần xóa
 *     responses:
 *       200:
 *         description: Xóa sản phẩm khỏi giỏ hàng thành công
 *       404:
 *         description: Sản phẩm không tồn tại
 *       401:
 *         description: Chưa đăng nhập
 */

const routes = new Router();
routes.get("/", isAuthenticated, controller.getAllCartController);
routes.post("/add", isAuthenticated, controller.createCartController);
routes.put("/update/:id", isAuthenticated, controller.updateCartController);
routes.delete("/delete/:id", isAuthenticated, controller.deleteCartController);
export default routes;
