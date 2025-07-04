import * as controller from "../controllers/brand-controller.js";
import { Router } from "express";
import { isAdmin } from "../middleware/auth-middleware.js";

/**
 * @swagger
 * tags:
 *   name: Brand
 *   description: API quản lý thương hiệu sản phẩm
 */

/**
 * @swagger
 * /api/v1/brand/add:
 *   post:
 *     summary: Thêm mới thương hiệu sản phẩm
 *     tags: [Brand]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *          multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               img:
 *                 type: string
 *                 format: binary
 *               description:
 *                 type: string
 *             example:
 *               name: Sam Sung
 *               img: https://example.com/image.jpg
 *               description: Thương hiệu Sam Sung
 *     responses:
 *       200:
 *         description: Thêm thành công!
 *       400:
 *         description: Thương hiệu đã tồn tại hoặc dữ liệu không hợp lệ
 *       401:
 *         description: Chưa đăng nhập hoặc không có quyền
 */

/**
 * @swagger
 * /api/v1/brand/update/{id}:
 *   put:
 *     summary: Cập nhật thương hiệu sản phẩm
 *     tags: [Brand]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID của thương hiệu cần cập nhật
 *     requestBody:
 *       required: true
 *       content:
 *          multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: Xiaomi
 *               img:
 *                 type: string
 *                 format: binary
 *               description:
 *                 type: string
 *                 example: Thương hiệu xiaomi
 *             example:
 *               name: Xiaomi
 *               description: Thương hiệu xiaomi
 *     responses:
 *       200:
 *         description: Cập nhật thành công!
 *       400:
 *         description: Danh mục đã tồn tại hoặc dữ liệu không hợp lệ
 *       401:
 *         description: Chưa đăng nhập hoặc không có quyền
 *       404:
 *         description: Không tìm thấy thương hiệu!
 */

/**
 * @swagger
 * /api/v1/brand/delete/{id}:
 *   delete:
 *     summary: Xóa thương hiệu sản phẩm
 *     tags: [Brand]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID của thương hiệu cần xóa
 *     responses:
 *       200:
 *         description: Xóa thành công!
 *       401:
 *         description: Chưa đăng nhập hoặc không có quyền
 *       404:
 *         description: Không tìm thấy thương hiệu!
 */

/**
 * @swagger
 * /api/v1/category:
 *   get:
 *     summary: Lấy danh sách tất cả thương hiệu sản phẩm
 *     tags: [Category]
 *     responses:
 *       200:
 *         description: Lấy danh sách thương hiệu thành công!
 */

/**
 * @swagger
 * /api/v1/brand/{id}:
 *   get:
 *     summary: Lấy thông tin chi tiết của thương hiệu theo ID
 *     tags: [Brand]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID của thương hiệu cần lấy
 *     responses:
 *       200:
 *         description: Lấy thông tin thương hiệu thành công!
 *       404:
 *         description: Không tìm thấy thương hiệu!
 */

const routes = new Router();

routes.get("/", controller.getAllBrandController);
routes.get("/:id", controller.getOneBrandController);
routes.post("/add", isAdmin, controller.createBrandController);
routes.put("/update/:id", isAdmin, controller.updateBrandController);
routes.delete("/delete/:id", isAdmin, controller.deleteBrandController);

export default routes;
