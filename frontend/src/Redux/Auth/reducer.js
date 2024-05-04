import * as types from "./actionType";
let storageToken = JSON.parse(localStorage.getItem("token"));

const initState = {
  token: storageToken ? storageToken : null,
  loading: false,
};

const authReducer = (state = initState, { type, payload }) => {
  switch (type) {
    case types.LOGIN_REQUEST:
      return {
        ...state, token: null, loading: true
      };
      case types.LOGIN_SUCCESS:
      localStorage.setItem("token", JSON.stringify(payload.token));
      return {
        ...state, token: payload.token, loading: false,
      };
    case types.LOGIN_FALIURE:
      return {
        ...state, token: null, error: true, loading: false,
      };
    case types.CLEAR_DATA:
      localStorage.removeItem('token');
      return {
        ...state, token: null, loading: false,
      };
    default:
      return state;
  }
};

export default authReducer;
