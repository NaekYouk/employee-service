export const FETCH_MEDIA_BEGIN = "mediapage/FETCH_MEDIA_BEGIN";
export const FETCH_MEDIA_SUCCESS = "mediapage/FETCH_MEDIA_SUCCESS";
export const FETCH_MEDIA_ERROR = "mediapage/FETCH_MEDIA_ERROR";

export const IMAGE_UPLOAD_BEGIN = "mediapage/IMAGE_UPLOAD_BEGIN";
export const IMAGE_UPLOAD_SUCCESS = "mediapage/IMAGE_UPLOAD_SUCCESS";
export const IMAGE_UPLOAD_ERROR = "mediapage/IMAGE_UPLOAD_ERROR";

export const FETCH_COMMENTS_BEGIN = "mediapage/FETCH_COMMENTS_BEGIN";
export const FETCH_COMMENTS_SUCCESS = "mediapage/FETCH_COMMENTS_SUCCESS";
export const FETCH_COMMENTS_ERROR = "mediapage/FETCH_COMMENTS_ERROR";

export const COMMENT_UPLOAD_BEGIN = "mediapage/COMMENT_UPLOAD_BEGIN";
export const COMMENT_UPLOAD_SUCCESS = "mediapage/COMMENT_UPLOAD_SUCCESS";
export const COMMENT_UPLOAD_ERROR = "mediapage/COMMENT_UPLOAD_ERROR";

export const DELETE_MEDIA_BEGIN = "mediapage/DELETE_MEDIA_BEGIN";
export const DELETE_MEDIA_SUCCESS = "mediapage/DELETE_MEDIA_SUCCESS";
export const DELETE_MEDIA_ERROR = "mediapage/DELETE_MEDIA_ERROR";

export const CLEAN_MEDIA_PAGE_DATA = "mediapage/CLEAN_MEDIA_PAGE_DATA";

const initialState = {
  mediaData: {
    results: [],
    allMediaFilesCount: 0,
    currentPage: 1,
    mediaFilesPerPageNumber: 10,
    isInitialLoad: true,
    isLoading: false,
    error: ""
  },
  imageUploader: {
    isLoading: false,
    error: ""
  }
};

const MediaPageState = (state = initialState, { data, type } = {}) => {
  switch (type) {

    case FETCH_MEDIA_BEGIN:
      return {
        ...state,
        mediaData: {
          ...state.mediaData,
          isLoading: true
        }
      };

    case FETCH_MEDIA_SUCCESS:
      const results = data.results.map((item) => ({
        id: item.id,
        file: item.file,
        title: item.title,
        creationDate: item.creationDate,
        author: item.author,
        comments: {
          results: [],
          currentPage: 1,
          allCommentsCount: 0,
          commentsPerPage: 10,
          isLoading: false
        }
      }));
      return {
        ...state,
        mediaData: {
          ...state.mediaData,
          allMediaFilesCount: data.allMediaFilesCount,
          currentPage: data.currentPage,
          results: data.withoutUnion ? results : [...state.mediaData.results, ...results],
          isInitialLoad: false,
          isLoading: false
        }
      };

    case FETCH_MEDIA_ERROR:
      return {
        ...state,
        mediaData: {
          ...state.mediaData,
          isLoading: false,
          isInitialLoad: false,
          error: "Error fetching media files"
        }
      };

    case IMAGE_UPLOAD_BEGIN:
      return {
        ...state,
        imageUploader: {
          ...initialState.imageUploader,
          isLoading: true
        }
      };

    case IMAGE_UPLOAD_SUCCESS:
      return {
        ...state,
        imageUploader: {
          ...state.imageUploader,
          isLoading: false
        }
      };

    case IMAGE_UPLOAD_ERROR:
      return {
        ...state,
        imageUploader: {
          ...initialState.imageUploader,
          isLoading: false,
          error: "Error uploading image"
        }
      };

    case FETCH_COMMENTS_BEGIN: {
      return {
        ...state,
        mediaData: {
          ...state.mediaData,
          results: state.mediaData.results.map((item) => {
            if (item.id === data.imageId) {
              return {
                ...item,
                comments: {
                  results: [],
                  currentPage: 1,
                  allCommentsCount: 0,
                  commentsPerPage: 10,
                  isLoading: true
                }
              };
            }
            return item;
          })
        }
      };
    }

    case FETCH_COMMENTS_SUCCESS: {
      return {
        ...state,
        mediaData: {
          ...state.mediaData,
          results: state.mediaData.results.map((item) => {
            if (item.id === data.imageId) {
              return {
                ...item,
                areCommentsLoading: false,
                comments: {
                  ...item.comments,
                  results: data.results.map((comment) => ({
                    author: comment.author,
                    title: comment.title,
                    body: comment.body,
                    creationDate: comment.creationDate
                  })),
                  currentPage: data.currentPage,
                  allCommentsCount: data.allCommentsCount,
                  isLoading: false
                }
              };
            }
            return item;
          })
        }
      };
    }

    case FETCH_COMMENTS_ERROR: {
      return {
        ...state,
        mediaData: {
          ...state.mediaData,
          results: state.mediaData.results.map((item) => {
            if (item.id === data.imageId) {
              return {
                ...item,
                comments: {
                  ...item.comments,
                  results: [],
                  currentPage: 1,
                  allCommentsCount: 0,
                  isLoading: false
                }
              };
            }
            return item;
          }),
          error: "Error fetching comments"
        }
      };
    }

    case COMMENT_UPLOAD_BEGIN: {
      return {
        ...state,
        mediaData: {
          ...state.mediaData,
          results: state.mediaData.results.map((item) => {
            if (item.id === data.imageId) {
              return {
                ...item,
                comments: {
                  ...item.comments,
                  isLoading: true
                }
              };
            }
            return item;
          }),
          error: ""
        }
      };
    }

    case COMMENT_UPLOAD_ERROR: {
      return {
        ...state,
        mediaData: {
          ...state.mediaData,
          results: state.mediaData.results.map((item) => {
            if (item.id === data.imageId) {
              return {
                ...item,
                comments: {
                  ...item.comments,
                  isLoading: false
                }
              };
            }
            return item;
          }),
          error: "Error uploading new comment"
        }
      };
    }

    case CLEAN_MEDIA_PAGE_DATA: {
      return initialState;
    }

    default:
      return state;

  }
};

export default MediaPageState;
