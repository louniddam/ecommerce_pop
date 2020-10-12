// STORE STATE GLOBAL

// ACTION INCREMENT
const increment = () => {
  return {
    type: "INCREMENT",
  };
};
const decrement = () => {
  return {
    type: "DECREMENT",
  };
};
// REDUCER
const counter = (state = 0, action) => {
  switch (action.type) {
    case "INCREMENT":
      return state + 1;
    case "DECREEMENT":
      return state - 1;
  }
};
// DISPATCH

export default "lol";
