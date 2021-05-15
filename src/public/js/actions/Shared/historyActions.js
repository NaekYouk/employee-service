export const redirectTo = (path) => (dispatch, getState, { history }) => {
  history.push(path);
};
