import { configureStore } from "@reduxjs/toolkit";
// eslint-disable-next-line @typescript-eslint/no-restricted-imports
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";

import { productReducer } from "./product";
import { supplierReducer } from "./supplier";
import { productDetailReducer } from "./product-detail";
import { loginReducer } from "./login";
import { branchReducer } from "./branch";
import { employeeReducer } from "./employee";
import { ordersReducer } from "./orders";
import { dashboardReducer } from "./dashboard";

const store = configureStore({
  reducer: {
    products: productReducer,
    suppliers: supplierReducer,
    productDetail: productDetailReducer,
    login: loginReducer,
    branch: branchReducer,
    employee: employeeReducer,
    orders: ordersReducer,
    dashboard: dashboardReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export default store;
