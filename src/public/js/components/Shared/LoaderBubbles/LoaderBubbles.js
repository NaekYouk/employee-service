import React from "react";
import { default as pt } from "prop-types";
import styles from "./LoaderBubbles.scss";

export const BUBBLES_TYPE = {
  CIRCLE: "circle",
  LINE_OF_CIRCLES: "line_of_circles"
};

export const BUBBLES_COLOR = {
  YELLOW: "yellow",
  BLACK: "black",
  WHITE: "white"
};

const LoaderBubbles = ({ type, color }) => {
  const bubblesType = type ? type : BUBBLES_TYPE.LINE_OF_CIRCLES;
  const bubblesColors = color ? color : BUBBLES_COLOR.YELLOW;
  const bubbleClassName = `${styles.bubble} ${styles[bubblesColors]}`;
  const bubblesCount = bubblesType === BUBBLES_TYPE.LINE_OF_CIRCLES ? 4 : 5;

  return (
    <div className={styles[bubblesType]}>
      {new Array(bubblesCount).fill().map((item, i) => (
        <div key={i} className={bubbleClassName} />
      ))}
    </div>
  );
};

export default LoaderBubbles;

LoaderBubbles.propTypes = {
  type: pt.string.isRequired,
  color: pt.string.isRequired
};

LoaderBubbles.defaultProps = {
  type: BUBBLES_TYPE.LINE_OF_CIRCLES,
  color: BUBBLES_COLOR.YELLOW
};
