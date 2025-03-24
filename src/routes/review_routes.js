import * as controller from "../controllers/reviewController.js";
import { Router } from "express";
import { isAuthenticated } from "../middleware/checkauth.js";

const routes = new Router();
routes.post("/add/", isAuthenticated, controller.createReviewController);
routes.get("/", isAuthenticated, controller.getAllReviewController);
export default routes;
