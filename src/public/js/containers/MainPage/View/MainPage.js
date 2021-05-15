import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import View from "../../../components/MainPage/View/View";

const mapStateToProps = ({ MainPageState }, history) => ({
  history,
  mediaData: MainPageState.mediaData,
  newsData: MainPageState.newsData,
});

export default withRouter(connect(mapStateToProps, null)(View));
