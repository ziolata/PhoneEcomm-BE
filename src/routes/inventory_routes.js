import * as controller from "../controllers/inventoryController.js";
import { Router } from "express";
import { isAuthenticated, isAdmin } from "../middleware/checkauth.js";

const routes = new Router();

routes.get("/", controller.getInventoryController);
routes.post("/add", controller.addInventoryController);
routes.put("/update/:id", controller.updateStockController);
routes.delete("/delete/:id", controller.deleteStockController);

export default routes;
