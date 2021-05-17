import React from "react";
import Title from "Components/Shared/Title/Title";

import styles from "./LeftSection.scss";
import Button from "Components/Shared/Button/Button";
import ProfileEdit from "Containers/ProfileEdit/ProfileEdit";
import { isUserAdmin } from "Utils/user-helpers/user-helpers";

const LeftSection = ({ id, showModal, name, surname, sex, role, image }) => {
  const handleEditClick = () => {
    showModal({
      bodyContent: <ProfileEdit userId={id} />,
    });
  };

  return (
    <div className={styles.left_section}>
      <div className={styles.left_section__img_wrapper}>
        <img className={styles.left_section__img} src={image} />
      </div>
      <Title className={styles.left_section__title_sex}>-{sex}-</Title>
      <Title className={styles.left_section__title}>{name}</Title>
      <Title className={styles.left_section__title}>{surname}</Title>
      {isUserAdmin(role) && (
        <Button additionalClassNames={styles.left_section__button} onClick={handleEditClick}>
          Edit Profile
        </Button>
      )}
    </div>
  );
};

export default LeftSection;
