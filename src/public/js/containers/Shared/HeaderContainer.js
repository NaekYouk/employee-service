import { connect } from "react-redux";
import Header from "../../components/Shared/Header/Header";

const mapStateToProps = ({ ProfileModalState }) => ({
  role: ProfileModalState.userAccess,
});

export default connect(mapStateToProps)(Header);
