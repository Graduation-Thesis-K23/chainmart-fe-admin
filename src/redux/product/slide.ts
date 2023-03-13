import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import { ASYNC_STATUS } from "../constants";
import productList from "../mocks/get-products";
import { ProductType } from "../mocks/get-products";

export interface ProductsState {
  data: ProductType[];
  status: typeof ASYNC_STATUS[keyof typeof ASYNC_STATUS];
}

const initialState: ProductsState = {
  data: [],
  status: ASYNC_STATUS.IDLE,
};

export const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchProducts.pending, (state) => {
      state.status = ASYNC_STATUS.LOADING;
    });
    builder.addCase(fetchProducts.fulfilled, (state, action) => {
      state.status = ASYNC_STATUS.SUCCEED;
      state.data = action.payload;
    });
  },
});

export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async () => {
    await new Promise((resolve) => setTimeout(resolve, 1000));

    return productList;
  }
);

export default productsSlice.reducer;
