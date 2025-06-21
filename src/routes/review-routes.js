import * as controller from "../controllers/review-controller.js";
import { Router } from "express";
import { isAuthenticated } from "../middleware/auth-middleware.js";

const routes = new Router();
routes.post("/add/", isAuthenticated, controller.createReviewController);
routes.get("/", isAuthenticated, controller.getAllReviewController);
export default routes;
