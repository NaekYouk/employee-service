import React from "react";
import styles from "./View.scss";

export default class View extends React.Component {
  render = () => {
    return (
      <div className={styles.container}>
        <div className={styles.wrapper}>
          <h1 className={styles.title}>404</h1>
          <div className={styles.subtitle__wrapper}>
            <h2>Sorry, but requested page was not found :(</h2>
          </div>
        </div>
      </div>
    );
  };
}
