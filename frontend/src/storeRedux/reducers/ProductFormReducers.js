const initialStates = {
  productList: {},
};
const productReducer = (state = initialStates, action) => {
  switch (action.type) {
    case "CONNECTED":
      return { ...state, productList: action.payload };

    default:
      return state;
  }
};

export default productReducer;
