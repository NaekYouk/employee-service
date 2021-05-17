import employeesAPI from "../employees/employees.api";
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
  ]),
};

export default routes;
