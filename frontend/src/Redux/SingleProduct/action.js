import axios from "axios";
import * as types from "./actionType";

export const fetchDataReq = () => {
  return {
    type: types.FETCH_SINGLE_DATA_REQUEST,
  };
};
export const fetchDataSucces = (payload) => {
  return {
    type: types.FETCH_SIGNLE_DATA_SUCCES,
    payload,
  };
};
export const fetchDataFaliure = (payload) => {
  return {
    type: types.FETCH_SIGNLE_DATA_FAILURE,
    payload,
  };
};

export const getSingleProduct = (payload) => {
  const id = payload;
  return (dispatch) => {
    dispatch(fetchDataReq());
    axios
      .get(`${process.env.BASEURL}/product/detail/${id}`)
      .then((res) => {
        dispatch(fetchDataSucces(res.data.data))
      })
      .catch((err) => dispatch(fetchDataFaliure(err.data)));
  };
};
