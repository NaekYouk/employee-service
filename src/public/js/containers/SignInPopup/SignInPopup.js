import { connect } from "react-redux";
import { closeModal, showModal } from "../../actions/Shared/modalActions";
import { setSignInPageType, signOut } from "../../actions/SignInPage/signInPageActions";
import SignInPopup from "../../components/SignInPage/SignInPopup/SignInPopup";

const mapStateToProps = ({ AccountState }) => {
  return {
    userId: AccountState.userId,
    isUserAuthorized: !!AccountState.userId
  };
};

const mapDispatchToProps = (dispatch) => ({
  closePopup: () => {
    dispatch(closeModal());
  },

  setSignInPageType: (isSignInPage) => {
    dispatch(setSignInPageType(isSignInPage));
  },

  signOut: () => {
    dispatch(signOut());
  },

  showModal: (props) => {
    dispatch(showModal(props));
  }
});

export default connect(mapStateToProps, mapDispatchToProps, null)(SignInPopup);
