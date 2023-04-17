import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { FieldValues } from "react-hook-form";

import { ASYNC_STATUS } from "../constants";
import instance from "~/services/axios-instance";
import { RootState } from "../store";
import { CategoryType } from "../category";
import { SupplierType } from "../supplier";

export interface ProductType {
  id: string;
  name: string;
  price: number;
  sale?: number;
  quantity: number;
  images: string;
  created_at: string;
  supplier: SupplierType;
  category: CategoryType;
  slug: string;
  expiry_date: string;
  description: string;
  options: string;
  specifications: string;
  units_on_orders: number;
  units_in_stocks: number;
}
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
    builder.addCase(addProduct.pending, (state) => {
      state.status = ASYNC_STATUS.LOADING;
    });
    builder.addCase(addProduct.fulfilled, (state, action) => {
      state.status = ASYNC_STATUS.SUCCEED;
      state.data.push(action.payload as unknown as ProductType);
    });
    builder.addCase(updateProduct.pending, (state) => {
      state.status = ASYNC_STATUS.LOADING;
    });
    builder.addCase(updateProduct.fulfilled, (state, action) => {
      state.status = ASYNC_STATUS.SUCCEED;
      const updated = action.payload as unknown as ProductType;
      const index = state.data.findIndex((item) => item.id === updated.id);
      state.data.splice(index, 1);
      state.data.push(updated);
    });
  },
});

export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async (): Promise<ProductType[]> => await instance.get("/api/products"),
  {
    condition: (_, { getState }) => {
      const rootState: RootState = getState() as RootState;

      const productsStateStatus = rootState.products.status;

      if (
        productsStateStatus === ASYNC_STATUS.LOADING ||
        productsStateStatus === ASYNC_STATUS.SUCCEED
      ) {
        return false;
      } else {
        return true;
      }
    },
  }
);
export const addProduct = createAsyncThunk(
  "products/addProduct",
  async (data: object) =>
    await instance.postForm("/api/products", data, {
      headers: { "Content-Type": "multipart/form-data" },
    })
);

export const updateProduct = createAsyncThunk(
  "products/updateProduct",
  async (data: FieldValues) => {
    const { id, ...newData } = data;

    return await instance.patch("/api/products/" + id, newData);
  }
);

export default productsSlice.reducer;
