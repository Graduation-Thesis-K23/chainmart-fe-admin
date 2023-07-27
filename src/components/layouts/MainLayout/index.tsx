import React, { FC, ReactElement, memo } from "react";
import { Layout, Menu } from "antd";
import type { MenuProps } from "antd";
import {
  ShopOutlined,
  AreaChartOutlined,
  UsergroupAddOutlined,
  ApartmentOutlined,
  AuditOutlined,
} from "@ant-design/icons";
import { Link } from "react-router-dom";
import { Header, HomeLink, Image } from "./styled";
import logo from "~/assets/images/logo.png";
import Avatar from "./Avatar";
import { ASYNC_STATUS, useAppSelector } from "~/redux";
import { LoadingLarge } from "~/components/common";

const PAGES = {
  DASHBOARD: "DASHBOARD",
  PRODUCTS: "PRODUCTS",
  EMPLOYEES: "EMPLOYEES",
  ORDERS: "ORDERS",
  SUPPLIERS: "SUPPLIERS",
  BRANCH: "BRANCH",
};

const items: MenuProps["items"] = [
  {
    key: PAGES.DASHBOARD,
    icon: <AreaChartOutlined />,
    label: (
      <Link to="/">
        <span>Dashboard</span>
      </Link>
    ),
  },
  {
    key: PAGES.PRODUCTS,
    icon: <ShopOutlined />,
    label: <Link to="/products">Products Management</Link>,
  },
  {
    key: PAGES.EMPLOYEES,
    icon: <UsergroupAddOutlined />,
    label: <Link to="/employees">Employees Management</Link>,
  },
  /*  {
    key: PAGES.ORDERS,
    icon: <CodepenOutlined />,
    label: <Link to="/orders">Orders Management</Link>,
  }, */
  {
    key: PAGES.BRANCH,
    icon: <ApartmentOutlined />,
    label: <Link to="/branch">Branch Management</Link>,
  },
  {
    key: PAGES.SUPPLIERS,
    icon: <AuditOutlined />,
    label: <Link to="/suppliers">Suppliers Management</Link>,
  },
];

const MainLayout: FC<{
  children: ReactElement;
}> = ({ children }) => {
  const { status } = useAppSelector((state) => state.login);

  if (status === ASYNC_STATUS.IDLE || status === ASYNC_STATUS.LOADING) {
    return (
      <>
        {children}
        <LoadingLarge />
      </>
    );
  }

  return (
    <Layout>
      <Layout.Sider width={250} theme="light">
        <HomeLink to="/">
          <Image src={logo} alt="logo" height={50} />
        </HomeLink>
        <Menu
          mode="inline"
          style={{
            height: "calc(100vh - 64px)",
          }}
          items={items}
        />
      </Layout.Sider>
      <Layout>
        <Header>
          <div />
          <Avatar />
        </Header>
        <Layout.Content>{children}</Layout.Content>
      </Layout>
    </Layout>
  );
};

export default memo(MainLayout);
