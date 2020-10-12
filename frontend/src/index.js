import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
// import routing from "./routes/routes";
import { Provider } from "react-redux";
import store from "./store";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
// import App from "../App.js";
import Sign_up from "./components/signup/Sign_up";

const routing = (
  <Provider store={store}>
    <Router>
      <Switch>
        <Route exact path="/" component={App} />
        <Route path="/sign-up" component={Sign_up} />
      </Switch>
    </Router>
  </Provider>
);
{
}
console.log(routing);
ReactDOM.render(routing, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
