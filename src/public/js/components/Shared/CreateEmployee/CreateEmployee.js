import React from "react";
import AddImage from "../../../../static/icons/add-square.svg";
import styles from "./CreateEmployee.scss";
import ProfileEdit from "Containers/ProfileEdit/ProfileEdit";

class CreateEmployee extends React.PureComponent {
  showSignInModal = () =>
    this.props.showModal({
      bodyContent: <ProfileEdit isCreateMode />,
    });

  getUserSettings = () => {
    return (
      <div className={styles.employee_add} onClick={() => this.showSignInModal()}>
        <AddImage />
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

export default CreateEmployee;
