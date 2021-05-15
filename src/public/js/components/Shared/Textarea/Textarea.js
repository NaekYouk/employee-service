import React from "react";
import { default as pt } from "prop-types";
import styles from "./Textarea.scss";

const TEXTAREA_TYPES = {
  DEFAULT: "default",
  POST_BODY: "post"
};

class Textarea extends React.Component {
  render = () => {
    const {
      style,
      onChange,
      type,
      value,
      placeholder,
      isInvalid,
      isResizableVertically,
      isResizableHorizontally,
      isFocusedByDefault
    } = this.props;

    return (
      <textarea
        style={style}
        autoFocus={isFocusedByDefault}
        className={getTextareaClassname(
          type,
          isInvalid,
          isResizableVertically,
          isResizableHorizontally
        )}
        onChange={(e) => onChange(e)}
        placeholder={placeholder}
        value={value}
      />
    );
  };
}

export default Textarea;

const getTextareaClassname = (type, isInvalid, isResizableVertically, isResizableHorizontally) => {
  let className = `${styles.default} `;

  if (type) {
    const selectedType = Object.values(TEXTAREA_TYPES).find((item) => item === type);
    if (selectedType) {
      className = `${styles[selectedType]} `;
    }
  }

  if (isInvalid) {
    className += `${styles.invalid} `;
  }

  if (isResizableVertically) {
    className += `${styles.resizableVertically} `;
  }

  if (isResizableHorizontally) {
    className += `${styles.resizableHorizontally} `;
  }

  return className;
};

Textarea.propTypes = {
  style: pt.object,
  value: pt.string,
  type: pt.string,
  isInvalid: pt.bool,
  isFocusedByDefault: pt.bool,
  placeholder: pt.string,
  isResizableVertically: pt.bool,
  isResizableHorizontally: pt.bool,
  onChange: pt.func
};

Textarea.defaultProps = {
  style: {},
  value: "",
  type: TEXTAREA_TYPES.DEFAULT,
  isInvalid: false,
  isFocusedByDefault: false,
  placeholder: "...",
  isResizableVertically: false,
  isResizableHorizontally: false,
  onChange: () => {}
};
