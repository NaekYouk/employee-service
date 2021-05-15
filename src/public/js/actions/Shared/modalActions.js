import { SHOW_MODAL, CLOSE_MODAL } from "Reducers/Shared/modalReducer";

export const showModal = (data) => ({
  type: SHOW_MODAL,
  data
});

export const closeModal = () => ({
  type: CLOSE_MODAL
});
