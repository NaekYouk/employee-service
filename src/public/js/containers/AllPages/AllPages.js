import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import AllPages from "Components/AllPages/AllPages";
import { fetchUserData } from "Actions/ProfileModal/profileModalActions";

const mapStateToProps = ({ AccountState }) => ({
  userId: AccountState.userId,
  isUserAuthorized: !!AccountState.userId,
});

const mapDispatchToProps = (dispatch) => ({
  fetchUserData: (userId) => {
    dispatch(fetchUserData(userId));
  },
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(AllPages));
