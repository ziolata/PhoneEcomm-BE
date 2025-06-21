import * as controller from "../controllers/address-controller.js";
import { Router } from "express";
import { isAuthenticated } from "../middleware/auth-middleware.js";

const routes = new Router();

routes.post("/add", isAuthenticated, controller.createAddressController);
routes.get("/", isAuthenticated, controller.getAllAddressByUserIdController);
routes.get("/update/:id", isAuthenticated, controller.updateAddressController);
routes.get("/delete/:id", isAuthenticated, controller.deleteAddressController);

export default routes;
