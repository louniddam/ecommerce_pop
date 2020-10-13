export const signin = (formInfo) => {
  console.log(formInfo);
  return {
    type: "CONNECTED",
    payload: formInfo,
  };
};
