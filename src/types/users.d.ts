export type Employee = {
  id: number;
  name: string;
  surname: string;
  patronymic: string;
  sex: string;
  department: string;
  room: string;
  mobile: string;
  email: string;
  employment_date: string;
  role: string;
  password?: string;
};

export type EmployeeRequestBody = {
  username?: string;
  email: string;
  password: string;
};

export type Token = string;
