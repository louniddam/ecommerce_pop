const intialState = {
  productId: [],
};

const getProductIdReducers = (state = intialState, action) => {
  switch (action.type) {
    case "GET_PRODUCT_ID":
      return { ...state, productId: action.payload };

    default:
      return state;
  }
};

export default getProductIdReducers;
