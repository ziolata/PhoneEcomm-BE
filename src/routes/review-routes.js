import * as controller from "../controllers/review-controller.js";
import { Router } from "express";
import { isAuthenticated } from "../middleware/auth-middleware.js";

/**
 * @swagger
 * tags:
 *   name: Review
 *   description: Quản lý đánh giá sản phẩm
 */

/**
 * @swagger
 * /api/v1/review/add:
 *   post:
 *     summary: Thêm đánh giá cho sản phẩm
 *     tags: [Review]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               product_variant_id:
 *                 type: integer
 *                 example: 1
 *               rating:
 *                 type: number
 *                 format: decimal
 *                 example: 4.5
 *               review:
 *                 type: string
 *                 example: "Sản phẩm rất tốt!"
 *
 *     responses:
 *       201:
 *         description: Đánh giá sản phẩm thành công!
 *       400:
 *         description: Bạn chưa mua sản phẩm này không thể đánh giá! hoặc Sản phẩm này bạn đã đánh giá!
 *       401:
 *         description: >
 *           - Phiên đăng nhập đã hết thời gian, vui lòng đăng nhập lại !
 *
 *           - Token xác thực không hợp lệ, vui lòng đăng nhập lại!
 *
 *           - Chưa đăng nhập: Vui lòng đăng nhập để tiếp tục.
 *       500:
 *         description: Đã xảy ra lỗi khi xác thực phiên đăng nhập, vui lòng thử lại sau!
 */

/**
 * @swagger
 * /api/v1/review:
 *   get:
 *     summary: Lấy danh sách đánh giá của sản phẩm theo id của biến thể sản phẩm
 *     tags: [Review]
 *     parameters:
 *       - name: variant
 *         in: query
 *         description: ID biến thể sản phẩm cần lấy đánh giá
 *         required: true
 *         schema:
 *           type: integer
 *           example: 41
 *       - name: page
 *         in: query
 *         description: số trang (không truyền mặc định = 1)
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Lấy danh sách đánh giá thành công!
 */

/**
 * @swagger
 * /api/v1/review/{id}:
 *   get:
 *     summary: Lấy danh sách đánh giá của sản phẩm
 *     tags: [Review]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: query
 *         description: ID đánh giá cần xem
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Lấy thông tin đánh giá thành công
 *       401:
 *        description: >
 *         - Phiên đăng nhập đã hết thời gian, vui lòng đăng nhập lại !
 *
 *         - Token xác thực không hợp lệ, vui lòng đăng nhập lại!
 *
 *         - Chưa đăng nhập: Vui lòng đăng nhập để tiếp tục.
 *       404:
 *         description: Không tìm thấy đánh giá!
 *       500:
 *         description: Đã xảy ra lỗi khi xác thực phiên đăng nhập, vui lòng thử lại sau!
 */

/**
 * @swagger
 * /api/v1/review/update/{id}:
 *   put:
 *     summary: Cập nhật đánh giá của sản phẩm
 *     tags: [Review]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: query
 *         description: ID đánh giá cần cập nhật
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Cập nhật thành công!
 *       401:
 *        description: >
 *         - Phiên đăng nhập đã hết thời gian, vui lòng đăng nhập lại !
 *
 *         - Token xác thực không hợp lệ, vui lòng đăng nhập lại!
 *
 *         - Chưa đăng nhập: Vui lòng đăng nhập để tiếp tục.
 *       404:
 *         description: Không tìm thấy đánh giá!
 *       500:
 *         description: Đã xảy ra lỗi khi xác thực phiên đăng nhập, vui lòng thử lại sau!
 */

/**
 * @swagger
 * /api/v1/review/delete/{id}:
 *   delete:
 *     summary: Xóa đánh giá của sản phẩm
 *     tags: [Review]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: query
 *         description: ID đánh giá cần xóa
 *         required: true
 *         schema:
 *           type: integer
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
 *       404:
 *         description: Không tìm thấy đánh giá!
 *       500:
 *         description: Đã xảy ra lỗi khi xác thực phiên đăng nhập, vui lòng thử lại sau!
 */

const routes = new Router();
routes.post("/add/", isAuthenticated, controller.createReviewController);
routes.get("/", controller.getAllReviewController);
routes.get("/:id", isAuthenticated, controller.getOneReviewController);
routes.put("/update/:id", isAuthenticated, controller.updateReviewController);
routes.delete(
	"/delete/:id",
	isAuthenticated,
	controller.deleteReviewController,
);
export default routes;
