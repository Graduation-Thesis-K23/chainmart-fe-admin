import React, { FC, useEffect } from "react";
import { Navigate } from "react-router-dom";

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

    console.log(login);

    useEffect(() => {
      if (login.status === ASYNC_STATUS.IDLE) {
        console.log("s");
        dispatch(checkCookieToken());
      }
    }, []);

    if (
      login.status === ASYNC_STATUS.IDLE ||
      login.status === ASYNC_STATUS.LOADING
    ) {
      return <>loading</>;
    }

    if (login.status === ASYNC_STATUS.FAILED) {
      return <Navigate to="/login" replace />;
    }

    return <Component />;
  };

  return MyComponent;
};

export default withAuth;
