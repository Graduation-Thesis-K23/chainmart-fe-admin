import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { ASYNC_STATUS } from "../constants";
import instance from "~/services/axios-instance";
import { ErrorPayload, OrderStatus } from "~/shared";

export interface OrdersType {
  id: string;
  name: string;
  phone: string;
  branchId: string;
}

interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  username: string;
}

export interface OrdersRender extends OrdersType {
  created_at: Date;
  user: User;
  estimated_shipped_date: Date;
  status: OrderStatus;
  total: number;
  payment: string;
}

export interface OrdersState {
  data: OrdersRender[];
  status: typeof ASYNC_STATUS[keyof typeof ASYNC_STATUS];
}

const initialState: OrdersState = {
  data: [],
  status: ASYNC_STATUS.IDLE,
};

export const ordersState = createSlice({
  name: "orders",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchOrders.pending, (state) => {
      state.status = ASYNC_STATUS.LOADING;
    });
    builder.addCase(fetchOrders.fulfilled, (state, action) => {
      state.status = ASYNC_STATUS.SUCCEED;
      state.data = action.payload;
    });
    builder.addCase(fetchOrders.rejected, (state) => {
      state.status = ASYNC_STATUS.FAILED;
    });
  },
});

export const fetchOrders = createAsyncThunk(
  "orders/fetchOrders",
  async (_, thunkApi) => {
    const response: OrdersRender[] | ErrorPayload = await instance.get(
      "/api/orders"
    );

    if ("message" in response) {
      return thunkApi.rejectWithValue(response);
    }

    return thunkApi.fulfillWithValue(response);
  }
);

export default ordersState.reducer;
