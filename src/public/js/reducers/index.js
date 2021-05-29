import { combineReducers } from "redux";
import ModalState from "./Shared/modalReducer";
import AccountState from "./AccountState/accountReducer";
import ProfileModalState from "./ProfileModal/profileModalReducer";
import EmployeesState from "./EmployeesPage/employeesPageReducer";

const reducers = combineReducers({
  AccountState,
  ModalState,
  ProfileModalState,
  EmployeesState,
});

export default reducers;
