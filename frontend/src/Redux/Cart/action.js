import axios from "axios";
import * as types from "./actionType";
import { useSelector } from "react-redux";

const fetchCartReq = (payload) => {
  return {
    type: types.FETCH_CART_REQ,
    payload,
  };
};
export const fetchCartSucces = (payload) => {
  return {
    type: types.FETCH_CART_SUCCESS,
    payload,
  };
};
const fetchCartFaliure = (payload) => {
  return {
    type: types.FETCH_CART_FALIURE,
    payload,
  };
};

const deleteCartReq = () => {
  return {
    type: types.DELETE_CART_REQ,
  };
};
export const deleteCartSucces = (payload) => {
  return {
    type: types.DELETE_CART_SUCCESS,
    payload,
  };
};
const deleteCartFaliure = (payload) => {
  return {
    type: types.DELETE_CART_FAILURE,
    payload,
  };
};


export const deleteCartData = (payload) => {
  return (dispatch) => {
    dispatch(deleteCartReq());
    axios
      .delete(`/update/${payload}`)
      .then((res) => {
        dispatch(deleteCartSucces(res));
      })
      .catch((err) => {
        dispatch(deleteCartFaliure(err.message));
      });
  };
};
export const deleteAllCartData = () => {
  return (dispatch) => {
    dispatch(deleteCartReq());
    axios
      .delete(`/cart`)
      .then((res) => {
        dispatch(deleteCartSucces(res));
      })
      .catch((err) => {
        dispatch(deleteCartFaliure(err.message));
      });
  };
};
