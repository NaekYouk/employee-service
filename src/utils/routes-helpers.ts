import { Request, Response, Router } from "express";
import { Routes, Methods, PathParams } from "routes";

const methodNotAllowed = (req: Request, res: Response, methods: Array<string>): void => {
  res.set("Allow", methods.join(", ").toUpperCase());
  res.status(405).end();
};

const anyButUse = (method: string): boolean => method !== "use";

const getAllowedMethods = (handlers: Methods): Array<string> => {
  return Object.keys(handlers).filter(anyButUse);
};

export const initializeRouter = (routes: Routes): Router => {
  const router: Router = Router();

  routes.forEach(([path, handlers]: [PathParams, Methods]): void => {
    // Remove express's use method from allowed header methods list
    const allowedMethods: Array<string> = getAllowedMethods(handlers);

    // Set handlers for specified HTTP methods
    Object.entries(handlers).forEach(async([method, handler]: [string, Function | Array<Function>]): Promise<void> => {
      if (Array.isArray(handler)) {
        await router[method](path, ...handler);
      } else {
        await router[method](path, handler);
      }
      // Send 405 if method was not specified
      await router.all(path, (req: Request, res: Response): void => methodNotAllowed(req, res, allowedMethods));
    });
  });

  return router;
};
