import counterReducer from "./counter";
import signupReducer from "./signupReducer";
import signinReducer from "./signinReducer";
import { combineReducers } from "redux";

const allReducers = combineReducers({
  counter: counterReducer,
  signup: signupReducer,
  signin: signinReducer,
});

export default allReducers;
