import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { closeModal, showModal } from "../../actions/Shared/modalActions";
import ProfileSettings from "../../components/ProfileSettings/ProfileSettings";
import { changeUserProfile, fetchUserData } from "Actions/ProfileModal/profileModalActions";

const mapStateToProps = ({ ProfileModalState, AccountState }) => ({
  isProfileOwner: AccountState.userId === ProfileModalState.userId,
  userId: ProfileModalState.userId,
  userName: ProfileModalState.userName,
  userImage: ProfileModalState.userImage,
  userJoinDate: ProfileModalState.userJoinDate,
  userAccess: ProfileModalState.userAccess,
  isLoading: ProfileModalState.isLoading,
  error: ProfileModalState.error
});

const mapDispatchToProps = (dispatch) => ({
  closeModal: () => {
    dispatch(closeModal());
  },

  showModal: () => {
    dispatch(showModal());
  },

  fetchUserData: (userId) => {
    dispatch(fetchUserData(userId));
  },

  changeUserProfile: (userId, profileImage) => {
    dispatch(changeUserProfile(userId, profileImage));
  }
});

const mergeProps = (
  stateProps,
  { changeUserProfile, ...dispatchProps },
  ownProps
) => {
  return ({
    ...stateProps,
    ...dispatchProps,
    ...ownProps,

    changeUserProfile: (profileImage) => {
      changeUserProfile(stateProps.userId, profileImage);
    }
  });
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps, mergeProps)(ProfileSettings));
