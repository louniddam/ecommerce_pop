import signinReducer from "./signinReducer";
import productReducer from "./ProductFormReducers";
import getProductsReducers from "./getProductsReducers";
import { combineReducers } from "redux";

const allReducers = combineReducers({
  signin: signinReducer,
  product: productReducer,
  listOfProducts: getProductsReducers,
});

export default allReducers;
