import * as controller from "../controllers/discount-controller.js";
import { Router } from "express";
import { isAdmin } from "../middleware/auth-middleware.js";

/**
 * @swagger
 * tags:
 *   name: Discount
 *   description: API quản lý mã giảm giá
 */

/**
 * @swagger
 * /api/v1/discount/add:
 *   post:
 *     summary: Thêm một mã giảm giá
 *     tags: [Discount]
 *     security:
 *       - bearerAuth: []
 *     description: |
 *       - API chỉ dành cho Admin
 *       - Trường `code` sẽ được hệ thống tự động sinh ra
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               target_type:
 *                 type: string
 *                 enum: [all, category, product_variant, brand]
 *               discount_type:
 *                 type: string
 *                 enum: [percentage_Discount_code, fixed_amount_Discount_code, freeship]
 *               target_id:
 *                 type: integer
 *                 description: ID đối tượng áp dụng (nếu có)
 *               value:
 *                 type: number
 *                 format: float
 *               min_value:
 *                 type: integer
 *               max_discount_amount:
 *                 type: integer
 *               usage_limit:
 *                 type: integer
 *               expiry:
 *                 type: string
 *                 format: date
 *             example:
 *               target_type: product_variant
 *               discount_type: percentage_Discount_code
 *               target_id: 5
 *               value: 10.0
 *               min_value: 500000
 *               max_discount_amount: 100000
 *               usage_limit: 100
 *               expiry: 2025-12-31
 *     responses:
 *       201:
 *         description: Thêm mã khuyến mãi thành công!
 *       400:
 *         description: Mã giảm giá đã tồn tại!
 *       401:
 *        description: >
 *         - Phiên đăng nhập đã hết thời gian, vui lòng đăng nhập lại !
 *
 *         - Token xác thực không hợp lệ, vui lòng đăng nhập lại!
 *
 *         - Chưa đăng nhập: Vui lòng đăng nhập để tiếp tục.
 *
 *       403:
 *         description: Bạn không đủ quyền truy cập!
 *       500:
 *         description: Đã xảy ra lỗi khi xác thực phiên đăng nhập, vui lòng thử lại sau!
 */

/**
 * @swagger
 * /api/v1/discount/add/multi:
 *   post:
 *     summary: Thêm nhiều mã giảm giá cùng lúc
 *     tags: [Discount]
 *     security:
 *       - bearerAuth: []
 *     description: |
 *       - API chỉ dành cho Admin
 *       - Các mã `code` cũng sẽ được tự động tạo cho từng bản ghi
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: array
 *             items:
 *               type: object
 *               properties:
 *                 target_type:
 *                   type: string
 *                   enum: [all, category, product_variant, brand]
 *                 discount_type:
 *                   type: string
 *                   enum: [percentage_Discount_code, fixed_amount_Discount_code, freeship]
 *                 target_id:
 *                   type: integer
 *                 value:
 *                   type: number
 *                 min_value:
 *                   type: integer
 *                 max_discount_amount:
 *                   type: integer
 *                 usage_limit:
 *                   type: integer
 *                 expiry:
 *                   type: string
 *                   format: date
 *             example:
 *               - target_type: category
 *                 discount_type: fixed_amount_Discount_code
 *                 target_id: 2
 *                 value: 50000
 *                 min_value: 100000
 *                 max_discount_amount: 50000
 *                 usage_limit: 50
 *                 expiry: 2025-10-01
 *     responses:
 *       201:
 *         description: Thêm mã khuyến mãi thành công!
 *       400:
 *         description: Mã giảm giá không tồn tại! hoặc dữ liệu không hợp lệ
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
 * /api/v1/discount/:
 *   post:
 *     summary: Lấy danh sách mã giảm giá (dành cho Admin)
 *     tags: [Discount]
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
 *         description: Lấy danh sách mã giảm giá thành công!
 *       401:
 *        description: >
 *         - Phiên đăng nhập đã hết thời gian, vui lòng đăng nhập lại !
 *
 *         - Token xác thực không hợp lệ, vui lòng đăng nhập lại!
 *
 *         - Chưa đăng nhập: Vui lòng đăng nhập để tiếp tục.
 *
 *       403:
 *         description: Bạn không đủ quyền truy cập!
 *       500:
 *         description: Đã xảy ra lỗi khi xác thực phiên đăng nhập, vui lòng thử lại sau!
 */

/**
 * @swagger
 * /api/v1/discount/delete/{id}:
 *   post:
 *     summary: Thêm một mã giảm giá
 *     tags: [Discount]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID của mã giảm giá cần xóa
 *     responses:
 *       200:
 *         description: Xóa thành công!
 *       401:
 *        description: >
 *         - Phiên đăng nhập đã hết thời gian, vui lòng đăng nhập lại !
 *
 *         - Token xác thực không hợp lệ, vui lòng đăng nhập lại!
 *
 *         - Chưa đăng nhập: Vui lòng đăng nhập để tiếp tục.
 *
 *       403:
 *         description: Bạn không đủ quyền truy cập!
 *       500:
 *         description: Đã xảy ra lỗi khi xác thực phiên đăng nhập, vui lòng thử lại sau!
 */
const routes = new Router();

routes.post("/add", isAdmin, controller.createDiscountController);
routes.post("/add/multi", isAdmin, controller.createMultiDiscountController);
routes.get("/", isAdmin, controller.getAllDiscountController);
routes.delete("/delete/:id", isAdmin, controller.deleteDiscountController);
export default routes;
