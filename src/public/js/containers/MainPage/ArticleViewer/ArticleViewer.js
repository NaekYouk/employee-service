import { connect } from "react-redux";
import { fetchComments, uploadComment } from "../../../actions/MainPage/mainPageActions";
import ArticleViewer from "../../../components/Shared/ArticleViewer/ArticleViewer";
import { closeModal } from "../../../actions/Shared/modalActions";

const mapStateToProps = ({ MainPageState: { mediaData }, AccountState }, { fileId }) => {
  const results = mediaData.results.find((item) => item.id === fileId);
  return {
    comments: !results
      ? {
        isLoading: false,
        results: []
      }
      : results.comments,
    isUserAuthorized: !!AccountState.userId
  };
};

const mapDispatchToProps = (dispatch, { fileId }) => ({
  fetchComments: (params) => {
    dispatch(fetchComments(fileId, params));
  },

  onCloseButtonClick: () => {
    dispatch(closeModal());
  },

  onSubmitButtonClick: (commentBody) => {
    dispatch(
      uploadComment(fileId, {
        creationDate: new Date(),
        commentBody
      })
    );
  }
});

const mergeProps = (stateProps, dispatchProps, ownProps) => ({
  ...stateProps,
  ...dispatchProps,
  ...ownProps
});

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(ArticleViewer);
