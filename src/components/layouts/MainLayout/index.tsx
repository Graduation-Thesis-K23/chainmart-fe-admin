import React from "react";
import {
  UserOutlined,
  LaptopOutlined,
  NotificationOutlined,
} from "@ant-design/icons";
import { Layout, Menu, MenuProps } from "antd";

const items: MenuProps["items"] = [
  UserOutlined,
  LaptopOutlined,
  NotificationOutlined,
].map((icon, index) => {
  const key = String(index + 1);

  return {
    key: `sub${key}`,
    icon: React.createElement(icon),
    label: `subnav ${key}`,

    children: new Array(4).fill(null).map((_, j) => {
      const subKey = index * 4 + j + 1;
      return {
        key: subKey,
        label: `option${subKey}`,
      };
    }),
  };
});

const MainLayout: React.FC<{
  children: JSX.Element;
}> = ({ children }) => {
  return (
    <Layout>
      <Layout.Sider>
        <div
          style={{
            height: 64,
          }}
        ></div>
        <Menu
          mode="inline"
          defaultSelectedKeys={["1"]}
          style={{
            height: "calc(100vh - 64px)",
          }}
          items={items}
        />
      </Layout.Sider>
      <Layout className="site-layout">
        <Layout.Header>
          <div>Header</div>
        </Layout.Header>
        {children}
      </Layout>
    </Layout>
  );
};

export default MainLayout;
