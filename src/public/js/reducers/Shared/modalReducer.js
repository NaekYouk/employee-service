export const SHOW_MODAL = "Components/Shared/SHOW_MODAL";
export const CLOSE_MODAL = "Components/Shared/CLOSE_MODAL";

const initialState = {
  isOpen: false,
  bodyContent: null
};

const ModalState = (state = initialState, { data, type } = {}) => {
  switch (type) {

    case SHOW_MODAL:
      return {
        ...state,
        bodyContent: data ? data.bodyContent : initialState.bodyContent,
        isOpen: true
      };

    case CLOSE_MODAL:
      return {
        ...state,
        isOpen: false
      };

    default:
      return state;

  }
};

export default ModalState;
