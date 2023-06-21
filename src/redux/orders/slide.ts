import { createSlice } from "@reduxjs/toolkit";

import { ASYNC_STATUS } from "../constants";

export interface OrdersType {
  id: string;
  name: string;
  phone: string;
  branchId: string;
}

export interface OrdersState {
  data: OrdersType[];
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
});

export default ordersState.reducer;
