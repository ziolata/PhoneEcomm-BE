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
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               product_variant_id:
 *                 type: integer
 *               img:
 *                 type: string
 *               rating:
 *                 type: number
 *                 format: decimal
 *               review:
 *                 type: string
 *             example:
 *               product_variant_id: 1
 *               img: "url-hinh-anh"
 *               rating: 4.5
 *               review: "Sản phẩm rất tốt!"
 *     responses:
 *       200:
 *         description: Đánh giá sản phẩm thành công
 *       400:
 *         description: Chưa mua sản phẩm hoặc đã đánh giá rồi
 *       401:
 *         description: Chưa đăng nhập
 */

/**
 * @swagger
 * /api/v1/review:
 *   get:
 *     summary: Lấy danh sách đánh giá của sản phẩm
 *     tags: [Review]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: product_variant_id
 *         in: query
 *         description: ID biến thể sản phẩm cần lấy đánh giá
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Lấy danh sách đánh giá thành công
 *       401:
 *         description: Chưa đăng nhập
 */

const routes = new Router();
routes.post("/add/", isAuthenticated, controller.createReviewController);
routes.get("/", isAuthenticated, controller.getAllReviewController);
export default routes;
