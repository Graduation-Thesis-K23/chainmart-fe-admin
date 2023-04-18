import React, { FC, useEffect } from "react";
import { Navigate } from "react-router-dom";

import Loading from "~/components/common/Loading";

import {
  ASYNC_STATUS,
  checkCookieToken,
  useAppDispatch,
  useAppSelector,
} from "~/redux";

const withAuth = (Component: FC) => {
  const MyComponent = () => {
    const login = useAppSelector((state) => state.login);
    const dispatch = useAppDispatch();

    useEffect(() => {
      if (login.status === ASYNC_STATUS.IDLE) {
        dispatch(checkCookieToken());
      }
    }, []);

    if (
      login.status === ASYNC_STATUS.IDLE ||
      login.status === ASYNC_STATUS.LOADING
    ) {
      return <Loading />;
    }

    if (login.status === ASYNC_STATUS.FAILED) {
      return <Navigate to="/login" replace />;
    }

    return <Component />;
  };

  return MyComponent;
};

export default withAuth;
