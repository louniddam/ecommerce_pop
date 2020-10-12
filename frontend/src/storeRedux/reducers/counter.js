const counterReducer = (state = 0, action) => {
  switch (action.type) {
    case "INCREMENT":
      return state + 1;
    case "DECREEMENT":
      return state - 1;
    default:
      return (state = 0);
  }
};

export default counterReducer;
