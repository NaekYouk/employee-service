import React from "react";
import Title from "Components/Shared/Title/Title";

import styles from "./LeftSection.scss";
import Button from "Components/Shared/Button/Button";
import ProfileEdit from "Containers/ProfileEdit/ProfileEdit";
import { isUserAdmin } from "Utils/user-helpers/user-helpers";
import ImageEditor from "Components/ProfileSettings/GeneralSettings/ImageEditor/ImageEditor";

const LeftSection = ({
  id,
  showModal,
  name,
  surname,
  sex,
  role,
  image,
  changeUserProfileImage,
}) => {
  const handleEditClick = () => {
    showModal({
      bodyContent: <ProfileEdit userId={id} />,
    });
  };

  const onEditClick = () => {
    showModal({
      bodyContent: <ImageEditor onSubmit={(image) => changeUserProfileImage(id, image)} />,
    });
  };

  return (
    <div className={styles.left_section}>
      <div className={styles.left_section__img_wrapper}>
        {isUserAdmin(role) && (
          <a className={styles.edit_link} onClick={onEditClick}>
            Изм.
          </a>
        )}
        <img className={styles.left_section__img} src={image || "https://place-hold.it/150"} />
      </div>
      <Title className={styles.left_section__title_sex}>-{sex}-</Title>
      <Title className={styles.left_section__title}>{name}</Title>
      <Title className={styles.left_section__title}>{surname}</Title>
      {isUserAdmin(role) && (
        <Button additionalClassNames={styles.left_section__button} onClick={handleEditClick}>
          Изм.Профиль
        </Button>
      )}
    </div>
  );
};

export default LeftSection;
