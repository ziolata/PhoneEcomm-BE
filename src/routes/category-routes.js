import * as controller from "../controllers/category-controller.js";
import { Router } from "express";
import { isAdmin } from "../middleware/auth-middleware.js";

/**
 * @swagger
 * tags:
 *   name: Category
 *   description: API quản lý danh mục sản phẩm
 */

/**
 * @swagger
 * /api/v1/category/add:
 *   post:
 *     summary: Thêm mới danh mục sản phẩm
 *     tags: [Category]
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
 *                 example: Xiaomi
 *               img:
 *                 type: string
 *                 format: binary
 *               description:
 *                 type: string
 *                 example: Thương hiệu xiaomi
 *             example:
 *               name: Điện thoại
 *               img: https://example.com/image.jpg
 *               description: Các dòng điện thoại mới nhất
 *     responses:
 *       200:
 *         description: Thêm danh mục thành công
 *       400:
 *         description: Danh mục đã tồn tại hoặc dữ liệu không hợp lệ
 *       401:
 *         description: Chưa đăng nhập hoặc không có quyền
 */

/**
 * @swagger
 * /api/v1/category/update/{id}:
 *   put:
 *     summary: Cập nhật danh mục sản phẩm
 *     tags: [Category]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID của danh mục cần cập nhật
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
 *               name: Điện thoại mới
 *               img: https://example.com/new-image.jpg
 *               description: Danh mục điện thoại cao cấp
 *     responses:
 *       200:
 *         description: Cập nhật danh mục thành công
 *       400:
 *         description: Danh mục đã tồn tại hoặc dữ liệu không hợp lệ
 *       401:
 *         description: Chưa đăng nhập hoặc không có quyền
 *       404:
 *         description: Không tìm thấy danh mục
 */

/**
 * @swagger
 * /api/v1/category/delete/{id}:
 *   delete:
 *     summary: Xóa danh mục sản phẩm
 *     tags: [Category]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID của danh mục cần xóa
 *     responses:
 *       200:
 *         description: Xóa danh mục thành công
 *       401:
 *         description: Chưa đăng nhập hoặc không có quyền
 *       404:
 *         description: Không tìm thấy danh mục
 */

/**
 * @swagger
 * /api/v1/category:
 *   get:
 *     summary: Lấy danh sách tất cả danh mục sản phẩm
 *     tags: [Category]
 *     responses:
 *       200:
 *         description: Lấy danh sách danh mục thành công
 */

/**
 * @swagger
 * /api/v1/category/{id}:
 *   get:
 *     summary: Lấy thông tin chi tiết của danh mục theo ID
 *     tags: [Category]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID của danh mục cần lấy
 *     responses:
 *       200:
 *         description: Lấy thông tin danh mục thành công
 *       404:
 *         description: Không tìm thấy danh mục
 */

const routes = new Router();

routes.get("/", controller.getAllCategoryController);
routes.get("/:id", controller.getOneCategoryController);
routes.post("/add", isAdmin, controller.createCategoryController);
routes.put("/update/:id", isAdmin, controller.updateCategoryController);
routes.delete("/delete/:id", isAdmin, controller.deleteCategoryController);

export default routes;
