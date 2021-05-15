import { connect } from "react-redux";
import { fetchNews } from "Actions/MainPage/mainPageActions";
import { Section4 } from "Components/MainPage/Sections";

const mapStateToProps = ({ MainPageState }) => ({
  newsData: MainPageState.newsData
});

const mapDispatchToProps = (dispatch) => ({
  fetchNews: (params) => {
    dispatch(fetchNews(params));
  }
});

const mergeProps = ({ newsData, ...stateProps }, { fetchNews, ...dispatchProps }, ownProps) => ({
  ...stateProps,
  ...dispatchProps,
  ...ownProps,
  newsData,

  fetchNews: (params) => {
    fetchNews({
      newsNumber: newsData.newsPerPageNumber,
      ...params
    });
  }
});

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(Section4);
