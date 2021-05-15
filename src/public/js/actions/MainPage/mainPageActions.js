import axios from "axios";
import { fetchNewsPath, fetchMediaPath } from "Utils/path-helpers/mainPagePaths";
import {
  FETCH_NEWS_BEGIN,
  FETCH_NEWS_SUCCESS,
  FETCH_NEWS_ERROR,
  FETCH_MEDIA_BEGIN,
  FETCH_MEDIA_SUCCESS,
  FETCH_MEDIA_ERROR,
  COMMENT_UPLOAD_BEGIN,
  COMMENT_UPLOAD_ERROR,
  COMMENT_UPLOAD_SUCCESS,
  FETCH_COMMENTS_BEGIN,
  FETCH_COMMENTS_ERROR,
  FETCH_COMMENTS_SUCCESS
} from "Reducers/MainPage/mainPageReducer";
import { mediaItemCommentsApiPath } from "Utils/path-helpers/mediaPagePaths";
import { fetchTopicsPath } from "Utils/path-helpers/communityPagePaths";

const fetchNewsBegin = () => ({
  type: FETCH_NEWS_BEGIN
});

const fetchNewsSuccess = (data) => ({
  type: FETCH_NEWS_SUCCESS,
  data
});

const fetchNewsError = () => ({
  type: FETCH_NEWS_ERROR
});

export const fetchNews = (params) => (dispatch) => {
  dispatch(fetchNewsBegin());
  axios
    .get(fetchTopicsPath("news"), {
      params
    })
    .then((res) => {
      dispatch(fetchNewsSuccess(res.data));
    })
    .catch(() => {
      dispatch(fetchNewsError());
    });
};

const fetchMediaBegin = () => ({
  type: FETCH_MEDIA_BEGIN
});

const fetchMediaSuccess = (data) => ({
  type: FETCH_MEDIA_SUCCESS,
  data
});

const fetchMediaError = () => ({
  type: FETCH_MEDIA_ERROR
});

export const fetchMedia = (params) => (dispatch) => {
  dispatch(fetchMediaBegin());
  axios
    .get(fetchMediaPath(), {
      params
    })
    .then((res) => {
      dispatch(fetchMediaSuccess(res.data));
    })
    .catch(() => {
      dispatch(fetchMediaError());
    });
};

export const fetchCommentsBegin = (data) => ({
  type: FETCH_COMMENTS_BEGIN,
  data
});

export const fetchCommentsSuccess = (data) => ({
  type: FETCH_COMMENTS_SUCCESS,
  data
});

export const fetchCommentsError = (data) => ({
  type: FETCH_COMMENTS_ERROR,
  data
});

export const fetchComments = (imageId, params) => (dispatch) => {
  dispatch(fetchCommentsBegin({ imageId }));
  axios
    .get(mediaItemCommentsApiPath(imageId), {
      params
    })
    .then((res) => {
      dispatch(fetchCommentsSuccess({ imageId, ...res.data }));
    })
    .catch(() => {
      dispatch(fetchCommentsError({ imageId }));
    });
};

export const commentUploadBegin = (data) => ({
  type: COMMENT_UPLOAD_BEGIN,
  data
});

export const commentUploadError = (data) => ({
  type: COMMENT_UPLOAD_ERROR,
  data
});

export const commentUploadSuccess = () => ({
  type: COMMENT_UPLOAD_SUCCESS
});

export const uploadComment = (imageId, body) => (dispatch) => {
  dispatch(commentUploadBegin({ imageId }));
  axios
    .post(mediaItemCommentsApiPath(imageId), body)
    .then(() => {
      dispatch(commentUploadSuccess());
      dispatch(fetchComments(imageId));
    })
    .catch(() => {
      dispatch(commentUploadError({ imageId }));
    });
};
