import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
// ROUTE COMPONENT
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import App from "./App";
import SignUp from "./components/signup/Sign_up";
import Product_form from "./components/ProductForm/ProductForm";
// import ListProducts from "./components/ListProducts/ListProducts";
import SoloProduct from "./components/soloProduct/SoloProduct";
import ProfilUser from "./components/ProfilUser/ProfilUser";
import EditProduct from "./components/EditProduct/EditProduct";
import Cart from "./components/Cart/Cart";
// SERVICE WORKER
import * as serviceWorker from "./serviceWorker";

// STORE + PERSISTANT
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { createStore } from "redux";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // defaults to localStorage for web

// REDUCERS
import allReducers from "./storeRedux/reducers/index";

// STORE + PERSISTANT
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

// RENDER

ReactDOM.render(
  <Provider store={store}>
    <PersistGate persistor={persistor}>
      <Router>
        <Switch>
          <Route exact path="/" component={App} />
          <Route path="/signup" component={SignUp} />
          <Route path="/productform" component={Product_form} />
          <Route path="/solo-product" component={SoloProduct} />
          <Route path="/profiluser" component={ProfilUser} />
          <Route path="/edit-product" component={EditProduct} />
          <Route path="/cart" component={Cart} />
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
