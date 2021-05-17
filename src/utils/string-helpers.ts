import moment from "moment";

export const getSearchString = (searchString: any): string => {
  const parsedSearchString = `${searchString}`;
  return parsedSearchString.length ? parsedSearchString.toLowerCase() : "";
};

export const validateString = (string: string, errString: string): void => {
  const parsedString = `${string}`;
  if (!parsedString.length) {
    throw new Error(errString);
  }
};

export const isDate = (date) => {
  if (typeof date !== null && typeof date !== undefined) {
    const formattedDate = moment(date);
    return formattedDate.isValid();
  }
  return false;
};

export const formatDate = (date) => {
  if (isDate(date)) {
    return moment(date).format("YYYY-MM-DD");
  }
  return date;
};

export const getCloudinaryMediaFilesPath = (imageTitle: string): string =>
  `employee-service/media/${imageTitle}`;
