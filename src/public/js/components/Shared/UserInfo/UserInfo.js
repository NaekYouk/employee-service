import React from "react";
import LoginIcon from "../../../../static/icons/account.svg";
import SignInPopup from "Containers/SignInPopup/SignInPopup";
import UserAvatar, { USER_AVATAR_COLOR } from "../UserAvatar/UserAvatar";
import styles from "./UserInfo.scss";

class UserInfo extends React.PureComponent {
  showSignInModal = () =>
    this.props.showModal({
      bodyContent: <SignInPopup />,
    });

  getUserSettings = () => {
    return (
      <div className={styles.user_item} onClick={() => this.showSignInModal()}>
        <UserAvatar color={USER_AVATAR_COLOR.BLACK} />
      </div>
    );
  };

  render = () => {
    const { isUserAuthorized } = this.props;
    if (isUserAuthorized) {
      return this.getUserSettings();
    }
    return null;
  };
}

export default UserInfo;
