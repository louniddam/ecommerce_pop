const intialState = {
  product: [
    // {
    // p: {},
    // qty: 0
    // }
  ],
  totalPrice: 0,
};

const addProductToCartReducer = (state = intialState, action) => {
  switch (action.type) {
    case "ADD_PRODUCT_TO_CART":
      // WE LOOK FOR INDEX AND ID OF THE PRODUCT SELECTED
      let addedProductID = state.product.find(
        (product) => product.p.id === action.payload.id
      );
      let addedProductIndex = state.product.findIndex(
        (product) => product.p.id === action.payload.id
      );
      // IF ADDED PRODUCT NOT ALREADY EXIST ADD IT
      if (!addedProductID) {
        return {
          ...state,
          totalPrice: state.totalPrice + action.payload.price,
          product: [
            ...state.product,
            {
              p: action.payload,
              qty: 1,
            },
          ],
        };
      }
      // IF PRODUCT ALREADY EXIST RECREATE THE PRODUCT OBJECT AND ADD QTY BY ONE
      else if (addedProductID) {
        return {
          ...state,
          totalPrice: state.totalPrice + action.payload.price,
          product: [
            ...state.product.slice(0, addedProductIndex),
            {
              p: action.payload,
              qty: state.product[addedProductIndex].qty + 1,
            },
            ...state.product.slice(addedProductIndex + 1),
          ],
        };
      }
    case "REMOVE_PRODUCT_TO_CART":
      // WE LOOK FOR INDEX AND ID OF THE PRODUCT SELECTED
      let removedProductID = state.product.find(
        (product) => product.p.id === action.payload.id
      );
      let removedProductIndex = state.product.findIndex(
        (product) => product.p.id === action.payload.id
      );
      // IF WE FIND PRODUCT IN THE STATE WE REACREATE THE PRODUCT OBJECT AND DECREMENT QTY BY ONE
      if (removedProductID && state.product[removedProductIndex].qty > 0) {
        return {
          ...state,
          totalPrice: state.totalPrice - action.payload.price,
          product: [
            ...state.product.slice(0, removedProductIndex),
            {
              p: action.payload,
              qty: state.product[removedProductIndex].qty - 1,
            },
            ...state.product.slice(removedProductIndex + 1),
          ],
        };
      } // IF NO PRODUCT IN CART
      else if (state.product.length <= 0 || state.product[-1]) {
        console.log("Add at least one product to cart");
      }
      // IF THERE IS PRODUCT AND WANNA REMOVE IT FROM CART AND CHECK IF IT IS STILL IN THE CART BEFORE
      else if (removedProductIndex >= 0) {
        if (state.product[removedProductIndex].qty == 0) {
          return {
            ...state,
            product: [
              ...state.product.splice(0, removedProductIndex),
              ...state.product.splice(removedProductIndex + 1),
            ],
          };
        }
      }
    default:
      return state;
  }
};

export default addProductToCartReducer;
