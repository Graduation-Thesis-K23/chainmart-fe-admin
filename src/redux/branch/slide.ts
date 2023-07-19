import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import { ASYNC_STATUS } from "../constants";
import instance from "~/services/axios-instance";
import { ErrorPayload } from "~/shared";

export interface BranchType {
  id: string;
  name: string;
  city: string;
  district: string;
  ward: string;
  address: string;
  phone: string;
  active: boolean;
}

export type AddBranchType = Omit<BranchType, "id">;

export interface BranchState {
  data: BranchType[];
  status: typeof ASYNC_STATUS[keyof typeof ASYNC_STATUS];
}

const initialState: BranchState = {
  data: [],
  status: ASYNC_STATUS.IDLE,
};

export const branchState = createSlice({
  name: "branch",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchBranch.fulfilled, (state, { payload }) => {
      state.status = ASYNC_STATUS.SUCCEED;
      state.data = payload;
    });
    builder.addCase(fetchBranch.pending, (state) => {
      state.status = ASYNC_STATUS.LOADING;
    });
    builder.addCase(addBranch.pending, (state) => {
      state.status = ASYNC_STATUS.LOADING;
    });
    builder.addCase(addBranch.fulfilled, (state, { payload }) => {
      state.status = ASYNC_STATUS.SUCCEED;
      state.data.push(payload);
    });
    builder.addCase(addBranch.rejected, (state) => {
      state.status = ASYNC_STATUS.FAILED;
    });
    builder.addCase(updateBranch.pending, (state) => {
      state.status = ASYNC_STATUS.LOADING;
    });
    builder.addCase(updateBranch.fulfilled, (state, { payload }) => {
      state.status = ASYNC_STATUS.SUCCEED;

      const i = state.data.findIndex((item) => item.id == payload.id);
      state.data[i] = payload;
    });
    builder.addCase(updateBranch.rejected, (state) => {
      state.status = ASYNC_STATUS.FAILED;
    });
  },
});

export const fetchBranch = createAsyncThunk(
  "branch/getAllBranch",
  async (_, thunkApi) => {
    const result: BranchType[] | ErrorPayload = await instance.get(
      "/api/branch"
    );

    if ("message" in result) {
      return thunkApi.rejectWithValue(result.message);
    }

    return thunkApi.fulfillWithValue(result);
  }
);

export const addBranch = createAsyncThunk(
  "branch/addBranch",
  async (branch: AddBranchType, thunkApi) => {
    const result: BranchType | ErrorPayload = await instance.post(
      "/api/branch",
      branch
    );

    if ("message" in result) {
      return thunkApi.rejectWithValue(result.message);
    }

    return thunkApi.fulfillWithValue(result);
  }
);

export const updateBranch = createAsyncThunk(
  "branch/updateBranch",
  async (branch: BranchType, thunkApi) => {
    const result: BranchType | ErrorPayload = await instance.patch(
      "/api/branch/" + branch.id,
      branch
    );

    if ("message" in result) {
      return thunkApi.rejectWithValue(result.message);
    }

    return thunkApi.fulfillWithValue(result);
  }
);

export default branchState.reducer;
