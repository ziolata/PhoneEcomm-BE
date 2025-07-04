import * as controller from "../controllers/inventory-controller.js";
import { Router } from "express";
import { isAdmin } from "../middleware/auth-middleware.js";

/**
 * @swagger
 * tags:
 *   name: Inventory
 *   description: Quản lý kho hàng
 */

/**
 * @swagger
 * /api/v1/inventory:
 *   get:
 *     summary: Lấy danh sách tất cả kho hàng
 *     tags: [Inventory]
 *     responses:
 *       200:
 *         description: Lấy danh sách kho thành công!
 */

/**
 * @swagger
 * /api/v1/inventory/{id}:
 *   get:
 *     summary: Lấy chi tiết kho hàng theo ID
 *     tags: [Inventory]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID kho hàng
 *     responses:
 *       200:
 *         description: lấy thông tin kho thành công!
 *       404:
 *         description: Không tìm thấy kho!
 */

/**
 * @swagger
 * /api/v1/inventory/variant/{product_variant_id}:
 *   get:
 *     summary: Lấy kho hàng theo biến thể sản phẩm
 *     tags: [Inventory]
 *     parameters:
 *       - in: path
 *         name: product_variant_id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID biến thể sản phẩm
 *     responses:
 *       200:
 *         description: Lấy thông tin kho của biến thể sản phẩm!
 *       404:
 *         description: Không tìm thấy kho!
 */

/**
 * @swagger
 * /api/v1/inventory/add:
 *   post:
 *     summary: Thêm kho hàng mới
 *     tags: [Inventory]
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
 *               quantity:
 *                 type: integer
 *               location:
 *                 type: string
 *               product_variant_id:
 *                 type: integer
 *             example:
 *               name: Kho miền Bắc
 *               quantity: 200
 *               location: Hà Nội
 *               product_variant_id: 3
 *     responses:
 *       201:
 *         description: Thêm kho thành công!
 *       400:
 *         description: Tên kho đã tồn tại!
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
 * /api/v1/inventory/update/{id}:
 *   put:
 *     summary: Cập nhật kho hàng
 *     tags: [Inventory]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID kho hàng cần cập nhật
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               quantity:
 *                 type: integer
 *               location:
 *                 type: string
 *             example:
 *               name: Kho miền Trung
 *               quantity: 100
 *               location: Đà Nẵng
 *     responses:
 *       200:
 *         description: Cập nhật thành công!
 *       404:
 *         description: Không tìm thấy kho!
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
 * /api/v1/inventory/delete/{id}:
 *   delete:
 *     summary: Xóa kho hàng
 *     tags: [Inventory]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID kho cần xóa
 *     responses:
 *       200:
 *         description: Xóa thành công!
 *       404:
 *         description: Không tìm thấy kho!
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

routes.get("/", controller.getAllInventoryController);
routes.get("/:id", controller.getOneInventoryController);
routes.get(
	"/variant/:product_variant_id",
	controller.getInventoryByVariantIdController,
);
routes.post("/add", isAdmin, controller.createInventoryController);
routes.put("/update/:id", isAdmin, controller.updateInventoryController);
routes.delete("/delete/:id", isAdmin, controller.deleteInventoryController);

export default routes;
