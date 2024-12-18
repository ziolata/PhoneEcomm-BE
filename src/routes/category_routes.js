import * as controller from "../controllers/categorycontroller.js";
import { Router } from "express";
import { isAuthenticated, isAdmin } from "../middleware/checkauth.js";

const routes = new Router();

routes.get("/", controller.getCategoryController);
routes.get("/:id", controller.getOneCategoryController);
routes.post("/add", isAdmin, controller.addCategoryController);
routes.put("/update/:id", isAdmin, controller.updateCategoryController);
routes.delete("/delete/:id", isAdmin, controller.deleteCategoryController);

export default routes;
