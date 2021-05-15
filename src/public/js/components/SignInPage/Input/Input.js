import React from "react";
import { default as pt } from "prop-types";
import Input from "../../Shared/Input/Input";
import styles from "../SignInPage.scss";

const FormInput = ({ title, ...props }) => (
  <div className={styles.input_wrapper}>
    {title && <p className={styles.first_paragraph}>{title}</p>}
    <Input {...props} />
  </div>
);

export default FormInput;

FormInput.propTypes = {
  title: pt.string,
  autoComplete: pt.string,
  placeholder: pt.string,
  type: pt.string,
  onChange: pt.func,
  isFocusedByDefault: pt.bool
};

FormInput.defaultProps = {
  title: "",
  autoComplete: "on",
  placeholder: "",
  type: "text",
  onChange: () => {},
  isFocusedByDefault: false
};
