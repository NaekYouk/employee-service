import React from "react";
import styles from "./MenuItemLoader.scss";
import LoaderBubbles, { BUBBLES_COLOR, BUBBLES_TYPE } from "Components/Shared/LoaderBubbles/LoaderBubbles";

const MenuItemLoader = () => {
  return (
    <div className={styles.container}>
      <LoaderBubbles type={BUBBLES_TYPE.LINE_OF_CIRCLES} color={BUBBLES_COLOR.BLACK}/>
    </div>
  );
};

export default MenuItemLoader;
