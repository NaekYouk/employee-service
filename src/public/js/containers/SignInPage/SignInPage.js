import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { signIn, createUser, setSignInPageType } from "../../actions/Account/accountActions";
import { redirectTo } from "../../actions/Shared/historyActions";
import SignInPage from "../../components/SignInPage/SignInPage";

const mapStateToProps = ({ AccountState }) => ({
  isUserAuthorized: !!AccountState.userId,
  userName: AccountState.userName,
  showSignInForm: AccountState.showSignInForm,
  isLoading: AccountState.isLoading,
  error: AccountState.error,
});

const mapDispatchToProps = (dispatch) => ({
  authorizeUser: (body, history) => {
    dispatch(signIn(body, history));
  },

  setSignInPageType: (isSignInPage) => {
    dispatch(setSignInPageType(isSignInPage));
  },

  redirectTo: (path, history) => {
    dispatch(redirectTo(path, history));
  },

  createEmployee: (body) => {
    dispatch(createUser(body));
  },
});

const mergeProps = (stateProps, { authorizeUser, createUser, ...dispatchProps }, ownProps) => {
  return {
    ...stateProps,
    ...dispatchProps,
    ...ownProps,

    authorizeUser: (body) => {
      authorizeUser(body, history);
    },

    createEmployee: (body) => {
      createUser(body);
    },
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps, mergeProps)(SignInPage));
