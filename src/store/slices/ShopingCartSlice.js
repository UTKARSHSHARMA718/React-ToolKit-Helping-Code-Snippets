import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";

const shopingCart = createSlice({
  name: "shoping cart",
  initialState: { cart: [], status: "idle", otherUserCarts: [] },
  reducers: {
    addChoclate(state, actions) {
      state.cart.push("choclates");
    },
    addCandies(state, actions) {
      state.cart.push("candies");
    },
    addSoftDrinks(state, actions) {
      state.cart.push("soft drinks");
    },
    addChinese(state, actions) {
      state.cart.push("chinese");
    },
    removeItems(state, actions) {
      const indexToRemove = state.cart.indexOf(actions.payload);
      if (indexToRemove !== -1) {
        state.cart.splice(indexToRemove, 1);
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchOtherUserCart.pending, (state, actions) => {
      state.status = "loading";
    });
    builder.addCase(fetchOtherUserCart.fulfilled, (state, actions) => {
      state.status = "fulfilled";
      state.otherUserCarts = actions.payload;
    });
    builder.addCase(fetchOtherUserCart.rejected, (state, actions) => {
      state.status = "rejected";
      alert("reuqest cannot fulfilled due to an error");
    });
  },
});

export const fetchOtherUserCart = createAsyncThunk(
  "get/fetchOtherUserCart",
  async () => {
    try {
      const data = await fetch("https://dummyjson.com/carts");
      const response = await data.json();
      console.log("hello its fetch", response);
      return response.carts;
    } catch (err) {
      console.log(err);
    }
  }
);

export const {
  addChoclate,
  addCandies,
  addChinese,
  addSoftDrinks,
  removeItems,
} = shopingCart.actions;
export default shopingCart;
