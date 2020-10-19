const intialState = {
  product: [],
};

const addProductToCartReducer = (state = intialState, action) => {
  switch (action.type) {
    case "ADD_PRODUCT_TO_CART":
      return { ...state, product: [...state.product, action.payload] };

    default:
      return state;
  }
};

export default addProductToCartReducer;
