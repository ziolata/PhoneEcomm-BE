import * as controller from "../controllers/productVariantController.js";
import { Router } from "express";
import { isAuthenticated, isAdmin } from "../middleware/checkauth.js";

const routes = new Router();

routes.post("/add", controller.addProductVariantController);

export default routes;
