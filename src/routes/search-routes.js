import * as controller from "../controllers/elasticsearch-controller.js";
import { Router } from "express";
import { isAdmin } from "../middleware/auth-middleware.js";

/**
 * @swagger
 * tags:
 *   name: Search
 *   description: Tìm kiếm và đồng bộ dữ liệu sản phẩm với ElasticSearch
 */

/**
 * @swagger
 * /api/v1/search:
 *   get:
 *     summary: Tìm kiếm sản phẩm qua Search
 *     tags: [Search]
 *     parameters:
 *       - in: query
 *         name: query
 *         schema:
 *           type: string
 *         required: true
 *         description: Từ khóa tìm kiếm (theo tên hoặc SKU)
 *     responses:
 *       200:
 *         description: Kết quả tìm kiếm thành công
 *       404:
 *         description: Không tìm thấy kết quả
 */

/**
 * @swagger
 * /api/v1/search/sync_data:
 *   get:
 *     summary: Đồng bộ dữ liệu product_variant lên ElasticSearch
 *     tags: [Search]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Đồng bộ thành công
 *       401:
 *         description: Chưa đăng nhập
 *       403:
 *         description: Không có quyền truy cập
 */

const routes = new Router();

routes.get("/sync_data", isAdmin, controller.syncElastic);
routes.get("", controller.searchWithElasticSearchController);
export default routes;
