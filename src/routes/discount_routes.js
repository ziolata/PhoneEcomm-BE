import * as controller from "../controllers/discountcontroller.js";
import { Router } from "express";
import { isAuthenticated, isAdmin } from "../middleware/checkauth.js";

const routes = new Router();

routes.post("/add", isAdmin, controller.addDiscountController);
routes.post("/add/multi", isAdmin, controller.postMultiDiscountController);

export default routes;
