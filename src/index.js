import React from "react";
import ReactDOM from "react-dom/client";
import "alertifyjs/build/css/alertify.css";
import "react-datepicker/dist/react-datepicker.css";

import "./index.css";
import App from "./components/root/App";
import reportWebVitals from "./reportWebVitals";
import { HashRouter } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";

import configureStore from "./redux/reducer/configureStore";
import { Provider } from "react-redux";

const store = configureStore();

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <HelmetProvider>
      <HashRouter>
        <Provider store={store}>
          <App />
        </Provider>
      </HashRouter>
    </HelmetProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
