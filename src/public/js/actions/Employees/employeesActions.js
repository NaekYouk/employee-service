import axios from "axios";

import { employeeCreate, employeeData, employeesList } from "Utils/path-helpers/signInPagePaths";
import {
  FETCH_EMPLOYEE_PAGE_BEGIN,
  FETCH_EMPLOYEE_PAGE_ERROR,
  FETCH_EMPLOYEE_PAGE_SUCCESS,
  FETCH_EMPLOYEES_BEGIN,
  FETCH_EMPLOYEES_ERROR,
  FETCH_EMPLOYEES_SUCCESS,
} from "Reducers/EmployeesPage/employeesPageReducer";
import { closeModal, showModal } from "Actions/Shared/modalActions";
import {
  pathToEmployeePage,
  pathToMainPage,
  pathToNotFoundPage,
} from "Utils/path-helpers/routerPaths";
import React from "react";
import ProfileEdit from "Containers/ProfileEdit/ProfileEdit";
import AuthorizeInfoPage from "Components/AuthorizeInfoPage/AuthorizeInfoPage";

export const fetchEmployeesDataBegin = () => ({
  type: FETCH_EMPLOYEES_BEGIN,
});

export const fetchEmployeesDataSuccess = (data) => ({
  type: FETCH_EMPLOYEES_SUCCESS,
  data,
});

export const fetchEmployeesDataError = () => ({
  type: FETCH_EMPLOYEES_ERROR,
});

export const fetchEmployeePageDataBegin = () => ({
  type: FETCH_EMPLOYEE_PAGE_BEGIN,
});

export const fetchEmployeePageDataSuccess = (data) => ({
  type: FETCH_EMPLOYEE_PAGE_SUCCESS,
  data,
});

export const fetchEmployeePageDataError = () => ({
  type: FETCH_EMPLOYEE_PAGE_ERROR,
});

export const fetchEmployeesData = (fullName) => (dispatch) => {
  dispatch(fetchEmployeesDataBegin());
  axios
    .get(employeesList(fullName), { params: { fullName: fullName } })
    .then((res) => {
      dispatch(fetchEmployeesDataSuccess(res.data.employees));
    })
    .catch(() => {
      dispatch(fetchEmployeesDataError());
    });
};

export const fetchEmployeeData = (id, history) => (dispatch) => {
  dispatch(fetchEmployeePageDataBegin());
  axios
    .get(employeeData(id))
    .then((res) => {
      if (res.status == 204) {
        history.push(pathToNotFoundPage());
      }

      dispatch(fetchEmployeePageDataSuccess(res.data));
    })
    .catch(() => {
      dispatch(fetchEmployeePageDataError());
    });
};

export const saveEmployeeDataEdits = (data) => (dispatch) => {
  dispatch(fetchEmployeePageDataBegin());
  axios
    .put(employeeData(data.id), { data })
    .then((res) => {
      dispatch(fetchEmployeePageDataSuccess(res.data[0]));
      dispatch(closeModal());
    })
    .catch(() => {
      dispatch(fetchEmployeePageDataError());
    });
};

export const createEmployeeProfile = (data, history) => (dispatch) => {
  dispatch(fetchEmployeePageDataBegin());
  axios
    .post(employeeCreate(), { ...data })
    .then((res) => {
      const createdEmployeeId = res.data.id;
      dispatch(fetchEmployeePageDataSuccess(res.data));
      dispatch(
        showModal({
          bodyContent: <AuthorizeInfoPage login={res.data.email} password={res.data.password} />,
          onClose: () => history.push(pathToEmployeePage(createdEmployeeId)),
        })
      );
    })
    .catch(() => {
      dispatch(fetchEmployeePageDataError());
    });
};

export const removeEmployeeProfile = (id, history) => (dispatch) => {
  dispatch(fetchEmployeePageDataBegin());
  axios
    .delete(employeeData(id))
    .then(() => {
      dispatch(fetchEmployeePageDataSuccess({}));
      dispatch(closeModal());
      history.push(pathToMainPage());
    })
    .catch(() => {
      dispatch(fetchEmployeePageDataError());
    });
};
