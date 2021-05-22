import React from "react";
import { default as pt } from "prop-types";
import UserIcon from "../../../../static/icons/account_circle.svg";
import styles from "./UserAvatar.scss";

export const USER_AVATAR_COLOR = {
  BLACK: "black",
  GRAY: "gray",
  WHITE: "white"
};

const UserAvatar = ({ color, imageSrc, withoutBorder, isEditable, onEditClick }) => {
  const className = `
    ${styles.userAvatar}
    ${color ? styles[color] : styles[USER_AVATAR_COLOR.GRAY]}
    ${withoutBorder ? styles.borderless : ""}
  `;

  return (
    <div className={styles.container}>
      {isEditable && <a className={styles.edit_link} onClick={onEditClick}>
        Изм.
      </a>}
      {isEditable && <div className={styles.shadow}/>}
      <div className={className}>
        {imageSrc ? <img alt={""} src={imageSrc} /> : <UserIcon />}
      </div>
    </div>
  );
};

export default UserAvatar;

UserAvatar.propTypes = {
  color: pt.oneOf(Object.values(USER_AVATAR_COLOR)),
  imageSrc: pt.string,
  withoutBorder: pt.bool,
  isEditable: pt.bool,
  onEditClick: pt.func
};

UserAvatar.defaultProps = {
  color: USER_AVATAR_COLOR.GRAY,
  imageSrc: "",
  withoutBorder: false,
  isEditable: false,
  onEditClick: null
};
