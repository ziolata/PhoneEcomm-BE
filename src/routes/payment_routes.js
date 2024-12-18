import * as controller from "../controllers/paymentController.js";
import { Router } from "express";
import { isAuthenticated, isAdmin } from "../middleware/checkauth.js";

const routes = new Router();

routes.post(
	"/create_payment",
	isAuthenticated,
	controller.addPaymentController,
);
routes.get("/vnpay_return", controller.getPaymentController);

export default routes;
