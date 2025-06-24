import * as controller from "../controllers/product-variant-controller.js";
import { Router } from "express";
import { isAdmin } from "../middleware/auth-middleware.js";

/**
 * @swagger
 * tags:
 *   name: Product Variant
 *   description: Quản lý biến thể sản phẩm
 */

/**
 * @swagger
 * /api/v1/product-variant:
 *   get:
 *     summary: Lấy danh sách tất cả biến thể sản phẩm
 *     tags: [Product Variant]
 *     responses:
 *       200:
 *         description: Lấy danh sách biến thể sản phẩm thành công
 */

/**
 * @swagger
 * /api/v1/product-variant/{id}:
 *   get:
 *     summary: Lấy chi tiết biến thể sản phẩm theo ID
 *     tags: [Product Variant]
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID biến thể sản phẩm cần lấy
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Lấy thông tin biến thể sản phẩm thành công
 *       404:
 *         description: Biến thể sản phẩm không tồn tại
 */

/**
 * @swagger
 * /api/v1/product-variant/add:
 *   post:
 *     summary: Thêm mới biến thể sản phẩm
 *     tags: [Product Variant]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               product_id:
 *                 type: integer
 *               img:
 *                 type: string
 *               sku:
 *                 type: string
 *               price:
 *                 type: number
 *                 format: decimal
 *               Option_value:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *             example:
 *               product_id: 1
 *               img: "url-hinh-anh"
 *               sku: "SKU001"
 *               price: 100000
 *               Option_value:
 *                 - id: 1
 *                 - id: 2
 *     responses:
 *       200:
 *         description: Thêm biến thể sản phẩm thành công
 *       400:
 *         description: Dữ liệu không hợp lệ hoặc sản phẩm không tồn tại
 *       401:
 *         description: Chưa đăng nhập
 */

/**
 * @swagger
 * /api/v1/product-variant/update/{id}:
 *   put:
 *     summary: Cập nhật thông tin biến thể sản phẩm
 *     tags: [Product Variant]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID biến thể sản phẩm cần cập nhật
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
 *               product_id:
 *                 type: integer
 *               img:
 *                 type: string
 *               sku:
 *                 type: string
 *               price:
 *                 type: number
 *                 format: decimal
 *             example:
 *               product_id: 1
 *               img: "url-hinh-anh-moi"
 *               sku: "SKU002"
 *               price: 120000
 *     responses:
 *       200:
 *         description: Cập nhật biến thể sản phẩm thành công
 *       400:
 *         description: Dữ liệu không hợp lệ hoặc sản phẩm không tồn tại
 *       401:
 *         description: Chưa đăng nhập
 *       404:
 *         description: Biến thể sản phẩm không tồn tại
 */

/**
 * @swagger
 * /api/v1/product-variant/delete/{id}:
 *   delete:
 *     summary: Xóa biến thể sản phẩm
 *     tags: [Product Variant]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID biến thể sản phẩm cần xóa
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Xóa biến thể sản phẩm thành công
 *       401:
 *         description: Chưa đăng nhập
 *       404:
 *         description: Biến thể sản phẩm không tồn tại
 */

const routes = new Router();

routes.post("/add", isAdmin, controller.createProductVariantController);
routes.get("/", controller.getAllProductVariantController);
routes.get("/:id", controller.getOneProductVariantController);
routes.put("/update/:id", isAdmin, controller.updateProductVariantController);
routes.delete(
	"/delete/:id",
	isAdmin,
	controller.deleteProductVariantController,
);
export default routes;
