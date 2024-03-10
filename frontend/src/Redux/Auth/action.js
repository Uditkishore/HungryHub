import axios from "axios";

import * as types from "./actionType";

export const loginRequest = () => {
  return {
    type: types.LOGIN_REQUEST,
  };
};

export const loginSuccess = (payload) => {
  return {
    type: types.LOGIN_SUCCESS,
    payload,
  };
};

export const loginFailure = (err) => {
  return {
    type: types.LOGIN_FALIURE,
    payload: err,
  };
};

export const clearUser = (payload) => {
  return {
    type: types.CLEAR_DATA,
    payload,
  };
};

export const loginUser = (payload) => (dispatch) => {
  dispatch(loginRequest());
  const { email, password } = payload;

  axios.post(`http://localhost:8080/user/login`, { email, password })
    .then((res) => {
      console.log("login res", res);
      dispatch(loginSuccess(res.data)); 
    })
    .catch((err) => {
      dispatch(loginFailure(err.message));
    });
};
