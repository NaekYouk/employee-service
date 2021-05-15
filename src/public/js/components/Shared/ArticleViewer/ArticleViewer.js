import React, { Fragment } from "react";
import { default as pt } from "prop-types";
import LoaderBubbles, {
  BUBBLES_COLOR,
  BUBBLES_TYPE
} from "Components/Shared/LoaderBubbles/LoaderBubbles";
import { formatDateTime } from "Utils/date-helpers/date-helpers";
import ZoomInIcon from "Icons/increase-icon.svg";
import Textarea from "Components/Shared/Textarea/Textarea";
import Button, { BUTTON_TYPES } from "Components/Shared/Button/Button";
import { Link } from "react-router-dom";
import { pathToSignInPage } from "Utils/path-helpers/routerPaths";
import styles from "./ArticleViewer.scss";

export default class ArticleViewer extends React.Component {
  state = {
    commentBody: "",
    isCommentBodyInvalid: false
  };

  componentDidMount = () => {
    this.props.fetchComments();
  };

  imageRef = React.createRef();

  getLoader = () => {
    return (
      <div className={styles.loader__wrapper}>
        <LoaderBubbles type={BUBBLES_TYPE.CIRCLE} color={BUBBLES_COLOR.WHITE} />
      </div>
    );
  };

  getComments = (comments) => {
    if (!comments.length) {
      return <div className={styles.comment__container}>No comments yet :(</div>;
    }

    return comments.map((item, i) => (
      <div className={styles.comment__container} key={i}>
        <div className={styles.comment__wrapper}>
          <div className={styles.commentBody}>{item.body}</div>
          <div className={styles.imageInfo__wrapper}>
            <p className={styles.commentAuthor}>
              by <a href={"#"}>{item.author}</a>
            </p>
            <p className={styles.commentCreationDate}>{formatDateTime(item.creationDate)}</p>
          </div>
        </div>
        <div className={styles.commentNumber}>#{i + 1}</div>
      </div>
    ));
  };

  getCommentEditor = () => {
    const { onCloseButtonClick, onSubmitButtonClick, isUserAuthorized } = this.props;
    const { commentBody, isCommentBodyInvalid } = this.state;

    return (
      <div className={styles.commentEditor__container}>
        {!isUserAuthorized ? (
          <div className={styles.notAuthorized}>
            <h2>Only authorized users can leave comments</h2>
            <p className={styles.link__wrapper}>
              You can sign in
              <Link onClick={onCloseButtonClick} to={pathToSignInPage()}>
                here
              </Link>
            </p>
          </div>
        ) : (
          <Fragment>
            <Textarea
              id={"comment-textarea"}
              style={{
                width: "100%"
              }}
              isFocusedByDefault
              value={commentBody}
              onChange={(e) => this.onCommentBodyChange(e)}
              isInvalid={isCommentBodyInvalid}
              placeholder={"#awesome_comment"}
            />
            <div className={styles.commentEditor__buttonWrapper}>
              <div className={styles.commentEditor__closeButtonWrapper}>
                <Button
                  id={"comment-close-button"}
                  tabIndex={0}
                  onClick={onCloseButtonClick}
                  type={BUTTON_TYPES.TRANSPARENT}
                >
                  Close
                </Button>
              </div>
              <Button
                id={"comment-submit-button"}
                tabIndex={0}
                onClick={() => this.onCommentSubmitButtonClick(commentBody, onSubmitButtonClick)}
                type={BUTTON_TYPES.DEFAULT_SOLID}
              >
                Submit
              </Button>
            </div>
          </Fragment>
        )}
      </div>
    );
  };

  onCommentBodyChange = (e) => {
    this.setState({
      commentBody: e.target.value,
      isCommentBodyInvalid: false
    });
  };

  onCommentSubmitButtonClick = (commentBody, handler) => {
    if (commentBody) {
      this.setState(
        {
          commentBody: ""
        },
        () => handler && handler(commentBody)
      );
    } else {
      this.setState({
        isCommentBodyInvalid: true
      });
    }
  };

  getCommentsMaxHeight = () => {
    if (this.imageRef && this.imageRef.current) {
      return `${this.imageRef.current.offsetHeight}px`;
    }
  };

  render = () => {
    const {
      imageSrc,
      comments: { isLoading, results }
    } = this.props;
    return (
      <div className={styles.articleViewer__container}>
        <div className={styles.horizontalWrapper}>
          <a target="_blank" href={imageSrc} className={styles.imageSection}>
            <div className={styles.zoomShadow}>
              <ZoomInIcon />
            </div>
            <img ref={this.imageRef} src={imageSrc} />
          </a>
          <div
            style={{ maxHeight: this.getCommentsMaxHeight() }}
            className={styles.commentsSection}
          >
            <div className={styles.caption__wrapper}>
              <p className={styles.caption}>Comments</p>
            </div>
            {isLoading ? this.getLoader() : this.getComments(results)}
          </div>
        </div>
        <div className={styles.verticalWrapper}>{this.getCommentEditor()}</div>
      </div>
    );
  };
}

ArticleViewer.propTypes = {
  fileId: pt.oneOfType([pt.string, pt.number]),
  imageSrc: pt.string,
  fetchComments: pt.func,
  comments: pt.shape({
    results: pt.arrayOf(
      pt.shape({
        body: pt.string,
        author: pt.string,
        creationDate: pt.string
      })
    ),
    isLoading: pt.bool
  }),
  isUserAuthorized: pt.bool,
  onSubmitButtonClick: pt.func,
  onCloseButtonClick: pt.func
};

ArticleViewer.defaultProps = {
  fileId: null,
  imageSrc: "",
  fetchComments: () => {},
  comments: {
    results: [],
    isLoading: false
  },
  isUserAuthorized: false,
  onSubmitButtonClick: () => {},
  onCloseButtonClick: () => {}
};
