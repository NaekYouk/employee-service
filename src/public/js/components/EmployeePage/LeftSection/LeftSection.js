import React from "react";
import Title from "Components/Shared/Title/Title";

import styles from "./LeftSection.scss";
import Button from "Components/Shared/Button/Button";
import ProfileEdit from "Containers/ProfileEdit/ProfileEdit";

const LeftSection = ({ id, showModal, name, surname, sex, role }) => {
  const handleEditClick = () => {
    showModal({
      bodyContent: <ProfileEdit userId={id} />,
    });
  };

  return (
    <div className={styles.left_section}>
      <img src={"https://place-hold.it/150"} width={150} />
      <Title className={styles.left_section__title_sex}>-{sex}-</Title>
      <Title className={styles.left_section__title}>{name}</Title>
      <Title className={styles.left_section__title}>{surname}</Title>
      {role === "admin" && (
        <Button additionalClassNames={styles.left_section__button} onClick={handleEditClick}>
          Edit Profile
        </Button>
      )}
    </div>
  );
};

export default LeftSection;
