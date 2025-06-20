import * as controller from "../controllers/addressController.js";
import { Router } from "express";
import { isAuthenticated } from "../middleware/checkauth.js";

const routes = new Router();

routes.post("/add", isAuthenticated, controller.createAddressController);
routes.get("/", isAuthenticated, controller.getAllAddressController);
export default routes;
