import axios from "axios";
import * as types from "./actionTypes";

export const fetchDataReq = () => {
  return {
    type: types.FETCH_DATA_REQ,
  };
};
export const fetchDataSucces = (payload) => {
  return {
    type: types.FETCH_DATA_SUCCESS,
    payload,
  };
};
export const fetchDataFaliure = (payload) => {
  return {
    type: types.FETCH_DATA_FAILURE,
    payload,
  };
};

// Filter Data Action
export const filterBy = (category) => {
  return {
    type: types.FILTER_BY,
    payload: category,
  };
};

export const sortByPrice = (orderPrice) => {
  return {
    type: types.SORT_BY_PRICE,
    payload: { orderPrice },
  };
};

export const sortByRating = (orderRating) => {
  return {
    type: types.SORT_BY_RATING,
    payload: { orderRating },
  };
};

export const fetchData = () => {
  return (dispatch) => {
    dispatch(fetchDataReq());
    axios
      .get(`${process.env.BASEURL}/product/products`)
      .then((res) => dispatch(fetchDataSucces(res.data.data)))
      .catch((err) => dispatch(fetchDataFaliure(err.data)));
  };
};
