import * as controller from "../controllers/category-controller.js";
import { Router } from "express";
import { isAdmin } from "../middleware/checkauth.js";

const routes = new Router();

routes.get("/", controller.getAllCategoryController);
routes.get("/:id", controller.getOneCategoryController);
routes.post("/add", isAdmin, controller.createCategoryController);
routes.put("/update/:id", isAdmin, controller.updateCategoryController);
routes.delete("/delete/:id", isAdmin, controller.deleteCategoryController);

export default routes;
