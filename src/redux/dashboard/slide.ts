import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import { ASYNC_STATUS } from "../constants";
import { DashboardColumn, DashboardType, ErrorPayload } from "~/shared";
import instance from "~/services/axios-instance";

export interface DashboardPayload {
  startDate: string;
  endDate: string;
  branch: string;
  dashboardType: DashboardType;
}

export interface DashboardTypeRedux {
  data: DashboardColumn[];
  status: typeof ASYNC_STATUS[keyof typeof ASYNC_STATUS];
}

const initialState: DashboardTypeRedux = {
  data: [],
  status: ASYNC_STATUS.IDLE,
};

export const dashboardType = createSlice({
  name: "dashboard",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getDataDashboard.pending, (state) => {
      state.status = ASYNC_STATUS.LOADING;
    });
    builder.addCase(getDataDashboard.fulfilled, (state, action) => {
      state.status = ASYNC_STATUS.SUCCEED;
      state.data = action.payload;
    });
    builder.addCase(getDataDashboard.rejected, (state) => {
      state.status = ASYNC_STATUS.FAILED;
    });
  },
});

export const getDataDashboard = createAsyncThunk(
  "dashboard/getDataDashboard",
  async (payload: DashboardPayload, thunkApi) => {
    const urlParams = new URLSearchParams({
      startDate: payload.startDate,
      endDate: payload.endDate,
      branch: payload.branch,
      dashboardType: payload.dashboardType,
    }).toString();
    const response: DashboardColumn[] | ErrorPayload = await instance.get(
      "/api/dashboard?" + urlParams
    );

    if ("message" in response) {
      return thunkApi.rejectWithValue(response.message);
    }

    return thunkApi.fulfillWithValue(response);
  }
);

export default dashboardType.reducer;
