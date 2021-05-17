import query from "./employees.queries";
import { sqlQuery } from "../postgres";
import bcrypt from "bcryptjs";
import "../utils/env";
import { Maybe } from "common";
import { Employee, EmployeeRequestBody } from "employees.d.ts";
import { validateString, getCloudinaryMediaFilesPath } from "../utils/string-helpers";
import { generatePassword } from "../utils/authorization-helpers";
import cloudinary from "cloudinary";

const SALT_ROUNDS = 10;

const getEmployeeByEmail = async ({
  email,
  password,
}: EmployeeRequestBody): Promise<Maybe<Employee>> => {
  validateString(email, "Email is not a string");
  validateString(password, "Password is not a string");

  const employee: Array<Maybe<Employee>> = await sqlQuery(query.getEmployeeByEmail(email));

  if (employee.length) {
    if (!password) {
      return { ...employee[0], password: password };
    }

    const match: number = await bcrypt.compare(password, employee[0].password);
    // const encryptedPassword = await bcrypt.compare(password, SALT_ROUNDS);
    // const match: boolean = password === employee[0].password;

    if (match) {
      return {
        ...employee[0],
      };
    }
  }
};

const createEmployee = async ({
  name,
  surname,
  patronymic,
  sex,
  department,
  room,
  mobile,
  email,
  role = "default",
  employment_date = new Date().toISOString().split("T")[0],
}: Employee): Promise<void> => {
  const generatedPassword: string = generatePassword();
  const salt: string = await bcrypt.genSalt(SALT_ROUNDS);
  const bcryptedPassword: string = await bcrypt.hash(generatedPassword, salt);

  const createdEmployee = await sqlQuery(query.createEmployee, [
    name,
    surname,
    patronymic,
    sex,
    department,
    room,
    mobile,
    email,
    employment_date,
    role,
    bcryptedPassword,
  ]);

  return Promise.resolve({ ...createdEmployee[0], password: generatedPassword });
};

const getEmployeeById = async (userId: number): Promise<Omit<Employee, "password">> => {
  const employee: Array<Maybe<Employee>> = await sqlQuery(query.getEmployeeById(userId));

  if (employee.length) {
    const {
      id,
      name,
      surname,
      patronymic,
      sex,
      department,
      room,
      mobile,
      email,
      role,
      image,
      employment_date,
    } = employee[0];

    return {
      id,
      name,
      surname,
      patronymic,
      sex,
      department,
      room,
      mobile,
      email,
      role,
      image,
      employment_date,
    };
  }
};

const removeEmployee = async (userId: number): Promise<any> => {
  return await sqlQuery(query.removeEmployee(userId));
};

const updateEmployee = async (data: Employee): Promise<any> => {
  const updatedEmployee = await sqlQuery(query.updateEmployeeData(data));

  return Promise.resolve(updatedEmployee);
};

const updateEmployeeImage = async (data): Promise<void> => {
  validateString(data.image, "Image is not a string");

  const publicId: string = getCloudinaryMediaFilesPath([data.name, data.surname].join("_"));
  const response: any = await cloudinary.v2.uploader.upload(data.image, {
    resource_type: "image",
    public_id: publicId,
    overwrite: true,
  });
  if (response && response.secure_url) {
    try {
      const updatedEmployee = await sqlQuery(
        query.updateEmployeeData({ ...data, image: response.secure_url })
      );

      return Promise.resolve(updatedEmployee);
    } catch (e) {
      console.log(e);
      await cloudinary.v2.uploader.destroy(publicId);
    }
  }
};

const getEmployeesByFullName = async ({
  fullName,
}: {
  fullName: string;
}): Promise<Array<Employee>> => {
  const searchNameQuery = fullName.replace(/\s/g, "%").toLowerCase();
  const employees: Array<Maybe<Employee>> = await sqlQuery(
    query.getEmployeesByFullName(searchNameQuery)
  );

  return Promise.resolve(employees);
};

export default {
  createEmployee,
  getEmployeeByEmail,
  getEmployeeById,
  getEmployeesByFullName,
  removeEmployee,
  updateEmployee,
  updateEmployeeImage,
};
