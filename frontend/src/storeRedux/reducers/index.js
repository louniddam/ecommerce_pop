import counterReducer from "./counter";
import signupReducer from "./signupReducer";
import { combineReducers } from "redux";

const allReducers = combineReducers({
  counter: counterReducer,
  signup: signupReducer,
});

export default allReducers;
