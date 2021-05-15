import _isEqual from "lodash.isequal";

export const isEqual = (obj1, obj2) => {
  return _isEqual(obj1, obj2);
};

export const isEmpty = (obj) => !Object.values(obj).some((x) => x !== null && x !== "");
