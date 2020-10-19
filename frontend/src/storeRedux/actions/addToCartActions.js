export const addToTheCart = (product) => {
  return {
    type: "ADD_PRODUCT_TO_CART",
    payload: product,
  };
};
