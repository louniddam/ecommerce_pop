const intialState = {
  product: [
    // {
    // p: {},
    // qty: 0
  // }
],
  totalPrice:0,
  quantity: 0,
};

const addProductToCartReducer = (state = intialState, action) => {
  switch (action.type) {
    case "ADD_PRODUCT_TO_CART":
      console.log(state.product);
      // let addedProduct = state.product.forEach(element => {
      //   let findproduct = 
      //   console.log(element.p.id);
       let addedProductID = state.product.find(product => product.p.id === action.payload.id)
        let addedProductIndex = state.product.findIndex(product => product.p.id === action.payload.id)
      // });
      // console.log(addedProductIndex);
      if(!addedProductID){
        return { ...state, 
          totalPrice: state.totalPrice + action.payload.price,
          product: [ ...state.product,
          { 
            p: action.payload,
            qty : 1 
          }],
         
        };
      }
      else if(addedProductID){
        return {...state,
        totalPrice: state.totalPrice + action.payload.price,
        product: [ ...state.product.slice(0,addedProductIndex),{
          p : action.payload,
          qty : state.product[addedProductIndex].qty+1
          },
          ...state.product.slice(addedProductIndex+1)
        
        ],
      }
      }
      case "REMOVE_PRODUCT_TO_CART":
   
      

    default:
      return state;
  }
};

export default addProductToCartReducer;