import React from "react";
import { connect } from "react-redux";
import { closeModal } from "../../../actions/Shared/modalActions";
import styles from "./Modal.scss";

class Modal extends React.PureComponent {
  state = {
    isOpen: false,
    containerAnimation: "",
  };

  componentDidMount() {
    this.setModalCloseHandler();
  }

  componentDidUpdate(prevProps) {
    if (this.props.isOpen !== prevProps.isOpen) {
      if (this.props.isOpen) {
        this.showModal();
      } else {
        this.hideModal();
      }
    }
  }

  modalBodyRef = React.createRef();
  modalWrapperRef = React.createRef();

  setModalCloseHandler = () => {
    if (this.modalWrapperRef.current) {
      this.modalWrapperRef.current.addEventListener("click", (e) => {
        this.handleClickOutside(e);
      });
    }
  };

  isBodyClicked = (e) => {
    if (this.modalBodyRef.current && this.modalBodyRef.current.contains(e.target)) {
      return true;
    }
    return false;
  };

  handleClickOutside = (e) => {
    if (this.isBodyClicked(e)) return;
    if (!this.state.isOpen) return;

    e.stopPropagation;
    this.props.closeModal();
  };

  showModal = () => {
    this.setState({
      isOpen: this.props.isOpen,
      containerAnimation: styles.fade_in_modal,
      bodyAnimation: styles.fade_in_modal_children,
    });
  };

  hideModal = (e) => {
    if (this.props.onClose) {
      this.props.onClose();
    }

    this.setState(
      {
        containerAnimation: styles.fade_out_modal,
        bodyAnimation: styles.fade_out_modal_children,
      },
      () => {
        setTimeout(() => {
          this.setState({
            isOpen: this.props.isOpen,
          });
        }, 700);
      }
    );
  };

  getModalBody = () => {
    if (!this.state.isOpen) return null;

    return (
      <div ref={this.modalBodyRef} className={`${styles.modal_body} ${this.state.bodyAnimation}`}>
        {this.props.bodyContent}
      </div>
    );
  };

  render() {
    return (
      <div
        ref={this.modalWrapperRef}
        className={`${styles.modal_container} ${this.state.containerAnimation}`}
      >
        {this.getModalBody()}
      </div>
    );
  }
}

const mapStateToProps = ({ ModalState }, ownProps) => {
  return ModalState;
};

const mapDispatchToProps = (dispatch) => ({
  closeModal: () => {
    dispatch(closeModal());
  },
});

export default connect(mapStateToProps, mapDispatchToProps, null)(Modal);
