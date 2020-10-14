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

import { PersistGate } from "redux-persist/integration/react";
import { createStore } from "redux";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // defaults to localStorage for web
import allReducers from "./storeRedux/reducers/index";
import Product_form from "./components/ProductForm/ProductForm";

const persistConfig = {
  key: "root",
  storage,
};

const persistedReducer = persistReducer(persistConfig, allReducers);

let store = createStore(
  persistedReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);
const persistor = persistStore(store);

ReactDOM.render(
  <Provider store={store}>
    <PersistGate persistor={persistor}>
      <Router>
        <Switch>
          <Route exact path="/" component={App} />
          <Route path="/signup" component={SignUp} />
          <Route path="/productform" component={Product_form} />
        </Switch>
      </Router>
    </PersistGate>
  </Provider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
// console.log(persistStore(store));
// console.log(persistor);
