import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import Employees from "Components/Employees/Employees";
import { fetchEmployeesData } from "Actions/Employees/employeesActions";

const mapStateToProps = ({ EmployeesState }, history) => ({
  employees: EmployeesState.employees,
  isLoading: EmployeesState.isLoading,
  history,
});

const mapDispatchToProps = (dispatch) => ({
  searchEmployees: (fullName) => {
    dispatch(fetchEmployeesData(fullName));
  },
});

const mergeProps = (stateProps, { searchEmployees, ...dispatchProps }, ownProps) => {
  return {
    ...stateProps,
    ...dispatchProps,
    ...ownProps,

    searchEmployees: (fullName) => {
      searchEmployees(fullName);
    },
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps, mergeProps)(Employees));
