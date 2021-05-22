import React from "react";
import { Link } from "react-router-dom";
import CloseIcon from "Icons/clear.svg";
import { pathToSignInPage } from "Utils/path-helpers/routerPaths";
import ProfileSettings from "Containers/ProfileSettings/ProfileSettings";
import styles from "./SignInPopup.scss";

class SignInPopup extends React.Component {
  state = {
    showSettings: false,
  };

  handleClick = (isSignInPage = true) => {
    const { setSignInPageType, closePopup } = this.props;
    setSignInPageType(isSignInPage);
    closePopup();
  };

  handleSignOutClick = () => {
    const { signOut, closePopup } = this.props;
    signOut();
    closePopup();
  };

  handleSettingsClick = () => {
    const { userId, showModal } = this.props;
    showModal({
      bodyContent: <ProfileSettings userId={userId} />,
    });
  };

  render() {
    const { showCloseButton, closePopup, isUserAuthorized } = this.props;

    if (isUserAuthorized) {
      return (
        <div className={styles.signInPopup_container}>
          <a onClick={this.handleSettingsClick} className={styles.signInPopup_button}>
            Настройки
          </a>
          <a onClick={() => this.handleSignOutClick()} className={styles.signInPopup_button}>
            Выйти
          </a>
        </div>
      );
    }

    return (
      <div className={styles.signInPopup_container}>
        {showCloseButton && (
          <CloseIcon className={styles.signInPopup_closeButton} onClick={() => closePopup()} />
        )}
        <Link
          onClick={() => this.handleClick(true)}
          className={styles.signInPopup_button}
          to={pathToSignInPage()}
        >
          Войти
        </Link>
      </div>
    );
  }
}

export default SignInPopup;
