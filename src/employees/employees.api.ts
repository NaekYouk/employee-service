import { Request, Response } from "express";
import usersController from "./employees.controller";
import { generateToken } from "../utils/authorization-helpers";
import { Employee } from "employees.d.ts";
import { Maybe } from "common";
import { RouteModuleOutput } from "routes";
import { initializeRouter } from "../utils/routes-helpers";
import { formatDate } from "../utils/string-helpers";

const signIn = async (req: Request, res: Response): Promise<void> => {
  try {
    let employee: Maybe<Employee> = await usersController.getEmployeeByEmail(req.body);
    if (employee && employee.password) {
      delete employee.password;
      const token = generateToken(employee);

      res.status(200).json({
        ...employee,
        token,
      });
    } else {
      res.status(401).json({ message: "Email or password is incorrect" });
    }
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: "Internal server error" });
  }
};

const createEmployee = async (req: Request, res: Response): Promise<void> => {
  try {
    const employee: Maybe<Employee> = await usersController.getEmployeeByEmail(req.body);
    if (employee) {
      res.status(400).json({ message: "User already exists" });
    } else {
      const createdEmployee = await usersController.createEmployee(req.body);
      res.status(200).json(createdEmployee);
    }
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: "Internal server error" });
  }
};

const fireEmployee = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId: number = Number(req.params.userId);
    if (userId) {
      await usersController.removeEmployee(userId);
      res.status(204).json({ message: "The user was successfully fired" });
    } else {
      res.status(400).json({ message: "User doesn't exists" });
    }
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: "Internal server error" });
  }
};

const getEmployeeById = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId: string = req.params.userId;
    const employee: Maybe<Omit<Employee, "password">> = await usersController.getEmployeeById(
      +userId
    );
    if (employee) {
      res.status(200).json(employee);
    } else {
      res.status(204).end();
    }
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: "Internal server error" });
  }
};

const updateEmployeeData = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId: string = req.params.userId;
    const employee: Maybe<Omit<Employee, "password">> = await usersController.getEmployeeById(
      +userId
    );

    if (employee) {
      const updatedEmployeeData = await usersController.updateEmployee(req.body.data);

      res.status(200).json(updatedEmployeeData);
    } else {
      res.status(204).end();
    }
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: "Internal server error" });
  }
};

const updateEmployeeImage = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId: string = req.params.userId;
    const employee: Maybe<Omit<Employee, "password">> = await usersController.getEmployeeById(
      +userId
    );

    if (employee) {
      const updatedEmployeeData = await usersController.updateEmployeeImage({
        ...employee,
        employment_date: formatDate(employee.employment_date),
        image: req.body.image,
      });

      res.status(200).json(updatedEmployeeData);
    } else {
      res.status(204).end();
    }
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: "Internal server error" });
  }
};

const findEmployees = async (req: Request, res: Response): Promise<void> => {
  try {
    const foundEmployees = await usersController.getEmployeesByFullName(
      req.query as { fullName: string }
    );
    res.status(200).json({ employees: foundEmployees, length: foundEmployees.length });
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: "Internal server error" });
  }
};

const routes: RouteModuleOutput = {
  route: "/employee",
  router: initializeRouter([
    [
      "/sign-in",
      {
        post: signIn,
      },
    ],
    [
      "/create",
      {
        // post: [verifyToken, checkAdminRights, createEmployee]
        post: createEmployee,
      },
    ],
    [
      "/:userId",
      {
        get: getEmployeeById,
        put: updateEmployeeData,
        patch: updateEmployeeImage,
        delete: fireEmployee,
      },
    ],
    [
      "",
      {
        get: findEmployees,
      },
    ],
  ]),
};

export default routes;
