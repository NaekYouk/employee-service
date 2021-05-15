import { Router } from "express";

export type RouteModuleOutput = {
  route: string,
  router: Router
}

export type Methods = {
  [method: string]: Function | Array<Function>;
}
export type Routes = Array<[PathParams, Methods]>

export type PathParams = string | Array<(string | RegExp)>
