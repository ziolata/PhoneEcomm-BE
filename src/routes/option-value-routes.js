import * as controller from "../controllers/option-value-Controller.js";
import { Router } from "express";
import { isAuthenticated } from "../middleware/auth-middleware.js";

/**
 * @swagger
 * tags:
 *   name: Option Value
 *   description: Quản lý giá trị các tuỳ chọn sản phẩm
 */

/**
 * @swagger
 * /api/v1/option-value:
 *   get:
 *     summary: Lấy danh sách tất cả option value
 *     tags: [Option Value]
 *     responses:
 *       200:
 *         description: Lấy danh sách thành công
 */

/**
 * @swagger
 * /api/v1/option-value/add:
 *   post:
 *     summary: Thêm mới giá trị cho option
 *     tags: [Option Value]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               option_id:
 *                 type: integer
 *               value:
 *                 type: string
 *             example:
 *               option_id: 1
 *               value: Đỏ
 *     responses:
 *       200:
 *         description: Thêm giá trị thành công
 *       400:
 *         description: Giá trị đã tồn tại hoặc dữ liệu không hợp lệ
 *       401:
 *         description: Chưa đăng nhập
 */

/**
 * @swagger
 * /api/v1/option-value/{id}:
 *   get:
 *     summary: Lấy thông tin giá trí
 *     tags: [Option Value]
 *     responses:
 *       200:
 *         description: Lấy thông tin giá trị thành công!
 */

/**
 * @swagger
 * /api/v1/option-value/update/{id}:
 *   put:
 *     summary: Cập nhật giá trị cho giá trị
 *     tags: [Option Value]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: query
 *         description: ID giá trị cần cập nhật
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
 *               option_id:
 *                 type: integer
 *               value:
 *                 type: string
 *             example:
 *               option_id: 1
 *               value: Đỏ
 *     responses:
 *       200:
 *         description: Cập nhật thành công!
 */

/**
 * @swagger
 * /api/v1/option-value/delete/{id}:
 *   delete:
 *     summary: Xóa option value
 *     tags: [Option Value]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: query
 *         description: ID giá trị cần xóa
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Xóa thành công!
 */
const routes = new Router();

routes.post("/add", isAuthenticated, controller.createOptionValueController);
routes.get("/", controller.getAllOptionValueController);
routes.get("/:id", controller.getOneOptionValueController);
routes.put("/update/:id", controller.updateOptionValueController);
routes.delete("/delete/:id", controller.deleteOptionValueController);
export default routes;
