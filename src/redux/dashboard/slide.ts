import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import { ASYNC_STATUS } from "../constants";
import { ErrorPayload } from "~/shared";

interface DashboardColumn {
  name: string;
  uv: number;
  pv?: number;
  amt?: number;
}

export interface DashboardPayload {
  startDate: string;
  endDate: string;
  branch: string;
  dashboardType: string;
}

export interface DashboardType {
  data: DashboardColumn[];
  status: typeof ASYNC_STATUS[keyof typeof ASYNC_STATUS];
}

const initialState: DashboardType = {
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
    /* const response: DashboardColumn[] | ErrorPayload = await instance.post(
      "/api/dashboard",
      payload
    ); */

    const response: DashboardColumn[] | ErrorPayload = await new Promise(
      (resolve) => {
        setTimeout(() => {
          resolve([
            {
              name: "Branch 1",
              uv: Math.floor(Math.random() * 1000),
            },
            {
              name: "Branch 2",
              uv: Math.floor(Math.random() * 1000),
            },
            {
              name: "Branch 3",
              uv: Math.floor(Math.random() * 1000),
            },
            {
              name: "Branch 4",
              uv: Math.floor(Math.random() * 1000),
            },
            {
              name: "Branch 5",
              uv: Math.floor(Math.random() * 1000),
            },
            {
              name: "Branch 6",
              uv: Math.floor(Math.random() * 1000),
            },
            {
              name: "Branch 7",
              uv: Math.floor(Math.random() * 1000),
            },
            {
              name: "Branch 8",
              uv: Math.floor(Math.random() * 1000),
            },
          ]);
        }, 1000);
      }
    );

    if ("message" in response) {
      return thunkApi.rejectWithValue(response.message);
    }

    return thunkApi.fulfillWithValue(response);
  }
);

export default dashboardType.reducer;
