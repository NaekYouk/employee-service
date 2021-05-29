import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import View from "../../../components/MainPage/View/View";

const mapStateToProps = (history) => ({
  history,
});

export default withRouter(connect(mapStateToProps, null)(View));
