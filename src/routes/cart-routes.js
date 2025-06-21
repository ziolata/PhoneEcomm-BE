import * as controller from "../controllers/cart-controller.js";
import { Router } from "express";
import { isAuthenticated } from "../middleware/auth-middleware.js";

const routes = new Router();

routes.get("/", isAuthenticated, controller.getAllCartController);
routes.post("/add", isAuthenticated, controller.createCartController);
routes.put("/update", isAuthenticated, controller.updateCartController);
routes.delete("/delete/:id", isAuthenticated, controller.deleteCartController);
export default routes;
