import * as controller from "../controllers/optionController.js";
import { Router } from "express";
import { isAuthenticated, isAdmin } from "../middleware/checkauth.js";

const routes = new Router();

routes.post("/add", isAuthenticated, controller.addOptionController);

export default routes;
