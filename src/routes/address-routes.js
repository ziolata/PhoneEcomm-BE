import * as controller from "../controllers/address-controller.js";
import { Router } from "express";
import { isAuthenticated } from "../middleware/checkauth.js";

const routes = new Router();

routes.post("/add", isAuthenticated, controller.createAddressController);
routes.get("/", isAuthenticated, controller.getAllAddressController);
routes.get("/update/:id", isAuthenticated, controller.updateAddressController);
routes.get("/delete/:id", isAuthenticated, controller.deleteAddressController);

export default routes;
