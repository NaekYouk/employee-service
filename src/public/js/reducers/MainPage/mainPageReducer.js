export const FETCH_NEWS_BEGIN = "mainpage/FETCH_NEWS_BEGIN";
export const FETCH_NEWS_SUCCESS = "mainpage/FETCH_NEWS_SUCCESS";
export const FETCH_NEWS_ERROR = "mainpage/FETCH_NEWS_ERROR";

export const FETCH_MEDIA_BEGIN = "mainpage/FETCH_MEDIA_BEGIN";
export const FETCH_MEDIA_SUCCESS = "mainpage/FETCH_MEDIA_SUCCESS";
export const FETCH_MEDIA_ERROR = "mainpage/FETCH_MEDIA_ERROR";

export const FETCH_COMMENTS_BEGIN = "mediapage/FETCH_COMMENTS_BEGIN";
export const FETCH_COMMENTS_SUCCESS = "mediapage/FETCH_COMMENTS_SUCCESS";
export const FETCH_COMMENTS_ERROR = "mediapage/FETCH_COMMENTS_ERROR";

export const COMMENT_UPLOAD_BEGIN = "mediapage/COMMENT_UPLOAD_BEGIN";
export const COMMENT_UPLOAD_SUCCESS = "mediapage/COMMENT_UPLOAD_SUCCESS";
export const COMMENT_UPLOAD_ERROR = "mediapage/COMMENT_UPLOAD_ERROR";

const initialState = {
  newsData: {
    results: [],
    allNewsCount: 0,
    currentPage: 1,
    newsPerPageNumber: 3,
    isLoading: false,
    error: ""
  },
  mediaData: {
    results: [],
    allMediaFilesCount: 0,
    currentPage: 1,
    mediaFilesPerPageNumber: 3,
    isLoading: false,
    error: ""
  }
};

const MainPageState = (state = initialState, { data, type } = {}) => {
  switch (type) {

    case FETCH_NEWS_BEGIN:
      return {
        ...state,
        newsData: {
          ...initialState.newsData,
          isLoading: true
        }
      };

    case FETCH_NEWS_SUCCESS:
      return {
        ...state,
        newsData: {
          ...state.newsData,
          allNewsCount: data.allNewsCount,
          currentPage: data.currentPage,
          results:
            data &&
            data.results &&
            data.results.map((item) => ({
              id: item.id,
              title: item.title,
              body: item.body,
              creationDate: item.creationDate,
              author: item.author
            })),
          isLoading: false
        }
      };

    case FETCH_NEWS_ERROR:
      return {
        ...state,
        newsData: {
          ...initialState.newsData,
          error: "Error fetching news"
        }
      };

    case FETCH_MEDIA_BEGIN:
      return {
        ...state,
        mediaData: {
          ...initialState.mediaData,
          isLoading: true
        }
      };

    case FETCH_MEDIA_SUCCESS:
      return {
        ...state,
        mediaData: {
          ...state.mediaData,
          allMediaFilesCount: data.allMediaFilesCount,
          currentPage: data.currentPage,
          results:
            data &&
            data.results &&
            data.results.map((item) => ({
              id: item.id,
              file: item.file,
              title: item.title,
              creationDate: item.creationDate,
              author: item.author
            })),
          isLoading: false
        }
      };

    case FETCH_MEDIA_ERROR:
      return {
        ...state,
        mediaData: {
          ...initialState.mediaData,
          error: "Error fetching media files"
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

    default:
      return state;

  }
};

export default MainPageState;
