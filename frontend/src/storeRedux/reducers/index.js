import signinReducer from "./signinReducer";
import productReducer from "./ProductFormReducers";
import getProductsReducers from "./getProductsReducers";
import getProductIdReducers from "./getProductIdReducers";
import { combineReducers } from "redux";

const allReducers = combineReducers({
  signin: signinReducer,
  product: productReducer,
  listOfProducts: getProductsReducers,
  productId: getProductIdReducers,
});

export default allReducers;
