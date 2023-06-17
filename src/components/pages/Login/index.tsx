import React, { useEffect } from "react";
import { Button, Form, Input } from "antd";
import { Navigate } from "react-router-dom";

import Loading from "~/components/common/Loading";

import { LoginContainer } from "./LoginStyled";
import {
  ASYNC_STATUS,
  useAppDispatch,
  useAppSelector,
  signIn,
  checkCookieToken,
} from "~/redux";

export interface SignInPayload {
  phone: string;
  password: string;
}

const Login = () => {
  const { login } = useAppSelector((state) => state);
  const dispatch = useAppDispatch();

  const onFinish = (values: SignInPayload) => {
    dispatch(signIn(values));
  };

  useEffect(() => {
    if (
      login.status !== ASYNC_STATUS.SUCCEED &&
      login.status !== ASYNC_STATUS.LOADING
    )
      dispatch(checkCookieToken());
  }, []);

  if (
    login.status === ASYNC_STATUS.IDLE ||
    login.status === ASYNC_STATUS.LOADING
  ) {
    return <Loading />;
  }

  if (login.status === ASYNC_STATUS.SUCCEED) {
    return <Navigate to="/" replace />;
  }

  return (
    <LoginContainer>
      <Form
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        style={{ maxWidth: 600 }}
        onFinish={onFinish}
        autoComplete="off"
      >
        <Form.Item
          label="Account"
          name="phone"
          rules={[{ required: true, message: "Please input your username!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: "Please input your password!" }]}
        >
          <Input.Password />
        </Form.Item>

        <div>{login.message}</div>

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </LoginContainer>
  );
};

export default Login;
