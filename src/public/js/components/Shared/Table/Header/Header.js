import React from "react";
import styles from "./Header.scss";

export default class Header extends React.Component {
  getColumnClassname = ({ width, textAlign }) => {
    let className = styles.column;
    if (width) {
      className += ` ${styles[width]}`;
    } else {
      className += ` ${styles.medium}`;
    }
    if (textAlign) {
      className += ` ${styles[`${textAlign}Align`]}`;
    }
    return className;
  };

  render = () => {
    const { config } = this.props;

    return (
      <div className={styles.header}>
        {config.map((column, i) => {
          return (
            <div key={i} className={this.getColumnClassname(column)}>
              {column.label}
            </div>
          );
        })}
      </div>
    );
  };
}
