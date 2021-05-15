import React from "react";
import { default as pt } from "prop-types";
import EditIcon from "../../../../static/icons/edit.svg";
import styles from "./Button.scss";

export const BUTTON_TYPES = {
  DEFAULT: "default",
  DEFAULT_SOLID: "solid",
  SECONDARY_BUTTON: "secondaryButton",
  TRANSPARENT: "transparent",
  TRANSPARENT_UNDERLINED: "transparentUnderlined",
  TRANSPARENT_UNDERLINED_WHITE: "transparentUnderlined__white",
  VIEW_OPTION: "viewOption",
  VIEW_OPTION_CURRENT: "viewOption__current",
  ICON_BUTTON: "iconButton",
  SEARCH: "search",
  EDIT: "edit",
  DELETE: "delete",
};

const getIcon = (icon, type) => {
  if (type === BUTTON_TYPES.ICON_BUTTON) {
    return <span className={styles.icon}>{icon}</span>;
  }

  if (type === BUTTON_TYPES.EDIT) {
    return (
      <span className={styles.icon}>
        <EditIcon />
      </span>
    );
  }
};

const onButtonClick = (e, handler) => {
  handler && handler(e);
};

const getClassName = (type, isHighlighted, isDisabled) => {
  return `
    ${styles[`button__${type || BUTTON_TYPES.DEFAULT}${isHighlighted ? "_highlighted" : ""}`]}
    ${isDisabled ? styles.disabled : ""}
  `;
};

const Button = ({
  children,
  onClick,
  type,
  icon,
  style,
  isHighlighted,
  isDisabled,
  tabIndex,
  additionalClassNames,
}) => (
  <button
    tabIndex={tabIndex || 0}
    className={`${getClassName(type, isHighlighted, isDisabled)} ${additionalClassNames}`}
    style={style || {}}
    onClick={(e) => (isDisabled ? null : onButtonClick(e, onClick))}
  >
    {getIcon(icon, type)}
    {children && <span>{children}</span>}
  </button>
);

export default Button;

Button.propTypes = {
  onClick: pt.func,
  type: pt.oneOf(Object.values(BUTTON_TYPES)),
  additionalClassNames: pt.string,
  style: pt.object,
  tabIndex: pt.number,
  children: pt.any,
  isHighlighted: pt.bool,
  isDisabled: pt.bool,
  icon: pt.any,
};

Button.defaultProps = {
  onClick: () => {},
  type: BUTTON_TYPES.DEFAULT,
  additionalClassNames: "",
  style: {},
  tabIndex: 0,
  children: null,
  isHighlighted: false,
  isDisabled: false,
  icon: pt.any,
};
