const initialStates = {
  allProducts: [],
};
const getProductsReducers = (state = initialStates, action) => {
  switch (action.type) {
    case "GET_PRODUCT":
      return { ...state, allProducts: action.payload };

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

export default getProductsReducers;
