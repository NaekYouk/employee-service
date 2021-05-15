export const isInteger = (value?: any): boolean => {
  return Number.isInteger(value);
};

export const validateInteger = (value: any, errString: string): void => {
  if (!isInteger(value)) {
    throw new Error(errString);
  }
};

export const getPageOffset = (pageNumber: number, limit: number): number => {
  if (pageNumber > 0) {
    return (pageNumber - 1) * limit;
  }
  return 0;
};
