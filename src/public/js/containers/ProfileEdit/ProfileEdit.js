import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import {
  createEmployeeProfile,
  removeEmployeeProfile,
  saveEmployeeDataEdits,
} from "Actions/Employees/employeesActions";
import ProfileEdit from "Components/ProfileEdit/ProfileEdit";

const mapStateToProps = ({ EmployeesState }) => ({
  employee: EmployeesState.employee,
});

const mapDispatchToProps = (dispatch) => ({
  saveEdits: (edits) => {
    dispatch(saveEmployeeDataEdits(edits));
  },

  createProfile: (edits, history) => {
    dispatch(createEmployeeProfile(edits, history));
  },

  removeProfile: (id, history) => {
    dispatch(removeEmployeeProfile(id, history));
  },
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ProfileEdit));
