import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import {
  productsReducer,
  productDetailsReducer,
} from "./reducers/ProductReducer";
import { registerUserReducer, loginUserReducer } from "./reducers/UserReducer";

const reducer = combineReducers({
  products: productsReducer,
  productDetails: productDetailsReducer,
  registerUserReducer: registerUserReducer,
  loginUserReducer: loginUserReducer,
});

let initialState = {
  loginUserReducer: {
    currentUser: localStorage.getItem("currentUser")
      ? JSON.parse(localStorage.getItem("currentUser"))
      : null,
  },
};

const middleWare = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleWare))
);

export default store;
