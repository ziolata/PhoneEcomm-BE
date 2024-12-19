import * as controller from "../controllers/reviewController.js";
import { Router } from "express";
import { isAuthenticated, isAdmin } from "../middleware/checkauth.js";

const routes = new Router();

routes.post("/add", isAuthenticated, controller.addReviewController);

export default routes;
