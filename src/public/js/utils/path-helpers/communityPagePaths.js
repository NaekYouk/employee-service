const BASE_PATH = "";

export const fetchTopicsPath = (themeKey) => `${BASE_PATH}/api/community/${themeKey}/topics`;
export const fetchPostsPath = (themeKey, topicId) =>
  `${BASE_PATH}/api/community/${themeKey}/topics/${topicId}/posts`;
export const themeViewPath = (themeKey) => `${BASE_PATH}/community/${themeKey}`;
export const topicViewPath = (themeKey, topicId) => `${BASE_PATH}/community/${themeKey}/topics/${topicId}`;
export const fetchMostActiveUsersPath = (themeKey) =>
  `${BASE_PATH}/api/community/${themeKey}/most-active-users`;
export const updatePostBodyPath = (themeKey, topicId, postId) =>
  `${BASE_PATH}/api/community/${themeKey}/topics/${topicId}/posts/${postId}`;
export const updateTopicPath = (themeKey, topicId) =>
  `${BASE_PATH}/api/community/${themeKey}/topics/${topicId}`;
export const deletePostPath = (themeKey, topicId, postId) =>
  `${BASE_PATH}/api/community/${themeKey}/topics/${topicId}/posts/${postId}`;
export const deleteTopicPath = (themeKey, topicId) =>
  `${BASE_PATH}/api/community/${themeKey}/topics/${topicId}`;
