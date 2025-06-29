import * as controller from "../controllers/product-controller.js";
import { Router } from "express";
import { isAdmin } from "../middleware/auth-middleware.js";

/**
 * @swagger
 * tags:
 *   name: Product
 *   description: Quản lý sản phẩm
 */

/**
 * @swagger
 * /api/v1/product:
 *   get:
 *     summary: Lấy danh sách tất cả sản phẩm
 *     tags: [Product]
 *     responses:
 *       200:
 *         description: Lấy danh sách sản phẩm thành công
 */

/**
 * @swagger
 * /api/v1/product/{id}:
 *   get:
 *     summary: Lấy chi tiết sản phẩm theo ID
 *     tags: [Product]
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID sản phẩm cần lấy
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Lấy thông tin sản phẩm thành công
 *       404:
 *         description: Sản phẩm không tồn tại
 */

/**
 * @swagger
 * /api/v1/product/add:
 *   post:
 *     summary: Thêm sản phẩm mới
 *     tags: [Product]
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
 *               img:
 *                 type: string
 *               description:
 *                 type: string
 *               features:
 *                 type: string
 *                 enum: [hot, discount, over]
 *               category_id:
 *                 type: integer
 *               brand_id:
 *                 type: integer
 *             example:
 *               name: Áo thun nam
 *               img: url-hinh-anh
 *               description: Mô tả sản phẩm
 *               features: hot
 *               category_id: 1
 *               brand_id: 1
 *     responses:
 *       200:
 *         description: Thêm sản phẩm thành công
 *       400:
 *         description: Dữ liệu không hợp lệ hoặc tên sản phẩm đã tồn tại
 *       401:
 *         description: Chưa đăng nhập
 */

/**
 * @swagger
 * /api/v1/product/update/{id}:
 *   put:
 *     summary: Cập nhật thông tin sản phẩm
 *     tags: [Product]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID sản phẩm cần cập nhật
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
 *               name:
 *                 type: string
 *               img:
 *                 type: string
 *               description:
 *                 type: string
 *               features:
 *                 type: string
 *                 enum: [hot, discount, over]
 *               category_id:
 *                 type: integer
 *               brand_id:
 *                 type: integer
 *             example:
 *               name: Áo thun nam
 *               img: url-hinh-anh
 *               description: Mô tả sản phẩm cập nhật
 *               features: discount
 *               category_id: 1
 *               brand_id: 2
 *     responses:
 *       200:
 *         description: Cập nhật sản phẩm thành công
 *       400:
 *         description: Dữ liệu không hợp lệ hoặc tên sản phẩm đã tồn tại
 *       401:
 *         description: Chưa đăng nhập
 *       404:
 *         description: Sản phẩm không tồn tại
 */

/**
 * @swagger
 * /api/v1/product/delete/{id}:
 *   delete:
 *     summary: Xoá người dùng (chỉ dành cho admin)
 *     tags: [Product]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID sản phẩm cần xóa
 *     responses:
 *       200:
 *         description: Xoá thành công!
 *       403:
 *         description: Không có quyền!
 *
 */

const routes = new Router();

routes.get("/", controller.getAllProductController);
routes.get("/:id", controller.getOneProductController);
routes.post("/add", isAdmin, controller.createProductController);
routes.put("/update/:id", isAdmin, controller.updateProductController);
routes.put("/delete/:id", isAdmin, controller.deleteProductController);

export default routes;
