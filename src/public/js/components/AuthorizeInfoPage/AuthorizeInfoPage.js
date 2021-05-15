import React from "react";

import styles from "./AuthorizeInfoPage.scss";
import MenuItemHeader from "Components/ProfileSettings/MenuItemHeader/MenuItemHeader";

const AuthorizeInfoPage = ({ login, password }) => {
  return (
    <div className={styles.authorize_info_page}>
      <MenuItemHeader>Profile created successfully</MenuItemHeader>
      <h3 className={styles.authorize_info_page__label}>Login: {login}</h3>
      <h3 className={styles.authorize_info_page__label}>Password: {password}</h3>
    </div>
  );
};

export default AuthorizeInfoPage;
