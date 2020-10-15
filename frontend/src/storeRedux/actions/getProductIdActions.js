export const getIdProductAction = (productId) => { 
    return {
        type: "GET_PRODUCT_ID",
        payload: productId,
    };
};