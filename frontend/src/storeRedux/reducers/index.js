import signinReducer from "./signinReducer";
import productReducer from "./ProductFormReducers";
import getProductsReducers from "./getProductsReducers";
import getProductIdReducers from "./getProductIdReducers";
import addProductToCartReducer from "./addToCartReducers";
import { combineReducers } from "redux";

const allReducers = combineReducers({
  signin: signinReducer,
  product: productReducer,
  listOfProducts: getProductsReducers,
  productId: getProductIdReducers,
  cart: addProductToCartReducer,
});

export default allReducers;
