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
  
  let addedProductID = state.product.find(product => product.p.id === action.payload.id)
  let addedProductIndex = state.product.findIndex(product => product.p.id === action.payload.id)
  switch (action.type) {
    case "ADD_PRODUCT_TO_CART":
      console.log(state.product);
      
     
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
      //verifier le else if 
      else if(addedProductID){
        return {...state,
        totalPrice: state.totalPrice + action.payload.price,
        product: [ ...state.product.splice(0,addedProductIndex),{
          p : action.payload,
          qty : state.product[addedProductIndex].qty+1
          },
          ...state.product.slice(addedProductIndex+1)
        
        ],
      }
      }
      case "REMOVE_PRODUCT_TO_CART":
       addedProductID = state.product.find(product => product.p.id === action.payload.id)
       addedProductIndex = state.product.findIndex(product => product.p.id === action.payload.id)
       
        // if(!addedProductID){
        //   return { ...state, 
        //     totalPrice: state.totalPrice - action.payload.price,
        //     product: [ ...state.product,
        //     { 
        //       p: action.payload,
        //       qty : 1 
        //     }],
           
        //   };
        // }
         if(addedProductID){
          return {...state,
          totalPrice: state.totalPrice - action.payload.price,
          product: [ ...state.product.slice(0,addedProductIndex),{
            p : action.payload,
            qty : state.product[addedProductIndex].qty-1
            },
            ...state.product.slice(addedProductIndex+1)
          
          ],
        }
        }else if (state.product[addedProductIndex].qty == 0){
          return {...state,
            product: [ ...state.product.splice(0,addedProductIndex),
              ...state.product.splice(addedProductIndex+1)
            
            ],
          }
        }
    default:
      return state;
  }
};

export default addProductToCartReducer;