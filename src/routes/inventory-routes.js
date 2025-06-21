import * as controller from "../controllers/inventory-controller.js";
import { Router } from "express";
import { isAdmin } from "../middleware/auth-middleware.js";

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
