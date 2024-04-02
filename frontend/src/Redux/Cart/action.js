import axios from "axios";
import * as types from "./actionType";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

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
const fetchCartFailure = (payload) => {
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


export const fetchCartData = (token) => {
  return (dispatch) => {
    dispatch(fetchCartReq());
    axios
      .get(`${process.env.BASEURL}/cart/products`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      .then((res) => dispatch(fetchCartSucces(res.data.data)))
      .catch((err) => dispatch(fetchCartFailure(err.data)));
  };
};

export const addToCart = (data, token) => {
  return async (dispatch) => {
    try {
      let res = await axios.put(`${process.env.BASEURL}/cart/update`, data, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        }
      });
      dispatch(fetchCartData(token))
    } catch (error) {
      console.log("Cart Update Error", error);
      if("Cart Update Error", error.response.data.error === "jwt expired") {
        localStorage.removeItem("token");
        toast("Session Expired Please login.")
        return
      }
    }
  };
};

export const deleteCartData = (id, token) => {
  return async (dispatch) => {
    try {
      let res = await axios.delete(`${process.env.BASEURL}/cart/cartItem/remove/${id}`, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        }
      });
      dispatch(deleteCartSucces(res.data));
    } catch (error) {
      console.log("Cart Update Error", error);
      dispatch(deleteCartFaliure(error.message));
    }
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