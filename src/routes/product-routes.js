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
 *     parameters:
 *       - name: page
 *         in: path
 *         description: số trang (không nhập mặc định sẽ = 1)
 *         schema:
 *           type: integer
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
 *         description: Không tìm thấy sản phẩm!
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
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: iPhone 16 Promax
 *               img:
 *                 type: string
 *                 format: binary
 *               description:
 *                 type: string
 *                 example: Mẫu điện thoại Apple mới nhất
 *               features:
 *                 type: string
 *                 enum: [hot, discount, over]
 *               category_id:
 *                 type: integer
 *               brand_id:
 *                 type: integer
 *
 *     responses:
 *       201:
 *         description: Thêm thành công!
 *       400:
 *         description: Dữ liệu không hợp lệ hoặc Tên sản phẩm đã tồn tại!
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
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: iPhone 16 Promax
 *               img:
 *                 type: string
 *                 format: binary
 *               description:
 *                 type: string
 *                 example: Mẫu điện thoại Apple mới nhất
 *               features:
 *                 type: string
 *                 enum: [hot, discount, over]
 *               category_id:
 *                 type: integer
 *               brand_id:
 *                 type: integer
 *
 *     responses:
 *       200:
 *         description: Cập nhật sản phẩm thành công
 *       400:
 *         description: Dữ liệu không hợp lệ hoặc Tên sản phẩm đã tồn tại!
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
 *       404:
 *         description: Không tìm thấy sản phẩm!
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
 *       404:
 *         description: Không tìm thấy sản phẩm!
 */

const routes = new Router();

routes.get("/", controller.getAllProductController);
routes.get("/:id", controller.getOneProductController);
routes.post("/add", isAdmin, controller.createProductController);
routes.put("/update/:id", isAdmin, controller.updateProductController);
routes.delete("/delete/:id", isAdmin, controller.deleteProductController);

export default routes;
