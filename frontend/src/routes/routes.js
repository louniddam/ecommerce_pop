import React from "react";
// import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import App from "../App.js";
import Sign_up from "../components/signup/Sign_up";

const routing = (
  <div>
    <Route exact path="/" component={App} />
    <Route path="/sign-up" component={Sign_up} />
  </div>
);

export default routing;
