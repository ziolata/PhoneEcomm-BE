import * as controller from "../controllers/elasticSearchController.js";
import { Router } from "express";
import { isAdmin } from "../middleware/checkauth.js";

const routes = new Router();

routes.get("/sync_data", isAdmin, controller.syncElastic);
routes.get("", controller.searchWithElasticSearchController);
export default routes;
