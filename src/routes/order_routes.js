import * as controller from "../controllers/orderController.js";
import { Router } from "express";
import { isAuthenticated } from "../middleware/checkauth.js";

const routes = new Router();

routes.get("/", isAuthenticated, controller.getAllOrderController);
routes.post("/add", isAuthenticated, controller.createOrderController);
routes.put("/update/:id", controller.updateOrderController);

export default routes;
