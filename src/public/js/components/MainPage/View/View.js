import React from "react";
import styles from "./View.scss";
import SearchForm from "Containers/SearchForm/SearchFrom";

const View = () => {
  return (
    <div className={styles.main_page_container}>
      <SearchForm />
    </div>
  );
};

export default View;
