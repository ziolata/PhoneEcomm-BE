import {
	registerController,
	loginController,
} from "../controllers/authController.js";
import { Router } from "express";

const routes = new Router();

routes.post("/register", registerController);
routes.post("/login", loginController);

export default routes;
