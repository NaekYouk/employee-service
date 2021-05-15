import employeesAPI from "../users/users.api";
import mediaAPI from "../media/media.api";
import { RouteModuleOutput } from "routes";
import { initializeRouter } from "../utils/routes-helpers";

const routes: RouteModuleOutput = {
  route: "/api",
  router: initializeRouter([
    [
      employeesAPI.route,
      {
        use: employeesAPI.router,
      },
    ],
    [
      mediaAPI.route,
      {
        use: mediaAPI.router,
      },
    ],
  ]),
};

export default routes;
