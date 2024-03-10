import * as types from "./actionType";

const initState = {
  item: {},
  isLoading: false,
  error: "",
};

const reducer = (state = initState, action) => {
  const { type, payload } = action;
  switch (type) {
    case types.FETCH_SINGLE_DATA_REQUEST:
      return {
        ...state,
        error: "",
        isLoading: true,
      };
    case types.FETCH_SIGNLE_DATA_SUCCES:
      return {
        ...state,
        item: payload,
        error: "",
        isLoading: false,
      };
    case types.FETCH_SIGNLE_DATA_FAILURE:
      return {
        ...state,
        error: payload,
        isLoading: false,
      };
    default:
      return state;
  }
};

export default reducer;
