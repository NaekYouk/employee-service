import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { fetchEmployeeData } from "Actions/Employees/employeesActions";
import EmployeePage from "Components/EmployeePage/EmployeePage";
import { showModal } from "Actions/Shared/modalActions";

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
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(EmployeePage));
