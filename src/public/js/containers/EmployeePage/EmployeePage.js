import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { fetchEmployeeData } from "Actions/Employees/employeesActions";
import EmployeePage from "Components/EmployeePage/EmployeePage";
import { showModal } from "Actions/Shared/modalActions";
import { changeUserProfileImage } from "Actions/ProfileModal/profileModalActions";

const mapStateToProps = ({ EmployeesState, ProfileModalState }, history) => ({
  role: ProfileModalState.userAccess,
  employee: EmployeesState.employee,
  isLoading: EmployeesState.isLoading || ProfileModalState.isLoading,
});

const mapDispatchToProps = (dispatch) => ({
  getEmployeeData: (id, history) => {
    dispatch(fetchEmployeeData(id, history));
  },

  showModal: (props) => {
    dispatch(showModal(props));
  },

  changeUserProfileImage: (userId, profileImage) => {
    dispatch(changeUserProfileImage(userId, profileImage, true));
  },
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(EmployeePage));
