import React, { useEffect } from "react";
import { Table } from "antd";
import { AppstoreAddOutlined } from "@ant-design/icons";
import { ColumnsType } from "antd/es/table";

import {
  Suppliers,
  SuppliersHeader,
  Title,
  MoreButtonGroup,
  MoreButton,
} from "./styled";
import { fetchSuppliers, SupplierType } from "~/redux/supplier";
import { useAppDispatch, useAppSelector } from "~/redux";
import { ASYNC_STATUS } from "~/redux/constants";

const columns: ColumnsType<SupplierType> = [
  {
    title: "No",
    width: "10%",
    render: (_, __, i) => <span>{i + 1}</span>,
  },
  {
    title: "Name",
    dataIndex: "name",
    width: "30%",
  },
  {
    title: "City",
    dataIndex: "city",
  },
  {
    title: "Country",
    dataIndex: "country",
  },
  {
    title: "Region",
    dataIndex: "region",
  },
  {
    title: "Phone",
    dataIndex: "phone",
  },
  {
    title: "Homepage",
    dataIndex: "homepage",
  },
  {
    title: "Postal Code",
    dataIndex: "postal_code",
  },
];

const SuppliersManagement = () => {
  const dispatch = useAppDispatch();
  const suppliers = useAppSelector((state) => state.suppliers);

  useEffect(() => {
    dispatch(fetchSuppliers());
  }, []);

  return (
    <Suppliers>
      <SuppliersHeader>
        <Title>Products Management</Title>
        <div>
          <MoreButtonGroup>
            <AppstoreAddOutlined />
            <MoreButton>More</MoreButton>
          </MoreButtonGroup>
        </div>
      </SuppliersHeader>
      <Table
        columns={columns}
        dataSource={suppliers.data}
        loading={!(suppliers.status == ASYNC_STATUS.SUCCEED)}
        scroll={{
          scrollToFirstRowOnChange: true,
          y: "calc(100vh - 220px)",
        }}
        pagination={false}
        rowKey="id"
      />
    </Suppliers>
  );
};

export default SuppliersManagement;
