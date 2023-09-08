import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App";
import { Provider } from "react-redux";
import store from "./redux/store";
// import "./locale/i18n";
import "./index.css";
import "antd/dist/antd.css";
import "roboto-fontface/css/roboto/roboto-fontface.css";

document.getElementById("html-root").setAttribute("lang", "en");

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
