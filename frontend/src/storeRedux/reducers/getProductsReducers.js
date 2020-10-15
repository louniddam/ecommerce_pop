const initialStates = {
  allProducts: [],
};
const getProductsReducers = (state = initialStates, action) => {
  switch (action.type) {
    case "GET_PRODUCT":
      return { ...state, allProducts: action.payload };

    default:
      return state;
  }
};

export default getProductsReducers;
