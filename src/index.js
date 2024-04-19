import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { Provider } from "react-redux";
import { createStore, applyMiddleware, compose } from "redux";
import { BrowserRouter as Router } from "react-router-dom";
import { thunk } from "redux-thunk";
import  reducers  from "./redux/reducers"
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const store = createStore(reducers, compose(applyMiddleware(thunk)));

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <Router>
        <App />
        <ToastContainer
          bodyClassName="font-primary text-sm "
          position="top-right"
          autoClose={1500}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        ></ToastContainer>
      </Router>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
