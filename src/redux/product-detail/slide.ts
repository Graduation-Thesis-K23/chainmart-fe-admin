import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import { ASYNC_STATUS } from "../constants";
import instance from "~/services/axios-instance";
import { ProductType } from "../product/slide";

export interface ProductState {
  data: ProductType;
  status: typeof ASYNC_STATUS[keyof typeof ASYNC_STATUS];
}

const initialState: ProductState = {
  data: {} as ProductType,
  status: ASYNC_STATUS.IDLE,
};

export const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchProduct.pending, (state) => {
      state.status = ASYNC_STATUS.LOADING;
    });
    builder.addCase(fetchProduct.fulfilled, (state, action) => {
      state.status = ASYNC_STATUS.SUCCEED;
      state.data = action.payload as unknown as ProductType;
    });
    builder.addCase(reFetchProduct.fulfilled, (state) => {
      state.status = ASYNC_STATUS.LOADING;
      state.data = {} as unknown as ProductType;
    });
  },
});

export const fetchProduct = createAsyncThunk(
  "product/fetchProduct",
  async (id: string): Promise<ProductType> =>
    await instance.get("/api/products/" + id)
);

export const reFetchProduct = createAsyncThunk(
  "product/reFetchProduct",
  async (): Promise<void> => {
    return;
  }
);

export default productSlice.reducer;
