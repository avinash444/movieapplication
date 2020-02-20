import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import promiseMiddleware from 'redux-promise-middleware'
import { createStore, applyMiddleware } from "redux";
import thunkMiddleware from "redux-thunk";
import reducer from "./reducer";
import App from "./App";

const rootElement = document.getElementById("root");
const store  = createStore(reducer, applyMiddleware(thunkMiddleware, promiseMiddleware));

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  rootElement
);
