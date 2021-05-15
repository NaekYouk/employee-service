import { connect } from "react-redux";
import { showModal } from "../../actions/Shared/modalActions";
import UserInfo from "../../components/Shared/UserInfo/UserInfo";

const mapStateToProps = ({ AccountState }, ownProps) => {
  return {
    isUserAuthorized: !!AccountState.userId,
    ...ownProps
  };
};

const mapDispatchToProps = (dispatch) => ({
  showModal: (props) => {
    dispatch(showModal(props));
  }
});

export default connect(mapStateToProps, mapDispatchToProps, null)(UserInfo);
