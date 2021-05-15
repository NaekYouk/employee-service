export const getQueryValueByKey = (location, key) => {
  return new URLSearchParams(location.search).get(key);
};
