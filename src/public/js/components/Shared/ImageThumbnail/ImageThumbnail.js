import React, { Fragment } from "react";
import { default as pt } from "prop-types";
import LoaderBubbles, { BUBBLES_COLOR, BUBBLES_TYPE } from "../LoaderBubbles/LoaderBubbles";
import styles from "./ImageThumbnail.scss";

const ImageThumbnail = (props) => {
  const {
    imageSrc,
    title,
    author,
    customClassName,
    tabIndex,
    onOpen,
    showRemoveButton,
    onRemove,
    isLoading
  } = props;

  const getThumbnail = () => {
    if (isLoading) {
      return <LoaderBubbles color={BUBBLES_COLOR.BLACK} type={BUBBLES_TYPE.CIRCLE} />;
    }

    if (imageSrc) {
      return (
        <div tabIndex={tabIndex || 0} className={styles.image_wrapper}>
          {getShadow()}
          <img alt={"img"} src={imageSrc} />
        </div>
      );
    }

    return "No Image :(";
  };

  const getShadow = () => {
    if (!title) {
      return null;
    }

    return (
      <Fragment>
        <div className={styles.shadow} />
        <div className={styles.image_info}>
          {showRemoveButton && getRemoveButton()}
          <span className={styles.title}>{title}</span>
          <p>
            by<a className={styles.author}>{author}</a>
          </p>
        </div>
      </Fragment>
    );
  };

  const getRemoveButton = () => {
    return (
      <div onClick={(e) => handleRemoveClick(e)} className={styles.remove_button__aligner}>
        <div className={styles.remove_button} />
      </div>
    );
  };

  const handleRemoveClick = (e) => {
    e.stopPropagation();
    onRemove && onRemove();
  };

  return (
    <div onClick={() => onOpen()} className={`${styles.imageThumbnail} ${customClassName}`}>
      {getThumbnail(imageSrc, isLoading)}
    </div>
  );
};

export default ImageThumbnail;

ImageThumbnail.propTypes = {
  imageSrc: pt.string,
  customClassName: pt.string,
  tabIndex: pt.number,
  title: pt.string,
  author: pt.string,
  onOpen: pt.func,
  isLoading: pt.bool,
  showRemoveButton: pt.bool,
  onRemove: pt.func
};

ImageThumbnail.defaultProps = {
  imageSrc: "",
  customClassName: "",
  tabIndex: 0,
  title: "",
  author: "",
  onOpen: () => {},
  isLoading: false,
  showRemoveButton: false,
  onRemove: () => {}
};
