import { createStore, combineReducers, applyMiddleware, compose } from "redux";

import thunk from "redux-thunk";

import productReducer from "./Products/reducer";
import authReducer from "./Auth/reducer";
import singleProductReducer from "./SingleProduct/reducer";
import cartReducer from "./Cart/reducer";
import checkoutReducer from "./Checkout/reducer";

const rootReducer = combineReducers({
  ecommerceData: productReducer,
  isAuth: authReducer,
  singleProduct: singleProductReducer,
  checkoutData: checkoutReducer,
  cartData: cartReducer,
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunk))
);
