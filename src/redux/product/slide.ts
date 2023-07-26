import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { FieldValues } from "react-hook-form";

import { ASYNC_STATUS } from "../constants";
import instance from "~/services/axios-instance";
import { SupplierType } from "../supplier";
import { ErrorPayload, PaginationMetadata, PaginationResult } from "~/shared";

export interface ProductType {
  id: string;
  name: string;
  price: number;
  sale: number;
  images: string[];
  created_at: string;
  supplier_id: SupplierType;
  category: string;
  slug: string;
  description: string;
  specifications: string;
  product_code: string;
}

export interface ProductsState {
  data: ProductType[];
  status: typeof ASYNC_STATUS[keyof typeof ASYNC_STATUS];
  metadata: PaginationMetadata;
}

const initialState: ProductsState = {
  data: [],
  status: ASYNC_STATUS.IDLE,
  metadata: {} as PaginationMetadata,
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
      const { docs, totalDocs, limit, totalPages, page } = action.payload;
      state.data = docs;
      state.metadata = {
        totalDocs,
        limit,
        totalPages,
        page,
      };
    });
    builder.addCase(fetchProducts.rejected, (state) => {
      state.status = ASYNC_STATUS.FAILED;
      state.data = [];
    });
    builder.addCase(addProduct.pending, (state) => {
      state.status = ASYNC_STATUS.LOADING;
    });
    builder.addCase(addProduct.fulfilled, (state, action) => {
      state.status = ASYNC_STATUS.SUCCEED;
      state.data.push(action.payload);
    });
    builder.addCase(addProduct.rejected, (state) => {
      state.status = ASYNC_STATUS.FAILED;
      state.data = [];
    });
    builder.addCase(updateProduct.pending, (state) => {
      state.status = ASYNC_STATUS.LOADING;
    });
    builder.addCase(updateProduct.fulfilled, (state, action) => {
      state.status = ASYNC_STATUS.SUCCEED;
      const updated = action.payload;
      const index = state.data.findIndex((item) => item.id === updated.id);
      state.data.splice(index, 1);
      state.data.push(updated);
    });
    builder.addCase(updateProduct.rejected, (state) => {
      state.status = ASYNC_STATUS.FAILED;
      state.data = [];
    });
  },
});

export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async (page: number, thunkApi) => {
    const result: PaginationResult<ProductType> | ErrorPayload =
      await instance.get("/api/products?page=" + page + "&limit=10");

    if ("message" in result) {
      return thunkApi.rejectWithValue(result.message);
    }

    return thunkApi.fulfillWithValue(result);
  }
);
export const addProduct = createAsyncThunk(
  "products/addProduct",
  async (data: object, thunkApi) => {
    const newProduct: ProductType | ErrorPayload = await instance.postForm(
      "/api/products",
      data,
      {
        headers: { "Content-Type": "multipart/form-data" },
      }
    );

    if ("message" in newProduct) {
      return thunkApi.rejectWithValue(newProduct.message);
    }

    return thunkApi.fulfillWithValue(newProduct);
  }
);

export const updateProduct = createAsyncThunk(
  "products/updateProduct",
  async (data: FieldValues, thunkApi) => {
    const { id, ...newData } = data;

    const response: ProductType | ErrorPayload = await instance.patch(
      "/api/products/" + id,
      newData
    );

    if ("message" in response) {
      return thunkApi.rejectWithValue(response.message);
    }

    return thunkApi.fulfillWithValue(response);
  }
);

export default productsSlice.reducer;
