import * as controller from "../controllers/order-controller.js";
import { Router } from "express";
import { isAdmin, isAuthenticated } from "../middleware/auth-middleware.js";

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
 *     summary: Lấy danh sách đơn hàng (dành cho Admin)
 *     tags: [Order]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: page
 *         in: path
 *         description: số trang (không nhập mặc định sẽ = 1)
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Lấy danh sách đơn hàng thành công
 *       401:
 *         description: Chưa đăng nhập
 */

/**
 * @swagger
 * /api/v1/order/me:
 *   get:
 *     summary: Lấy danh sách đơn hàng của người dùng
 *     tags: [Order]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: page
 *         in: path
 *         description: số trang (không nhập mặc định sẽ = 1)
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Lấy danh sách đơn hàng thành công
 *       401:
 *         description: Chưa đăng nhập
 */

/**
 * @swagger
 * /api/v1/order/{id}:
 *   get:
 *     summary: Lấy danh sách đơn hàng của người dùng (người dùng chỉ có thể xem đơn hàng của bản thân)
 *     tags: [Order]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID đơn hàng cần lấy thông tin
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Lấy thông tin đơn hàng thành công!
 *       403:
 *         description: Bạn không có quyền coi đơn hàng của tài khoản khác!
 *       404:
 *         description: Không tìm thấy đơn hàng!
 *
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
 *               discount_code: cxibkml7KIdwtBFJalSTCJF5GEReeyvi
 *               "shipping":
 *                  "address_id": 1,
 *                  "type": "Post office"
 *
 *     responses:
 *       201:
 *         description: Đặt hàng thành công!
 *       400:
 *         description: Dữ liệu không hợp lệ hoặc giỏ hàng rỗng
 *       401:
 *         description: Chưa đăng nhập
 */

/**
 * @swagger
 * /api/v1/order/update/{id}:
 *   put:
 *     summary: Cập nhật trạng thái đơn hàng (Chức năng cho Admin)
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

/**
 * @swagger
 * /api/v1/order/delete/{id}:
 *   delete:
 *     summary: Xóa đơn hàng (chức năng cho Admin)
 *     tags: [Order]
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID đơn hàng cần cập nhật
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Xóa thành công!
 *       400:
 *         description: Trạng thái không hợp lệ hoặc kho hết hàng
 *       404:
 *         description: Đơn hàng không tồn tại
 */

const routes = new Router();

routes.get("/", isAdmin, controller.getAllOrderController);
routes.get("/me", isAuthenticated, controller.getOrderByUserController);
routes.get("/:id", isAuthenticated, controller.getOneOrderController);
routes.post("/add", isAuthenticated, controller.createOrderController);
routes.put("/update/:id", controller.updateOrderController);
routes.delete("/delete/:id", controller.deleteOrderController);
export default routes;
