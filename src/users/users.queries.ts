import { Employee } from "users";

const query = {
  getEmployeeByEmail: (email: string): string => `
    SELECT *
    FROM 
      employees 
    WHERE email = '${email}'
    `,

  createEmployee: `
    INSERT INTO 
      employees(
        "name",
        surname,
        patronymic,
        sex,
        department, 
        room, 
        mobile,
        email, 
        employment_date,
        role,
        password
      )
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
    RETURNING *;
    `,

  getEmployeeById: (userId: number): string => `
    SELECT 
      id,
      "name",
      surname,
      patronymic,
      sex,
      department,
      room,
      mobile,
      email,
      employment_date,
      role
    FROM 
      employees
    WHERE id = ${userId}
  `,

  getEmployeesByFullName: (fullName: string): string => `
    SELECT 
      id,
      "name",
      surname,
      patronymic,
      sex,
      department,
      room,
      mobile,
      email,
      employment_date
    FROM 
      employees
    WHERE LOWER("name") LIKE '%${fullName}%' OR 
    LOWER(surname) LIKE '%${fullName}%';
  `,

  removeEmployee: (userId: number): string => `
    DELETE FROM employees
    WHERE id = ${userId}
  `,

  updateEmployeeData: ({
    id,
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
  }: Employee): string => `
    UPDATE employees
    SET
      "name" = '${name}',
      surname = '${surname}',
      patronymic = '${patronymic}',
      sex = '${sex}',
      department = '${department}',
      room = '${room}',
      mobile = '${mobile}',
      email = '${email}',
      employment_date = '${employment_date}',
      role = '${role}'
    WHERE id = ${id}
    RETURNING *;
    `,
};

export default query;
