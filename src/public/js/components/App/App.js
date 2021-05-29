import axios from "axios";
import React, { useEffect } from "react";
import { Router, Route } from "react-router-dom";
import { Provider } from "react-redux";
import store from "~/js/store";
import history from "~/js/history";
import { SharedComponents } from "~/js/routes";
import { redirectTo } from "Actions/Shared/historyActions";
import {
  pathToCommunityPage,
  pathToNotFoundPage,
  pathToSignInPage,
} from "Utils/path-helpers/routerPaths";
import { getSessionData } from "Utils/storage-helpers/storage-helpers";
import { setUserDataFromLocalStorage } from "Actions/Account/accountActions";
import AllPages from "Containers/AllPages/AllPages";

export const PATHS = {
  ROOT: "/",
  SIGN_IN_PAGE: pathToSignInPage(),
  COMMUNITY_PAGE: pathToCommunityPage(),
  NOT_FOUND_PAGE: pathToNotFoundPage(),
};

axios.interceptors.request.use(
  (request) => {
    const sessionData = getSessionData();

    if (sessionData && sessionData.token) {
      request.headers.Authorization = "Bearer " + sessionData.token;
    }

    return request;
  },
  (error) => Promise.reject(error)
);

axios.interceptors.response.use(
  (response) => response,
  (error) => {
    if (axios.isCancel(error)) return Promise.reject(error);

    if (error.response.status === 404) {
      store.dispatch(redirectTo(pathToNotFoundPage()));
    }

    return Promise.reject(error);
  }
);

const App = () => {
  useEffect(() => {
    const userData = getSessionData();
    if (userData) {
      store.dispatch(setUserDataFromLocalStorage(userData));
    }
  }, []);

  return (
    <Provider store={store}>
      <Router history={history}>
        <Route path={PATHS.ROOT} component={SharedComponents} />
        <Route path={PATHS.ROOT} component={AllPages} />
      </Router>
    </Provider>
  );
};

export default App;
