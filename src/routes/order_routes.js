import * as controller from "../controllers/orderController.js";
import { Router } from "express";
import { isAuthenticated, isAdmin } from "../middleware/checkauth.js";

const routes = new Router();

routes.get("/", isAuthenticated, controller.getOrderController);
routes.post("/add", isAuthenticated, controller.addOrderController);
routes.put("/update/:id", controller.updateOrderController);

export default routes;
