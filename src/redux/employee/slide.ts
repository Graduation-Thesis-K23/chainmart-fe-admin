import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import { ASYNC_STATUS } from "../constants";
import instance from "~/services/axios-instance";
import { BranchType } from "../branch";

export interface EmployeeType {
  id: string;
  name: string;
  phone: string;
  branchId: BranchType;
}

export type AddEmployeeType = Omit<EmployeeType, "id" | "branchId"> & {
  branchId: string;
};

export type UpdateEmployeeType = Omit<EmployeeType, "branchId"> & {
  branchId: string;
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
    builder.addCase(fetchEmployee.fulfilled, (state, { payload }) => {
      state.status = ASYNC_STATUS.SUCCEED;
      state.data = payload;
    });
    builder.addCase(fetchEmployee.pending, (state) => {
      state.status = ASYNC_STATUS.LOADING;
    });
    builder.addCase(addEmployee.pending, (state) => {
      state.status = ASYNC_STATUS.LOADING;
    });
    builder.addCase(addEmployee.fulfilled, (state, { payload }) => {
      state.status = ASYNC_STATUS.SUCCEED;
      state.data.push(payload);
    });
    builder.addCase(updateEmployee.pending, (state) => {
      state.status = ASYNC_STATUS.LOADING;
    });
    builder.addCase(updateEmployee.fulfilled, (state, { payload }) => {
      state.status = ASYNC_STATUS.SUCCEED;

      console.log(payload);

      const i = state.data.findIndex((item) => item.id == payload.id);
      state.data[i] = payload;
    });
  },
});

export const fetchEmployee = createAsyncThunk(
  "employee/getAllEmployee",
  async (): Promise<EmployeeType[]> =>
    await instance.get("/api/employee?role=ADMIN")
);

export const addEmployee = createAsyncThunk(
  "employee/addEmployee",
  async (employee: AddEmployeeType): Promise<EmployeeType> =>
    await instance.post("/api/employee/create-manager", employee)
);

export const updateEmployee = createAsyncThunk(
  "employee/updateEmployee",
  async (employee: UpdateEmployeeType): Promise<EmployeeType> => {
    return await instance.patch(
      "/api/employee/" + employee.id + "/update-manager",
      employee
    );
  }
);

export default employeeState.reducer;
