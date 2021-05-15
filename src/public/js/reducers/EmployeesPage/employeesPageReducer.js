export const FETCH_EMPLOYEES_BEGIN = "Components/Employees/FETCH_USER_DATA_BEGIN";
export const FETCH_EMPLOYEES_SUCCESS = "Components/Employees/FETCH_USER_DATA_SUCCESS";
export const FETCH_EMPLOYEES_ERROR = "Components/Employees/FETCH_USER_DATA_ERROR";

export const FETCH_EMPLOYEE_PAGE_BEGIN = "Components/EmployeePage/FETCH_EMPLOYEE_PAGE_BEGIN";
export const FETCH_EMPLOYEE_PAGE_SUCCESS = "Components/EmployeePage/FETCH_EMPLOYEE_PAGE_SUCCESS";
export const FETCH_EMPLOYEE_PAGE_ERROR = "Components/EmployeePage/FETCH_EMPLOYEE_PAGE_ERROR";

const initialState = {
  isLoading: false,
  employees: [],
  employee: {},
};

const EmployeesState = (state = initialState, { data, type } = {}) => {
  switch (type) {
    case FETCH_EMPLOYEES_BEGIN:
      return {
        ...state,
        isLoading: true,
      };

    case FETCH_EMPLOYEES_SUCCESS:
      return {
        ...state,
        isLoading: false,
        employees: data,
      };

    case FETCH_EMPLOYEES_ERROR:
      return {
        ...state,
        error: "Error while fetching user's data",
      };

    case FETCH_EMPLOYEE_PAGE_BEGIN:
      return {
        ...state,
        isLoading: true,
      };

    case FETCH_EMPLOYEE_PAGE_SUCCESS:
      return {
        ...state,
        isLoading: false,
        employee: data,
        // userImage: data.userImage
      };

    case FETCH_EMPLOYEE_PAGE_ERROR:
      return {
        ...state,
        error: "Error while fetching user's data",
      };

    default: {
      return state;
    }
  }
};

export default EmployeesState;
