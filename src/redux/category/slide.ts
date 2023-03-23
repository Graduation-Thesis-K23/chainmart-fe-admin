import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { ASYNC_STATUS } from "../constants";
import instance from "~/services/axios-instance";

export interface CategoryType {
  id: string;
  name: string;
  description: string;
}

interface CategoryState {
  data: CategoryType[];
  status: typeof ASYNC_STATUS[keyof typeof ASYNC_STATUS];
}

const initialState: CategoryState = {
  data: [],
  status: ASYNC_STATUS.IDLE,
};

type AddCategory = Omit<CategoryType, "id">;

export const categorySlide = createSlice({
  name: "categories",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchCategories.pending, (state) => {
      state.status = ASYNC_STATUS.LOADING;
    });
    builder.addCase(fetchCategories.fulfilled, (state, action) => {
      state.status = ASYNC_STATUS.SUCCEED;
      state.data = action.payload;
    });
    builder.addCase(addCategory.pending, (state) => {
      state.status = ASYNC_STATUS.LOADING;
    });
    builder.addCase(addCategory.fulfilled, (state, action) => {
      state.status = ASYNC_STATUS.SUCCEED;
      state.data.push(action.payload);
    });
    builder.addCase(deleteCategory.pending, (state) => {
      state.status = ASYNC_STATUS.LOADING;
    });
    builder.addCase(deleteCategory.fulfilled, (state, action) => {
      state.status = ASYNC_STATUS.SUCCEED;
      state.data = state.data.filter(
        (category) => category.id !== action.payload
      );
    });
  },
});

export const fetchCategories = createAsyncThunk(
  "categories/fetchCategories",
  async (): Promise<CategoryType[]> => await instance.get("/api/categories")
);

export const addCategory = createAsyncThunk(
  "categories/addCategories",
  async (data: AddCategory): Promise<CategoryType> =>
    await instance.post("/api/categories", data)
);

export const deleteCategory = createAsyncThunk(
  "categories/deleteCategory",
  async (id: string): Promise<string> => {
    await instance.delete(`/api/categories/${id}`);

    return id;
  }
);

export default categorySlide.reducer;
