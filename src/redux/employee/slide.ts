import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import { ASYNC_STATUS } from "../constants";
import instance from "~/services/axios-instance";
import { BranchType } from "../branch";
import { ErrorPayload } from "~/shared";

export interface EmployeeType {
  id: string;
  name: string;
  phone: string;
  branch: BranchType;
  isActive: boolean;
}

export type AddEmployeeType = Omit<
  EmployeeType,
  "isActive" | "id" | "branch"
> & {
  branch_id: string;
};

export type UpdateEmployeeType = Omit<EmployeeType, "branch"> & {
  branch_id: string;
};

export interface EmployeeState {
  data: EmployeeType[];
  status: typeof ASYNC_STATUS[keyof typeof ASYNC_STATUS];
}

const initialState: EmployeeState = {
  data: [],
  status: ASYNC_STATUS.IDLE,
};

export const employeeState = createSlice({
  name: "employee",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchEmployee.pending, (state) => {
      state.status = ASYNC_STATUS.LOADING;
    });
    builder.addCase(fetchEmployee.fulfilled, (state, { payload }) => {
      state.status = ASYNC_STATUS.SUCCEED;
      state.data = payload;
    });
    builder.addCase(fetchEmployee.rejected, (state) => {
      state.status = ASYNC_STATUS.FAILED;
      state.data = [];
    });
    builder.addCase(addEmployee.pending, (state) => {
      state.status = ASYNC_STATUS.LOADING;
    });
    builder.addCase(addEmployee.fulfilled, (state, { payload }) => {
      state.status = ASYNC_STATUS.SUCCEED;
      state.data.push(payload);
    });
    builder.addCase(addEmployee.rejected, (state) => {
      state.status = ASYNC_STATUS.FAILED;
    });
    builder.addCase(updateEmployee.pending, (state) => {
      state.status = ASYNC_STATUS.LOADING;
    });
    builder.addCase(updateEmployee.fulfilled, (state, { payload }) => {
      state.status = ASYNC_STATUS.SUCCEED;
      const i = state.data.findIndex((item) => item.id == payload.id);
      state.data[i] = payload;
    });
  },
});

export const fetchEmployee = createAsyncThunk(
  "employee/getAllEmployee",
  async (_, thunkApi) => {
    const response: EmployeeType[] | ErrorPayload = await instance.get(
      "/api/employee?role=ADMIN"
    );

    if ("message" in response) {
      return thunkApi.rejectWithValue(response);
    }

    return thunkApi.fulfillWithValue(response);
  }
);

export const addEmployee = createAsyncThunk(
  "employee/addEmployee",
  async (employee: AddEmployeeType, thunkApi) => {
    const response: EmployeeType | ErrorPayload = await instance.post(
      "/api/employee/create-manager",
      employee
    );

    if ("message" in response) {
      return thunkApi.rejectWithValue(response.message);
    }

    return thunkApi.fulfillWithValue(response);
  }
);

export const updateEmployee = createAsyncThunk(
  "employee/updateEmployee",
  async (employee: UpdateEmployeeType, thunkApi) => {
    const response: EmployeeType | ErrorPayload = await instance.patch(
      "/api/employee/" + employee.id + "/update-manager",
      employee
    );

    if ("message" in response) {
      return thunkApi.rejectWithValue(response.message);
    }

    return thunkApi.fulfillWithValue(response);
  }
);

export const resetPassword = createAsyncThunk(
  "employee/resetPassword",
  async (id: string, thunkApi) => {
    const response: EmployeeType | ErrorPayload = await instance.get(
      "/api/employee/reset-password/" + id
    );

    if ("message" in response) {
      return thunkApi.rejectWithValue(response.message as unknown as string);
    }

    return thunkApi.fulfillWithValue(response as unknown as EmployeeType);
  }
);

export default employeeState.reducer;
