import "antd/dist/antd.css";
import { ConnectedRouter } from "connected-react-router";
import React from "react";
import { render } from "react-dom";
import { Provider } from "react-redux";
import { Switch } from "react-router";
import { Spinner } from "shared/components/Spinner/Spinner";
import { Notification } from "shared/components/Notification/Notification";
import { AppRoutes } from "./app-routes";
// import "./extensions/array";
import { history } from "./history-instance";
import "./index.scss";
import { appStore } from "./store/app-state";



render(
  <Provider store={appStore}>
    <ConnectedRouter history={history}>
      <Spinner />
      <Notification/>
      <Switch>{AppRoutes}</Switch>
    </ConnectedRouter>
  </Provider>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
