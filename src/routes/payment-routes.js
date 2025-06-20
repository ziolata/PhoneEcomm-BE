import * as controller from "../controllers/payment-controller.js";
import { Router } from "express";
import { isAuthenticated } from "../middleware/checkauth.js";

const routes = new Router();

routes.post(
	"/create_payment",
	isAuthenticated,
	controller.createPaymentController,
);
routes.get("/vnpay_return", controller.getPaymentController);

export default routes;
