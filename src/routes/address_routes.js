import * as controller from "../controllers/addressController.js";
import { Router } from "express";
import { isAuthenticated, isAdmin } from "../middleware/checkauth.js";

const routes = new Router();

routes.post("/add", isAuthenticated, controller.addAddressController);

export default routes;
