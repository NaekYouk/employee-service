import apiRoutes from "./api.routes";
import { RouteModuleOutput } from "routes";
import { initializeRouter } from "../utils/routes-helpers";

const routes: RouteModuleOutput = {
  route: "/",
  router: initializeRouter([
    [apiRoutes.route, {
      use: apiRoutes.router
    }]
  ])
};

export default routes;
