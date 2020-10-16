const initialStates = {
  userToken: null,
  userInfo: {},
  // In usertoken , there is token More Id email etc... of user
};

const signinReducer = (state = initialStates, action) => {
  switch (action.type) {
    case "CONNECTED":
      return {
        ...state,
        userToken: action.payload.token,
        userInfo: action.payload.tokenDecoded,
      };
      case "DISCONNECTED":
        return {
          ...state,
          userToken: null
        };

    default:
      return state;
  }
};

export default signinReducer;
