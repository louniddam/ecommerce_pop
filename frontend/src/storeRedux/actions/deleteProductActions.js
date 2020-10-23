export const deleteProduct = (productId) => {
  return {
    type: "DELETE_PRODUCT",
    payload: productId,
  };
};
