const intialState = {
    productId: {},
}

const productByIdReducers = (state = intialState, action) =>{
    switch (action.type) {
        case "GET_PRODUCT_ID":
            return {...state, productId: action.payload}

        default:
      return state;
    };
};

export default productByIdReducers;