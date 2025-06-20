import {
	registerController,
	loginController,
} from "../controllers/auth-controller.js";
import { Router } from "express";

const routes = new Router();

routes.post("/register", registerController);
routes.post("/login", loginController);

export default routes;
