import * as types from "./actionTypes";

const initialState = {
  products: [],
  filteredProducts: [],
  error: "",
  isLoading: true,
};

const reducer = (state = initialState, action) => {
  const { type, payload } = action;
  
  switch (type) {
    case types.FETCH_DATA_REQ:
      return {
        ...state,
        error: "",
        isLoading: true,
      };
    case types.FETCH_DATA_SUCCESS:
      return {
        ...state,
        products: payload,
        isLoading: false,
      };
    case types.FETCH_DATA_FAILURE:
      return {
        ...state,
        error: payload,
        isLoading: false,
      };
    case types.FILTER_BY:
      const filteredProducts =
        payload === "all"
          ? state.products
          : state.products.filter((product) => {
              return product.catagory === payload;
            });
      return {
        ...state,
        filteredProducts: [...filteredProducts],
      };
    case types.SORT_BY_PRICE:
      const sortedPriceProducts = [
        ...(state.filteredProducts.length > 0
          ? state.filteredProducts
          : state.products),
      ];
      sortedPriceProducts.sort((a, b) => {
        if (payload.orderPrice === "ascPrice") {
          return a.price - b.price;
        } else {
          return b.price - a.price;
        }
      });
      return {
        ...state,
        filteredProducts: [...sortedPriceProducts],
      };
    case types.SORT_BY_RATING:
      const sortedRatingProducts = [
        ...(state.filteredProducts.length > 0
          ? state.filteredProducts
          : state.products),
      ];
      sortedRatingProducts.sort((a, b) => {
        if (payload.orderRating === "ascRating") {
          return a.rating - b.rating;
        } else {
          return b.rating - a.rating;
        }
      });
      return {
        ...state,
        filteredProducts: [...sortedRatingProducts],
      };
    default:
      return state;
  }
};

export default reducer;
