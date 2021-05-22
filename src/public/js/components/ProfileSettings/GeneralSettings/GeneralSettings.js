import React, { Fragment } from "react";
import { formatDateTime } from "Utils/date-helpers/date-helpers";
import UserAvatar, { USER_AVATAR_COLOR } from "Components/Shared/UserAvatar/UserAvatar";
import ImageEditor from "Components/ProfileSettings/GeneralSettings/ImageEditor/ImageEditor";
import ArrowIcon from "Icons/arrow-left.svg";
import styles from "./GeneralSettings.scss";

class GeneralSettings extends React.Component {
  state = {
    isImageEditModeOn: false,
  };

  toggleProfileImageEditor = () => {
    this.setState({
      isImageEditModeOn: !this.state.isImageEditModeOn,
    });
  };

  render = () => {
    const { userName, userId, userJoinDate, image, changeUserProfile } = this.props;
    const { isImageEditModeOn } = this.state;

    return (
      <div className={styles.container}>
        {isImageEditModeOn ? (
          <>
            <span onClick={this.toggleProfileImageEditor} className={styles.return_button}>
              <ArrowIcon />
            </span>
            <ImageEditor onSubmit={(image) => changeUserProfile(image)} />
          </>
        ) : (
          <div className={styles.info_container}>
            <p className={styles.caption}>Ваш аккаунт</p>
            <div className={styles.user_info_wrapper}>
              <div className={styles.user_info_row}>
                <span className={styles.label}>Фотокарточка</span>
                <span className={styles.value}>
                  <UserAvatar
                    imageSrc={image}
                    color={USER_AVATAR_COLOR.BLACK}
                    isEditable
                    onEditClick={() => this.toggleProfileImageEditor()}
                  />
                </span>
              </div>
              <div className={styles.user_info_row}>
                <span className={styles.label}>Имя</span>{" "}
                <span className={styles.value}>{userName}</span>
              </div>
              <div className={styles.user_info_row}>
                <span className={styles.label}>Персональный id</span>{" "}
                <span className={styles.value}>{userId}</span>
              </div>
              <div className={styles.user_info_row}>
                <span className={styles.label}>Дата создания профиля</span>{" "}
                <span className={styles.value}>{formatDateTime(userJoinDate)}</span>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  };
}

export default GeneralSettings;
