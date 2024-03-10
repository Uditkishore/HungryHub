import axios from "axios";

import * as types from "./actionType";

const checkoutReq = () => {
  return {
    type: types.CHECKOUT_REQ,
  };
};
const checkoutSucces = (payload) => {
  return {
    type: types.CHECKOUT_SUCCESS,
    payload,
  };
};
const checkoutFaliure = (payload) => {
  return {
    type: types.CHECKOUT_FAILURE,
    payload,
  };
};

export const fetchCheckoutData = (payload) => (dispatch) => {
  dispatch(checkoutReq());
  axios
    .post(`/checkout`, payload)
    .then((res) => dispatch(checkoutSucces(res.data)))
    .catch((err) => dispatch(checkoutFaliure(err.data)));
};
