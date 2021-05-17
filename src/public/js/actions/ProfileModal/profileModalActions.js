import axios from "axios";
import {
  FETCH_USER_DATA_BEGIN,
  FETCH_USER_DATA_SUCCESS,
  FETCH_USER_DATA_ERROR,
  CHANGE_PROFILE_ICON_BEGIN,
  CHANGE_PROFILE_ICON_SUCCESS,
  CHANGE_PROFILE_ICON_ERROR,
} from "Reducers/ProfileModal/profileModalReducer";

import { employeeInfoPath } from "Utils/path-helpers/signInPagePaths";

export const fetchUserDataBegin = () => ({
  type: FETCH_USER_DATA_BEGIN,
});

export const fetchUserDataSuccess = (data) => ({
  type: FETCH_USER_DATA_SUCCESS,
  data,
});

export const fetchUserDataError = () => ({
  type: FETCH_USER_DATA_ERROR,
});

export const fetchUserData = (userId) => (dispatch) => {
  dispatch(fetchUserDataBegin());
  axios
    .get(employeeInfoPath(userId))
    .then((res) => {
      dispatch(fetchUserDataSuccess(res.data));
    })
    .catch(() => {
      dispatch(fetchUserDataError());
    });
};

export const changeUserProfileBegin = () => ({
  type: CHANGE_PROFILE_ICON_BEGIN,
});

export const changeUserProfileSuccess = (data) => ({
  type: CHANGE_PROFILE_ICON_SUCCESS,
  data,
});

export const changeUserProfileError = () => ({
  type: CHANGE_PROFILE_ICON_ERROR,
});

export const changeUserProfileImage = (userId, image) => (dispatch) => {
  dispatch(changeUserProfileBegin());
  axios
    .patch(employeeInfoPath(userId), {
      ...image,
    })
    .then((res) => {
      dispatch(changeUserProfileSuccess(res.data[0]));
    })
    .catch(() => {
      dispatch(changeUserProfileError());
    });
};
