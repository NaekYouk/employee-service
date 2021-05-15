import React from "react";
import styles from "./MenuItemHeader.scss";

const MenuItemHeader = ({ children }) => {
  return (
    <h4 className={styles.container}>
      {children}
    </h4>
  );
};

export default MenuItemHeader;
