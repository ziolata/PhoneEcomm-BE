import * as controller from "../controllers/productcontroller.js";
import { Router } from "express";
import { isAuthenticated, isAdmin } from "../middleware/checkauth.js";

const routes = new Router();

routes.get("/", controller.getProductController);
routes.get("/:id", controller.getOneProductController);
routes.post("/add", controller.addProductController);

export default routes;
