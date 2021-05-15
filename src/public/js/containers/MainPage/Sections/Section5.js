import { connect } from "react-redux";
import { fetchNews } from "Actions/MainPage/mainPageActions";
import { Section5 } from "Components/MainPage/Sections";
import { topicViewPath } from "Utils/path-helpers/communityPagePaths";
import { redirectTo } from "Actions/Shared/historyActions";

const mapStateToProps = ({ MainPageState }) => ({
  newsData: MainPageState.newsData
});

const mapDispatchToProps = (dispatch) => ({
  fetchNews: (params) => {
    dispatch(fetchNews(params));
  },

  redirectTo: (path) => {
    dispatch(redirectTo(path));
  }
});

const mergeProps = (stateProps, { fetchNews, redirectTo, ...dispatchProps }, ownProps) => ({
  ...stateProps,
  ...dispatchProps,
  ...ownProps,

  fetchNews: (params) => {
    fetchNews({
      topicsPerPage: stateProps.newsData.newsPerPageNumber,
      pageNumber: 1,
      ...params
    });
  },

  openNewsTopic: (topicId) => {
    redirectTo(topicViewPath("news", topicId));
  }
});

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(Section5);
