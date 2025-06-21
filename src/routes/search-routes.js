import * as controller from "../controllers/elasticsearch-controller.js";
import { Router } from "express";
import { isAdmin } from "../middleware/auth-middleware.js";

const routes = new Router();

routes.get("/sync_data", isAdmin, controller.syncElastic);
routes.get("", controller.searchWithElasticSearchController);
export default routes;
