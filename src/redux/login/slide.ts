import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import { ASYNC_STATUS } from "../constants";
import instance from "~/services/axios-instance";
import { RootState } from "../store";
import { SignInPayload } from "~/components/pages/Login";

export interface RejectedPayload {
  statusCode: number;
  message: string;
  error: string;
}

export interface User {
  email: string;
  name: string;
  username: string;
  role: string;
}

export interface LoginState {
  data: User;
  status: typeof ASYNC_STATUS[keyof typeof ASYNC_STATUS];
  message: string;
}

const initialState: LoginState = {
  data: {} as unknown as User,
  status: ASYNC_STATUS.IDLE,
  message: "",
};

export const loginState = createSlice({
  name: "login",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(signIn.fulfilled, (state, { payload }) => {
      if (payload.role !== "ADMIN") {
        state.status = ASYNC_STATUS.FAILED;
        state.data = {} as User;
        state.message = "Your role not permission.";
      } else {
        state.status = ASYNC_STATUS.SUCCEED;
        state.data = payload;
        state.message = "";
      }
    });
    builder.addCase(signIn.rejected, (state, action) => {
      state.status = ASYNC_STATUS.FAILED;
      state.message = action.error.message as unknown as string;
    });
    builder.addCase(checkCookieToken.fulfilled, (state, { payload }) => {
      if (payload.role !== "ADMIN") {
        state.status = ASYNC_STATUS.FAILED;
        state.data = {} as User;
        state.message = "Your role not permission.";
      } else {
        state.data = payload;
        state.status = ASYNC_STATUS.SUCCEED;
      }
    });
    builder.addCase(checkCookieToken.pending, (state) => {
      state.status = ASYNC_STATUS.LOADING;
    });
    builder.addCase(checkCookieToken.rejected, (state) => {
      state.status = ASYNC_STATUS.FAILED;
    });
  },
});

export const signIn = createAsyncThunk(
  "login/signIn",
  async (data: SignInPayload): Promise<User> => {
    const { phone, password } = data;
    console.log({
      phone,
      password,
    });
    const response = await instance.post("/api/auth-manager/sign-in", {
      phone,
      password,
    });

    if ("message" in response) {
      return Promise.reject(response);
    }

    return response as unknown as User;
  }
);

export const checkCookieToken = createAsyncThunk(
  "login/checkCookie",
  async (): Promise<User> => {
    const response = await instance.post("/api/auth-manager/check-token");

    if ("message" in response) {
      return Promise.reject(response);
    }

    return response as unknown as User;
  },
  {
    condition: (_, { getState }) => {
      const rootState: RootState = getState() as RootState;

      const loginStatus = rootState.login.status;

      if (
        loginStatus === ASYNC_STATUS.LOADING ||
        loginStatus === ASYNC_STATUS.SUCCEED
      ) {
        return false;
      } else {
        return true;
      }
    },
  }
);

export const logout = createAsyncThunk(
  "login/logout",
  async () => await instance.get("/api/auth/logout")
);

export default loginState.reducer;
