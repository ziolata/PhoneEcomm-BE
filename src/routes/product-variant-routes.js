import * as controller from "../controllers/product-variant-controller.js";
import { Router } from "express";
import { isAdmin } from "../middleware/auth-middleware.js";

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
