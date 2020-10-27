const intialState = {
  productId: [],
};

const getProductIdReducers = (state = intialState, action) => {
  switch (action.type) {
    case "GET_PRODUCT_ID":
      console.log(state);
      return { ...state, productId: action.payload };
    case "DELETE_PRODUCT":
      console.log(state.allProducts);
      console.log(action.payload);

      let deletedProductIndex = state.allProducts.findIndex(
        (product) => product.id === action.payload
      );
      console.log(deletedProductIndex);
      return {
        ...state,
        allProducts: [...state.allProducts.splice(0, deletedProductIndex)],
      };
    default:
      return state;
  }
};

export default getProductIdReducers;
