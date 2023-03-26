import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import instance from "~/services/axios-instance";
import { ASYNC_STATUS } from "../constants";

export interface SupplierType {
  name: string;
  address: string;
  city: string;
  country: string;
  region: string;
  phone: string;
  homepage: string;
  postal_code: string;
}

interface SupplierState {
  data: SupplierType[];
  status: typeof ASYNC_STATUS[keyof typeof ASYNC_STATUS];
}

const initialState: SupplierState = {
  data: [],
  status: ASYNC_STATUS.IDLE,
};

export const supplierSlide = createSlice({
  name: "suppliers",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchSuppliers.pending, (state) => {
      state.status = ASYNC_STATUS.LOADING;
    });
    builder.addCase(fetchSuppliers.fulfilled, (state, action) => {
      state.status = ASYNC_STATUS.SUCCEED;
      state.data = action.payload;
    });
  },
});

export const fetchSuppliers = createAsyncThunk(
  "suppliers/fetchSuppliers",
  async (): Promise<SupplierType[]> => await instance.get("/api/suppliers")
);

export default supplierSlide.reducer;
