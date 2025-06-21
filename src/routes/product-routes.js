import * as controller from "../controllers/product-controller.js";
import { Router } from "express";
import { isAdmin } from "../middleware/auth-middleware.js";

const routes = new Router();

routes.get("/", controller.getAllProductController);
routes.get("/:id", controller.getOneProductController);
routes.post("/add", isAdmin, controller.createProductController);
routes.put("/update/:id", isAdmin, controller.updateProductController);
export default routes;
