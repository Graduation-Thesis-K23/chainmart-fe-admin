import React, { useState } from "react";
import {
  ShopOutlined,
  AreaChartOutlined,
  UsergroupAddOutlined,
} from "@ant-design/icons";
import { Layout, Menu, MenuProps } from "antd";

import Dashboard from "./components/Dashboard";
import ProductsManagement from "./components/ProductsManagement";
import EmployeesManagement from "./components/EmployeesManagement";
import OrdersManagement from "./components/OrdersManagement";

const PAGES = {
  DASHBOARD: "DASHBOARD",
  PRODUCTS: "PRODUCTS",
  EMPLOYEES: "EMPLOYEES",
  ORDERS: "ORDERS",
};

const items: MenuProps["items"] = [
  {
    key: "DASHBOARD",
    icon: <AreaChartOutlined />,
    label: "Dashboard",
  },
  {
    key: "PRODUCTS",
    icon: <ShopOutlined />,
    label: "Products Management",
  },
  {
    key: "EMPLOYEES",
    icon: <UsergroupAddOutlined />,
    label: "Employees Management",
  },
  {
    key: "ORDERS",
    icon: <UsergroupAddOutlined />,
    label: "Orders Management",
  },
  {
    key: "SUPPLIER",
    icon: <UsergroupAddOutlined />,
    label: "Supplier Management",
  },
];

const getPage = (page: string) => {
  let Content = Dashboard;
  switch (page) {
    case PAGES.PRODUCTS:
      Content = ProductsManagement;
      break;
    case PAGES.EMPLOYEES:
      Content = EmployeesManagement;
      break;
    case PAGES.ORDERS:
      Content = OrdersManagement;
      break;
  }
  return Content;
};

const Home = () => {
  const [page, setPage] = useState(PAGES.DASHBOARD);

  const onSelect: MenuProps["onSelect"] = (e) => {
    setPage(e.key);
  };

  const Content = getPage(page);

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
          defaultSelectedKeys={[PAGES.DASHBOARD]}
          style={{
            height: "calc(100vh - 64px)",
          }}
          onSelect={onSelect}
          items={items}
        />
      </Layout.Sider>
      <Layout className="site-layout">
        <Layout.Header>
          <div>Chainmart</div>
        </Layout.Header>
        <Layout.Content>
          <Content />
        </Layout.Content>
      </Layout>
    </Layout>
  );
};

export default Home;
