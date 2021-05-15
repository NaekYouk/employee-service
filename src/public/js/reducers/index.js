import { combineReducers } from "redux";
import MainPageState from "./MainPage/mainPageReducer";
import ModalState from "./Shared/modalReducer";
import AccountState from "./SignInPage/signInPageReducer";
import MediaPageState from "./MediaPage/mediaPageReducer";
import ProfileModalState from "./ProfileModal/profileModalReducer";
import EmployeesState from "./EmployeesPage/employeesPageReducer";

const reducers = combineReducers({
  MainPageState,
  MediaPageState,
  AccountState,
  ModalState,
  ProfileModalState,
  EmployeesState,
});

export default reducers;
