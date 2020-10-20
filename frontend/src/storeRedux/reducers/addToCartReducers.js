const intialState = {
  product: [],
  totalPrice:0
};

const addProductToCartReducer = (state = intialState, action) => {
  switch (action.type) {
    case "ADD_PRODUCT_TO_CART":
      return { ...state, 
        totalPrice: state.totalPrice + action.payload.price,
        product: [...state.product, action.payload] };

    default:
      return state;
  }
};

export default addProductToCartReducer;