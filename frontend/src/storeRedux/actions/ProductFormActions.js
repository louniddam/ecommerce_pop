export const addProductAction = (newProduct) => {
  return {
    type: "ADD_PRODUCT",
    payload: newProduct,
  };
};
