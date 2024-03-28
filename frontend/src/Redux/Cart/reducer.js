import * as types from "./actionType";

const initState = {
  cart: [],
  error: false,
  isLoading: true,
};

const reducer = (state = initState, action) => {
  const { type, payload } = action;
  switch (type) {
    case types.FETCH_CART_REQ:
      return {
        ...state,
        error: false,
        isLoading: true,
      };
    case types.FETCH_CART_SUCCESS:
      return {
        ...state,
        cart: payload,
        error: false,
        isLoading: false,
      };
    case types.FETCH_CART_FALIURE:
      return {
        ...state,
        error: true,
        isLoading: false,
      };
    case types.POST_CART_REQ:
      return {
        ...state,
        error: false,
        isLoading: true,
      };
    case types.POST_CART_SUCCESS:
      return {
        ...state,
        cart: payload,
        error: false,
        isLoading: false,
      };
    case types.POST_CART_FALIURE:
      return {
        ...state,
        error: true,
        isLoading: false,
      };
    case types.DELETE_CART_REQ:
      return {
        ...state,
        error: false,
      };
    case types.DELETE_CART_SUCCESS:
      return {
        ...state,
        error: false,
      };
    case types.DELETE_CART_FAILURE:
      return {
        ...state,
        error: true,
      };
    default:
      return state;
  }
};

export default reducer;
