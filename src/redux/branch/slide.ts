import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import { ASYNC_STATUS } from "../constants";
import instance from "~/services/axios-instance";

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
    builder.addCase(updateBranch.pending, (state) => {
      state.status = ASYNC_STATUS.LOADING;
    });
    builder.addCase(updateBranch.fulfilled, (state, { payload }) => {
      state.status = ASYNC_STATUS.SUCCEED;

      const i = state.data.findIndex((item) => item.id == payload.id);
      state.data[i] = payload;
    });
  },
});

export const fetchBranch = createAsyncThunk(
  "branch/getAllBranch",
  async (): Promise<BranchType[]> => await instance.get("/api/branch")
);

export const addBranch = createAsyncThunk(
  "branch/addBranch",
  async (branch: AddBranchType): Promise<BranchType> => {
    return await instance.post("/api/branch", branch);
  }
);

export const updateBranch = createAsyncThunk(
  "branch/updateBranch",
  async (branch: BranchType): Promise<BranchType> => {
    return await instance.patch("/api/branch/" + branch.id, branch);
  }
);

export default branchState.reducer;
