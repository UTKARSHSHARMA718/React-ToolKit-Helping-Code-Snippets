import { configureStore } from "@reduxjs/toolkit";
import thunk from "redux-thunk";
import shopingCart from "./slices/ShopingCartSlice";
const store = configureStore({
  reducer: { shopingCart: shopingCart.reducer },
  middleware:[thunk]
});

export default store;
