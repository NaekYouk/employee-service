import React from "react";
import { default as pt } from "prop-types";
import styles from "./Title.scss";

export const TITLE_COLOR = {
  WHITE: "white",
  BLACK: "black"
};

const Title = ({ children, className, color, showDash, ...props }) => {
  return (
    <h1
      className={`
        ${styles.title} 
        ${color ? styles[color] : ""} 
        ${showDash ? styles.withDash : ""}
        ${className ? className : ""}
      `}
      {...props}
    >
      {children}
    </h1>
  );
};

export default Title;

Title.propTypes = {
  children: pt.any,
  className: pt.string,
  color: pt.string,
  showDash: pt.bool
};

Title.defaultProps = {
  children: null,
  className: "",
  color: TITLE_COLOR.BLACK,
  showDash: false
};
