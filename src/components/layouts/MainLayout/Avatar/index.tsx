import { UserOutlined } from "@ant-design/icons";
import { MenuProps } from "antd/es/menu";
import { Avatar as Avt, Divider, Dropdown } from "antd";
import React from "react";
import { ASYNC_STATUS, logout, useAppDispatch, useAppSelector } from "~/redux";
import { Email, Menu, Name } from "./styled";

const Avatar = () => {
  const dispatch = useAppDispatch();

  const handleLogout = async () => {
    await dispatch(logout());
    window.location.href = "/login";
  };

  const items: MenuProps["items"] = [
    {
      key: "3",
      label: <p onClick={handleLogout}>Logout</p>,
    },
  ];

  const { data, status } = useAppSelector((state) => state.login);

  return (
    <Dropdown
      menu={{ items, theme: "light" }}
      placement="bottomRight"
      arrow
      dropdownRender={(menu) => (
        <Menu>
          {status === ASYNC_STATUS.SUCCEED ? (
            <>
              <Name>{data.name}</Name>
              <Email>{data.phone}</Email>
            </>
          ) : (
            <></>
          )}
          <Divider style={{ margin: 0 }} />
          {React.cloneElement(menu as React.ReactElement)}
        </Menu>
      )}
    >
      <Avt size={40} icon={<UserOutlined />} />
    </Dropdown>
  );
};

export default Avatar;
