export const tryParseError = (error) => {
  const result = !!error && !!error.response && error.response.data;

  if (result instanceof Object) {
    return result;
  }

  return null;
};

export const getErrorStatus = (error) => {
  const response = !!error && !!error.response && error.response;

  if (response instanceof Object) {
    return response.status ? response.status : "Unknown";
  }

  return null;
};
