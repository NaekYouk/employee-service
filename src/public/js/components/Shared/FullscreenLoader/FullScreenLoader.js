import React from "react";
import { default as pt } from "prop-types";
import LoaderBubbles, { BUBBLES_COLOR, BUBBLES_TYPE } from "../LoaderBubbles/LoaderBubbles";
import ReactDOM from "react-dom";
import styles from "./FullScreenLoader.scss";

class FullScreenLoader extends React.PureComponent {
  state = {
    showLoader: false
  };

  loaderRef = React.createRef();

  componentDidMount = () => {
    setTimeout(() => {
      this.setState({ showLoader: true });
    }, 100);
  };

  getLoaderClassName = () => {
    const { showLoader } = this.state;
    const { showInsideCurrentComponent } = this.props;

    let className = styles.fullscreen_loader;

    if (showLoader) {
      className = styles.fullscreen_loader_visible;
    }

    if (showInsideCurrentComponent) {
      className = `${styles.fullscreen_loader} ${styles.local}`;

      if (showLoader) {
        className = `${styles.fullscreen_loader_visible} ${styles.local}`;
      }
    }

    return className;
  };

  getLoader = () => (
    <div className={this.getLoaderClassName()}>
      <LoaderBubbles type={BUBBLES_TYPE.LINE_OF_CIRCLES} color={BUBBLES_COLOR.YELLOW} />
    </div>
  );

  render = () => {
    const container = document.getElementById("root");
    if (this.props.showInsideCurrentComponent) {
      return this.getLoader();
    }
    return ReactDOM.createPortal(this.getLoader(), container);
  };
}

export default FullScreenLoader;

FullScreenLoader.defaultProps = {
  showInsideCurrentComponent: false
};

FullScreenLoader.propTypes = {
  showInsideCurrentComponent: pt.bool
};
