import React from "react";

import styles from "./SectionTitle.scss";
import Title from "Components/Shared/Title/Title";

const SectionTitle = ({ title, children }) => {
  return (
    <div className={styles.section_title__container}>
      <Title className={styles.section_title}>{title}</Title>
      {children}
    </div>
  );
};

export default SectionTitle;
