import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
// import routing from "./routes/routes";
import { Provider } from "react-redux";
// import store from "./store";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
// import App from "../App.js";
import SignUp from "./components/signup/Sign_up";
import SignIn from "./components/signin/Sign_in";
import { createStore } from "redux";
import allReducers from "./storeRedux/reducers";

// STORE STATE GLOBAL

// ACTION INCREMENT
// const increment = () => {
//   return {
//     type: "INCREMENT",
//   };
// };
// const decrement = () => {
//   return {
//     type: "DECREMENT",
//   };
// };
// REDUCER

const store = createStore(
  allReducers,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

const routing = (
  <Provider store={store}>
    <Router>
      <Switch>
        <Route exact path="/" component={App} />
        <Route path="/signup" component={SignUp} />
      </Switch>
    </Router>
  </Provider>
);

ReactDOM.render(routing, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
