export const FETCH_USER_DATA_BEGIN = "Components/ProfileModal/FETCH_USER_DATA_BEGIN";
export const FETCH_USER_DATA_SUCCESS = "Components/ProfileModal/FETCH_USER_DATA_SUCCESS";
export const FETCH_USER_DATA_ERROR = "Components/ProfileModal/FETCH_USER_DATA_ERROR";

export const CHANGE_PROFILE_ICON_BEGIN = "Components/ProfileModal/CHANGE_PROFILE_ICON_BEGIN";
export const CHANGE_PROFILE_ICON_SUCCESS = "Components/ProfileModal/CHANGE_PROFILE_ICON_SUCCESS";
export const CHANGE_PROFILE_ICON_ERROR = "Components/ProfileModal/CHANGE_PROFILE_ICON_ERROR";

const initialState = {
  userName: "",
  userId: null,
  userAccess: null,
  userJoinDate: null,
  userImage: null,
  isLoading: false,
  error: "",
};

const ProfileModal = (state = initialState, { data, type } = {}) => {
  switch (type) {
    case FETCH_USER_DATA_BEGIN:
      return {
        ...state,
        isLoading: true,
      };

    case FETCH_USER_DATA_SUCCESS:
      return {
        ...state,
        isLoading: false,
        userName: data.name,
        userId: data.id,
        userAccess: data.role,
        userJoinDate: data.employment_date,
        userImage: data.userImage,
      };

    case FETCH_USER_DATA_ERROR:
      return {
        ...state,
        error: "Error while fetching user's data",
      };

    case CHANGE_PROFILE_ICON_BEGIN:
      return {
        ...state,
        isLoading: true,
        error: "",
      };

    case CHANGE_PROFILE_ICON_SUCCESS:
      return {
        ...state,
        isLoading: false,
        userImage: data.userImage,
        error: "",
      };

    case CHANGE_PROFILE_ICON_ERROR:
      return {
        ...state,
        isLoading: false,
        error: "Error while fetching profile icon",
      };

    default: {
      return state;
    }
  }
};

export default ProfileModal;
