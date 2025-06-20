import * as controller from "../controllers/option-controller.js";
import { Router } from "express";
import { isAdmin } from "../middleware/checkauth.js";

const routes = new Router();

routes.post("/add", isAdmin, controller.createOptionController);
routes.get("/", controller.getAllOptionController);

export default routes;
