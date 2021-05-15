import React from "react";
import styles from "./ImageEditor.scss";
import ImageUploader from "Components/MediaPage/ImageUploader/ImageUploader";

class ImageEditor extends React.Component {
  render = () => {
    return (
      <div className={styles.container}>
        <ImageUploader
          isUserAuthorized
          onSubmit={(file) => this.props.onSubmit(file)}
        />
      </div>
    );
  }
}

export default ImageEditor;
