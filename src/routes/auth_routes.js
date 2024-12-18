import {
	registerController,
	loginController,
} from "../controllers/authController.js";
import { Router } from "express";
import { validateAuth } from "../middleware/checkauth.js";

const routes = new Router();

routes.post("/register", validateAuth, registerController);
routes.post("/login", loginController);

export default routes;
