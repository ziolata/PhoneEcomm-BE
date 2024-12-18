import * as controller from "../controllers/optionValueController.js";
import { Router } from "express";
import { isAuthenticated, isAdmin } from "../middleware/checkauth.js";

const routes = new Router();

routes.post("/add", isAuthenticated, controller.addOptionValueController);

export default routes;
