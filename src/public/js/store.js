import React from "react";
import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunkMiddleware from "redux-thunk";
import reducers from "Reducers";
import history from "./history";

const store = createStore(
  reducers,
  composeWithDevTools(applyMiddleware(thunkMiddleware.withExtraArgument({ history })))
);

export default store;
