import React, { useEffect, useState } from "react";
import Table, { ColumnsType } from "antd/es/table";

import {
  ASYNC_STATUS,
  fetchOrders,
  useAppDispatch,
  useAppSelector,
} from "~/redux";
import withAuth from "~/hocs/withAuth";
import { Orders, OrdersHeader } from "./styled";
import PageTitle from "~/components/common/PageTitle";
import ReloadButton from "~/components/common/ReloadButton";
import ViewOrder from "./ViewOrder";
import { OrderStatus, OrdersRender, Payment } from "~/shared";
import { Button, Input, Select, Space } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import convertTimestamp from "~/utils/convert-timestamp";

export interface ProductProps {
  name: string;
  price: number;
  sale: number;
  slug: string;
}

interface OrderDetailProps {
  quantity: number;
  order_id: string;
  product_id: string;
  product: {
    name: string;
    price: number;
    sale: number;
    slug: string;
    id: string;
  };
}

interface AddressProps {
  name: string;
  phone: string;
  city: string;
  district: string;
  ward: string;
  street: string;
}

export interface OrderDetailsProps {
  id: string;
  created_at: Date;
  order_details: OrderDetailProps[];
  address: AddressProps;
  status: OrderStatus;
  payment: Payment;
  approved_date?: Date;
  packaged_date?: Date;
  started_date?: Date;
  shipped_date?: Date;
  completed_date?: Date;
  cancelled_date?: Date;
  returned_date?: Date;
  approved_by?: string;
  packaged_by?: string;
  started_by?: string;
  shipped_by?: string;
  cancelled_by?: string;
  returned_by?: string;
  completed_by?: string;
  user_id: string;
  order_code: string;
  branch: {
    name: string;
  };
}

const OrdersManagement = () => {
  const [viewOrderDrawer, setViewOrderDrawer] = useState(false);
  const [viewOrder, setViewOrder] = useState<OrderDetailsProps>(
    {} as OrderDetailsProps
  );
  const [searchText, setSearchText] = useState<string>("");
  const [status, setStatus] = useState<OrderStatus | "all">("all");

  const orders = useAppSelector((state) => state.orders);

  const dispatch = useAppDispatch();

  const columns: ColumnsType<OrdersRender> = [
    {
      title: "No.",
      width: "60px",
      render: (_, __, i) => <span>{i + 1}</span>,
    },
    {
      title: "Create At",
      dataIndex: "created_at",
      render: (created_at) => <span>{convertTimestamp(created_at)}</span>,
    },
    {
      title: "Name",
      dataIndex: "address",
      render: (address) => <span>{address.name}</span>,
    },
    {
      title: "Phone",
      dataIndex: "address",
      render: (address) => <span>{address.phone}</span>,
    },
    {
      title: "Payment",
      dataIndex: "payment",
    },
    {
      title: "Status",
      dataIndex: "status",
      sorter: (a, b) => (a.status > b.status ? 1 : -1),
    },
  ];

  const handleSearch = () => {
    console.log(searchText, status);

    dispatch(
      fetchOrders({
        search: searchText,
        status,
      })
    );
  };

  useEffect(() => {
    if (
      orders.status !== ASYNC_STATUS.SUCCEED &&
      orders.status !== ASYNC_STATUS.LOADING
    ) {
      dispatch(
        fetchOrders({
          search: searchText,
          status,
        })
      );
    }
  }, []);

  return (
    <Orders>
      <OrdersHeader>
        <PageTitle text="Orders Management" />
        {/*  <div>
          <MoreButtonGroup>
            <AppstoreAddOutlined />
            <MoreButton>More</MoreButton>
          </MoreButtonGroup>
        </div> */}
      </OrdersHeader>
      <Space
        style={{
          marginBottom: 16,
        }}
      >
        <Input
          placeholder="Name or Phone"
          style={{
            width: 700,
          }}
          onChange={(e) => setSearchText(e.target.value)}
        />
        <Select
          defaultValue="all"
          style={{ width: 120 }}
          onChange={(value) => setStatus(value as OrderStatus | "all")}
          options={[
            { value: "all", label: "All" },
            { value: OrderStatus.Created, label: "Created" },
            { value: OrderStatus.Approved, label: "Approved" },
            { value: OrderStatus.Packaged, label: "Packaged" },
            { value: OrderStatus.Started, label: "Started" },
            { value: OrderStatus.Completed, label: "Completed" },
            { value: OrderStatus.Cancelled, label: "Cancelled" },
            { value: OrderStatus.Returned, label: "Returned" },
          ]}
        />
        <Button
          type="primary"
          loading={!(orders.status == ASYNC_STATUS.SUCCEED)}
          icon={<SearchOutlined />}
          onClick={handleSearch}
        >
          Search
        </Button>
      </Space>
      <Table
        columns={columns}
        dataSource={orders.data}
        rowKey="id"
        loading={!(orders.status == ASYNC_STATUS.SUCCEED)}
        scroll={{
          scrollToFirstRowOnChange: true,
          y: "calc(100vh - 267px)",
        }}
        pagination={false}
        onRow={(record) => ({
          onClick: () => {
            setViewOrder(record as unknown as OrderDetailsProps);
            setViewOrderDrawer(true);
          },
        })}
      />
      {orders.status === ASYNC_STATUS.FAILED && <ReloadButton />}
      {viewOrderDrawer && (
        <ViewOrder
          order={viewOrder}
          viewOrder={viewOrderDrawer}
          handleViewOrder={setViewOrderDrawer}
        />
      )}
    </Orders>
  );
};

export default withAuth(OrdersManagement);
