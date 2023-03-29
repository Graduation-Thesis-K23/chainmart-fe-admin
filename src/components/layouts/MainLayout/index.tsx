import React, { FC, ReactElement, memo } from "react";
import { Layout, Menu, MenuProps } from "antd";
import {
  ShopOutlined,
  AreaChartOutlined,
  UsergroupAddOutlined,
} from "@ant-design/icons";
import { Link } from "react-router-dom";

const PAGES = {
  DASHBOARD: "DASHBOARD",
  PRODUCTS: "PRODUCTS",
  EMPLOYEES: "EMPLOYEES",
  ORDERS: "ORDERS",
  SUPPLIERS: "SUPPLIERS",
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
  {
    key: PAGES.ORDERS,
    icon: <UsergroupAddOutlined />,
    label: <Link to="/orders">Orders Management</Link>,
  },
  {
    key: PAGES.SUPPLIERS,
    icon: <UsergroupAddOutlined />,
    label: <Link to="/suppliers">Suppliers Management</Link>,
  },
];

const MainLayout: FC<{
  children: ReactElement;
}> = ({ children }) => {
  return (
    <Layout>
      <Layout.Sider width={250}>
        <div
          style={{
            height: 64,
          }}
        ></div>
        <Menu
          mode="inline"
          style={{
            height: "calc(100vh - 64px)",
          }}
          items={items}
        />
      </Layout.Sider>
      <Layout className="site-layout">
        <Layout.Header>
          <div>Chainmart</div>
        </Layout.Header>
        <Layout.Content>{children}</Layout.Content>
      </Layout>
    </Layout>
  );
};

export default memo(MainLayout);
