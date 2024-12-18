import * as controller from "../controllers/cartController.js";
import { Router } from "express";
import { isAuthenticated, isAdmin } from "../middleware/checkauth.js";

const routes = new Router();

routes.get("/", isAuthenticated, controller.getCartController);

routes.post("/add", isAuthenticated, controller.postCartController);

export default routes;
