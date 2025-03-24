import * as controller from "../controllers/userController.js";
import { Router } from "express";
import { isAuthenticated } from "../middleware/checkauth.js";

const routes = new Router();

routes.post(
	"/change_pass",
	isAuthenticated,
	controller.changePasswordController,
);
routes.post("/forgot_password", controller.forgotPasswordController);
routes.post("/reset_password/:token", controller.resetPasswordController);
export default routes;
