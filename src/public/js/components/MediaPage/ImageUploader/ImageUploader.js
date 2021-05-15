import React, { Fragment } from "react";
import AddImageIcon from "Icons/add-image.svg";
import Dropzone from "react-dropzone";
import ImageThumbnail from "Components/Shared/ImageThumbnail/ImageThumbnail";
import Button, { BUTTON_TYPES } from "Components/Shared/Button/Button";
import Input, { INPUT_TYPES } from "Components/Shared/Input/Input";
import { Link } from "react-router-dom";
import { pathToSignInPage } from "Utils/path-helpers/routerPaths";
import styles from "./ImageUploader.scss";

const ENTER_KEY_CODE = 13;

export default class ImageUploader extends React.Component {
  state = {
    formattedForDisplayImage: null,
    imageTitle: "",
    isTitleInvalid: false,
    isImageInvalid: false
  };

  getCurrentImage = (formattedForDisplayImage) => {
    return (
      <div
        tabIndex={0}
        onKeyDown={(e) => this.onRemoveImageOnEnterPress(e)}
        className={styles.image__wrapper}
      >
        <div className={styles.image__shadow} />
        <p onClick={() => this.removeCurrentImage()} className={styles.image__clearText}>
          Remove
        </p>
        <ImageThumbnail
          tabIndex={-1}
          imageSrc={formattedForDisplayImage}
          customClassName={styles.image}
        />
      </div>
    );
  };

  onRemoveImageOnEnterPress = (e) => {
    if (e.keyCode === ENTER_KEY_CODE) {
      this.removeCurrentImage();
    }
  };

  removeCurrentImage = () => {
    this.setState({ formattedForDisplayImage: null });
  };

  getDropzone = () => {
    const { isImageInvalid } = this.state;
    return (
      <Dropzone onDrop={(files) => this.onDrop(files)}>
        {({ getRootProps, getInputProps }) => (
          <section
            {...getRootProps()}
            className={`${styles.dropZone} ${isImageInvalid ? styles.invalid : ""}`}
          >
            <input {...getInputProps()} />
            <AddImageIcon className={styles.addIcon} />
          </section>
        )}
      </Dropzone>
    );
  };

  onDrop = (files) => {
    const base64Reader = new FileReader();
    base64Reader.onload = () =>
      this.setState({ formattedForDisplayImage: base64Reader.result, isImageInvalid: false });
    if (files.length > 1) {
      base64Reader.readAsDataURL(files[files.length - 1]);
    } else {
      base64Reader.readAsDataURL(files[0]);
    }
  };

  onSumbitButtonClick = (e, handler) => {
    const { withTitle, imageTitle, formattedForDisplayImage } = this.state;

    if (formattedForDisplayImage) {
      if (withTitle && imageTitle.length) {
        handler({
          imageTitle,
          image: formattedForDisplayImage
        });
      } else {
        handler({
          image: formattedForDisplayImage
        });
      }
    }

    if (!withTitle && !imageTitle.length) {
      this.setState({ isTitleInvalid: true });
    }

    if (!formattedForDisplayImage) {
      this.setState({ isImageInvalid: true });
    }
  };

  getInfoEditSection = (onSubmit) => {
    const { withTitle } = this.props;
    const { imageTitle, isTitleInvalid } = this.state;

    return (
      <Fragment>
        {withTitle && <p className={styles.caption}>Title</p>}
        <div className={styles.infoEditSection}>
          {withTitle && <div className={styles.input__wrapper}>
            <Input
              isInvalid={isTitleInvalid}
              value={imageTitle}
              onChange={(inputValue) => this.onInputChange(inputValue)}
              placeholder={"#Cool_title"}
              type={INPUT_TYPES.DEFAULT}
            />
          </div>}
          <div className={styles.submitButton__wrapper}>
            <Button
              style={{
                width: "100%"
              }}
              onClick={(e) => this.onSumbitButtonClick(e, onSubmit)}
              type={BUTTON_TYPES.DEFAULT_SOLID}
            >
              Submit
            </Button>
          </div>
        </div>
      </Fragment>
    );
  };

  onInputChange = (inputValue) => {
    this.setState({ imageTitle: inputValue, isTitleInvalid: false });
  };

  render = () => {
    const { onSubmit, onClose, isUserAuthorized } = this.props;
    const { formattedForDisplayImage } = this.state;
    return (
      <div className={styles.imageUploader__container}>
        {!isUserAuthorized ? (
          <div className={styles.notAuthorized}>
            <h2>Only authorized users can add images</h2>
            <p className={styles.link__wrapper}>
              You can sign in
              <Link onClick={onClose} to={pathToSignInPage()}>
                here
              </Link>
            </p>
          </div>
        ) : (
          <Fragment>
            <div className={styles.imageSection}>
              {formattedForDisplayImage
                ? this.getCurrentImage(formattedForDisplayImage)
                : this.getDropzone()}
            </div>
            {this.getInfoEditSection(onSubmit)}
          </Fragment>
        )}
      </div>
    );
  };
}
