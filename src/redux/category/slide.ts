import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { ASYNC_STATUS } from "../constants";
import categoryList, { CategoryType } from "../mocks/get-categories";

interface CategoryState {
  data: CategoryType[];
  status: typeof ASYNC_STATUS[keyof typeof ASYNC_STATUS];
}

const initialState: CategoryState = {
  data: [],
  status: ASYNC_STATUS.IDLE,
};

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
  },
});

export const fetchCategories = createAsyncThunk(
  "categories/fetchCategories",
  async () => {
    await new Promise((resolve) => setTimeout(resolve, 1000));

    return categoryList;
  }
);

export default categorySlide.reducer;
