const signinReducer = (state = 0, action) => {
  console.log(action);
  console.log(action.type);
  console.log(action.payload);
  switch (action.type) {
    case "CONNECTED":
      return { ...state, user: action.payload };

    default:
      return (state = false);
  }
};

export default signinReducer;
