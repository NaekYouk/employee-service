const BASE_PATH = "";

export const mediaApiPath = () => `${BASE_PATH}/api/media/`;
export const mediaItemApiPath = (fileId) => `${mediaApiPath()}${fileId}`;
export const mediaItemCommentsApiPath = (fileId) => `${mediaApiPath()}${fileId}/comments`;
