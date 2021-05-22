import axios from "axios";
import {
  SET_SIGN_IN_PAGE_TYPE,
  SIGN_IN_BEGIN,
  SIGN_IN_SUCCESS,
  SIGN_IN_ERROR,
  SIGN_IN_END,
  USER_CREATION_BEGIN,
  USER_CREATION_ERROR,
  SIGN_OUT_BEGIN,
  SIGN_OUT_ERROR,
  SIGN_OUT_SUCCESS,
  SET_USER_DATA_FROM_LOCAL_STORAGE,
} from "Reducers/SignInPage/signInPageReducer";
import { getErrorStatus } from "Utils/error-helpers/error-helpers";
import { pathToMainPage } from "Utils/path-helpers/routerPaths";
import { redirectTo } from "Actions/Shared/historyActions";
import { employeeCreate, signInPath } from "Utils/path-helpers/signInPagePaths";
import { deleteSessionData, setSessionData } from "Utils/storage-helpers/storage-helpers";

const ERRORS = {
  WRONG_NAME: "Неверное имя пользователя или пароль",
  USER_EXISTS: "Пользователь с таким именем или электронной почтой уже существует",
  UNKNOWN: "Мы действительно не знаем, что произошло. Повторите попытку позже",
  SESSION_EXPIRED: "Срок действия текущей сессии истек",
};

export const setSignInPageType = (data) => ({
  type: SET_SIGN_IN_PAGE_TYPE,
  data,
});

export const signInBegin = () => ({
  type: SIGN_IN_BEGIN,
});

export const signInSuccess = (data) => ({
  type: SIGN_IN_SUCCESS,
  data,
});

export const signInError = (data) => ({
  type: SIGN_IN_ERROR,
  data,
});

export const signInEnd = () => ({
  type: SIGN_IN_END,
});

export const signIn = (body, history) => (dispatch) => {
  dispatch(signInBegin());
  axios
    .post(signInPath(), body)
    .then((res) => {
      dispatch(signInSuccess(res.data));
      setSessionData(res.data);
      dispatch(redirectTo(pathToMainPage(), history));
    })
    .catch((error) => {
      if (getErrorStatus(error) === 401) {
        return dispatch(signInError(ERRORS.WRONG_NAME));
      }
      dispatch(signInError(ERRORS.UNKNOWN));
    });
};

export const userCreationBegin = () => ({
  type: USER_CREATION_BEGIN,
});

export const userCreationError = () => ({
  type: USER_CREATION_ERROR,
});

export const createUser = (body) => (dispatch) => {
  dispatch(userCreationBegin());

  axios
    .post(employeeCreate(), body)
    .then((res) => {
      dispatch(signInSuccess(res.data));
      setSessionData(res.data);
      dispatch(redirectTo(pathToMainPage()));
    })
    .catch((error) => {
      if (getErrorStatus(error) === 400) {
        return dispatch(signInError(ERRORS.USER_EXISTS));
      }
      dispatch(userCreationError());
    });
};

export const signOutBegin = () => ({
  type: SIGN_OUT_BEGIN,
});

export const signOutError = () => ({
  type: SIGN_OUT_ERROR,
});

export const signOutSuccess = () => ({
  type: SIGN_OUT_SUCCESS,
});

export const signOut = () => (dispatch) => {
  try {
    dispatch(signOutBegin());
    deleteSessionData();
    dispatch(signOutSuccess());
  } catch (e) {
    dispatch(signOutError());
  }
};

export const setUserDataFromLocalStorage = (data) => ({
  type: SET_USER_DATA_FROM_LOCAL_STORAGE,
  data,
});
