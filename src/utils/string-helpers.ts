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

export const getCloudinaryMediaFilesPath = (imageTitle: string): string => `burning-wheels/media/${imageTitle}`;
