import React from "react";
import { default as pt } from "prop-types";
import styles from "./Input.scss";

export const INPUT_TYPES = {
  DEFAULT: "default",
  TOPIC_TITLE: "topic_title"
};

const getInputStyle = (type) => {
  if (!Object.values(INPUT_TYPES).find((value) => value === type)) {
    return INPUT_TYPES.DEFAULT;
  }
  return type;
};

class Input extends React.PureComponent {
  render() {
    const {
      name,
      type,
      placeholder,
      isInvalid,
      onChange,
      onFocus,
      onBlur,
      onKeyDown,
      customClassName,
      isFocusedByDefault,
      ...props
    } = this.props;

    const className = `
      ${styles[`input_${getInputStyle(name)}`]}
      ${isInvalid ? styles.invalid : ""}
    `;

    return (
      <input
        type={type}
        autoFocus={isFocusedByDefault}
        placeholder={placeholder}
        onKeyDown={(e) => onKeyDown(e)}
        onFocus={(e) => onFocus(e)}
        onBlur={(e) => onBlur(e)}
        className={`${className} ${customClassName}`}
        onChange={(e) => onChange(e.target.value)}
        {...props}
      />
    );
  }
}

export default Input;

Input.propTypes = {
  name: pt.string,
  type: pt.string,
  isInvalid: pt.bool,
  isFocusedByDefault: pt.bool,
  placeholder: pt.string,
  customClassName: pt.string,
  onChange: pt.func,
  onFocus: pt.func,
  onBlur: pt.func,
  onKeyDown: pt.func
};

Input.defaultProps = {
  name: INPUT_TYPES.DEFAULT,
  type: "text",
  isInvalid: false,
  isFocusedByDefault: false,
  placeholder: "...",
  customClassName: "",
  onChange: () => {},
  onFocus: () => {},
  onBlur: () => {},
  onKeyDown: () => {}
};
