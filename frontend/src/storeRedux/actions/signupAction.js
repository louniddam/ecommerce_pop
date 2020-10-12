export const signup = (formInfo) => {
  console.log(formInfo);
  return {
    type: "NEW_USER",
    payload: formInfo,
  };
};
