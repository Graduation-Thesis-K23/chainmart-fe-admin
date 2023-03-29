import { RootState } from "./../store";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import instance from "~/services/axios-instance";
import { ASYNC_STATUS } from "../constants";

export interface SupplierType {
  id: string;
  name: string;
  address: string;
  city: string;
  country: string;
  region: string;
  phone: string;
  homepage: string;
  postal_code: string;
}

export type AddSupplierType = Omit<SupplierType, "id">;
export type UpdateSupplierType = Omit<SupplierType, "id">;
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
    builder.addCase(addSupplier.pending, (state) => {
      state.status = ASYNC_STATUS.LOADING;
    });
    builder.addCase(addSupplier.fulfilled, (state, action) => {
      state.status = ASYNC_STATUS.SUCCEED;
      state.data.push(action.payload);
    });
    builder.addCase(updateSupplier.pending, (state) => {
      state.status = ASYNC_STATUS.LOADING;
    });
    builder.addCase(updateSupplier.fulfilled, (state, action) => {
      state.status = ASYNC_STATUS.SUCCEED;
      const newSupplier: SupplierType = action.payload;
      const i = state.data.findIndex((item) => item.id == newSupplier.id);
      state.data[i] = newSupplier;
    });
  },
});

export const fetchSuppliers = createAsyncThunk(
  "suppliers/fetchSuppliers",
  async (): Promise<SupplierType[]> => await instance.get("/api/suppliers"),
  {
    condition: (_, { getState }) => {
      const rootState: RootState = getState() as RootState;

      const supplierStateStatus = rootState.suppliers.status;

      if (
        supplierStateStatus === ASYNC_STATUS.LOADING ||
        supplierStateStatus === ASYNC_STATUS.SUCCEED
      ) {
        return false;
      }
    },
  }
);

export const addSupplier = createAsyncThunk(
  "suppliers/addSupplier",
  async (data: AddSupplierType): Promise<SupplierType> =>
    await instance.post("/api/suppliers", data)
);

export const updateSupplier = createAsyncThunk(
  "suppliers/updateSupplier",
  async (data: SupplierType): Promise<SupplierType> =>
    await instance.patch(`/api/suppliers/${data.id}`, data)
);

export default supplierSlide.reducer;
