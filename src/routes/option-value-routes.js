import * as controller from "../controllers/option-value-Controller.js";
import { Router } from "express";
import { isAuthenticated } from "../middleware/checkauth.js";

const routes = new Router();

routes.post("/add", isAuthenticated, controller.createOptionValueController);
routes.get("/", controller.getAllOptionValueController);
export default routes;
