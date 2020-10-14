const initialStates = {
  userToken: {},
  // In usertoken , there is token More Id email etc... of user
};
const signinReducer = (state = initialStates, action) => {
  switch (action.type) {
    case "CONNECTED":
      return { ...state, userToken: action.payload };

    default:
      return state;
  }
};

export default signinReducer;
