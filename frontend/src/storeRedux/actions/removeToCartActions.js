export const removeToTheCart = (product) => {
    return {
      type: "REMOVE_PRODUCT_TO_CART",
      payload: product,
    };
  };
  