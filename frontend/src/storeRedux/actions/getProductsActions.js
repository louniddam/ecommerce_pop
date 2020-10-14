export const getProductsAction = (allProducts) => {
  return {
    type: "GET_PRODUCT",
    payload: allProducts,
  };
};
