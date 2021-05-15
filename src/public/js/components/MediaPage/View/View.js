import React from "react";
import AddImageIcon from "../../../../static/icons/add.svg";
import ImageThumbnail from "../../Shared/ImageThumbnail/ImageThumbnail";
import ImageUploader from "../ImageUploader/ImageUploader";
import ArticleViewer from "../../../containers/MediaPage/ArticleViewer/ArticleViewer";
import LoaderBubbles, {
  BUBBLES_COLOR,
  BUBBLES_TYPE
} from "../../Shared/LoaderBubbles/LoaderBubbles";
import FullScreenLoader from "../../Shared/FullscreenLoader/FullScreenLoader";
import styles from "./View.scss";

export default class View extends React.Component {
  componentDidMount = () => {
    this.props.fetchMedia({
      pageNumber: 1
    });
  };

  componentWillUnmount = () => {
    this.props.cleanMediaData();
  };

  imagesContainerRef = React.createRef();

  getMediaItemLoader = () => {
    return (
      <div className={`${styles.media_item} ${styles.loader_wrapper}`}>
        <LoaderBubbles color={BUBBLES_COLOR.WHITE} type={BUBBLES_TYPE.CIRCLE} />
      </div>
    );
  };

  getAddButton = () => {
    return (
      <div
        tabIndex={0}
        onClick={() => this.onAddButtonClick()}
        className={`${styles.media_item} ${styles.addButton}`}
      >
        <AddImageIcon />
      </div>
    );
  };

  showCommentsModal = (item) => {
    const { showModal } = this.props;
    showModal({
      bodyContent: <ArticleViewer fileId={item.id} imageSrc={item.file} />
    });
  };

  onAddButtonClick = () => {
    const { showModal } = this.props;
    showModal({
      bodyContent: this.getImageUploader()
    });
  };

  getImageUploader = () => {
    const { uploadImage, isUserAuthorized, closeModal } = this.props;
    return (
      <ImageUploader
        withTitle
        isUserAuthorized={isUserAuthorized}
        onClose={closeModal}
        onSubmit={(file) => {
          this.scrollToTop();
          uploadImage(file);
        }}
      />
    );
  };

  scrollToTop = () => {
    if (this.imagesContainerRef && this.imagesContainerRef.current) {
      this.imagesContainerRef.current.scroll({
        top: 0,
        left: 0,
        behavior: "smooth"
      });
    }
  };

  handleScroll = ({ target: imageContainer }) => {
    const {
      fetchMedia,
      mediaData: { currentPage, results, allMediaFilesCount, isLoading }
    } = this.props;

    if (imageContainer && this.isBottomReached(imageContainer)) {
      if (!isLoading && results.length < allMediaFilesCount) {
        fetchMedia({
          pageNumber: currentPage + 1
        });
      }
    }
  };

  isBottomReached = (el) => el.scrollHeight - el.scrollTop <= el.clientHeight + 30;

  getMediaFiles = (results, isUserAuthorized, isLoading) => {

    return (
      <div
        ref={this.imagesContainerRef}
        onScroll={(e) => this.handleScroll(e)}
        className={styles.image_container}
      >
        {this.getAddButton()}
        {results.map((item) => (
          <ImageThumbnail
            key={item.id}
            customClassName={styles.media_item}
            title={item.title}
            author={item.author}
            imageSrc={item.file}
            onOpen={() => this.showCommentsModal(item)}
            showRemoveButton={isUserAuthorized}
            onRemove={() => this.props.deleteMediaFile(item.id)}
          />
        ))}
        {isLoading && this.getMediaItemLoader()}
      </div>
    );
  };

  getBackgroundProcessLoader = (isImageUploading, isInitialLoad) => {
    if (isImageUploading || isInitialLoad) {
      return <FullScreenLoader showInsideCurrentComponent />;
    }
  };

  render = () => {
    const {
      mediaData: { isLoading, isInitialLoad, results },
      isUserAuthorized,
      imageUploader
    } = this.props;
    const isImageUploading = imageUploader.isLoading;

    return (
      <div className={styles.media_page_container}>
        {this.getBackgroundProcessLoader(isImageUploading, isInitialLoad)}
        {isInitialLoad || this.getMediaFiles(results, isUserAuthorized, isLoading)}
      </div>
    );
  };
}
