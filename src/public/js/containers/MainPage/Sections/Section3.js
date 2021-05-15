import { connect } from "react-redux";
import { fetchMedia } from "Actions/MainPage/mainPageActions";
import { Section3 } from "Components/MainPage/Sections";
import { showModal } from "Actions/Shared/modalActions";

const mapStateToProps = ({ MainPageState }) => ({
  mediaData: MainPageState.mediaData
});

const mapDispatchToProps = (dispatch) => ({
  fetchMedia: (params) => {
    dispatch(fetchMedia(params));
  },

  showModal: (props) => {
    dispatch(showModal(props));
  }
});

const mergeProps = ({ mediaData, ...stateProps }, { fetchMedia, ...dispatchProps }, ownProps) => ({
  ...stateProps,
  ...dispatchProps,
  ...ownProps,
  mediaData,

  fetchMedia: (params) => {
    fetchMedia({
      mediaFilesNumber: mediaData.mediaFilesPerPageNumber,
      ...params
    });
  }
});

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(Section3);
