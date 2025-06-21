import * as controller from "../controllers/discount-controller.js";
import { Router } from "express";
import { isAdmin } from "../middleware/auth-middleware.js";

const routes = new Router();

routes.post("/add", isAdmin, controller.createDiscountController);
routes.post("/add/multi", isAdmin, controller.createMultiDiscountController);

export default routes;
