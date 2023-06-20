import React, { useState, useRef, useEffect } from "react";
import { AppstoreAddOutlined, SearchOutlined } from "@ant-design/icons";
import { FilterConfirmProps } from "antd/es/table/interface";
import { Button, Input, InputRef, Space } from "antd";
import Table, { ColumnType, ColumnsType } from "antd/es/table";
import Highlighter from "react-highlight-words";

import { ASYNC_STATUS, ProductType, useAppSelector } from "~/redux";
import getS3Url from "~/utils/get-url-s3";
import TranslateFunc from "~/utils/dictionary";
import withAuth from "~/hocs/withAuth";
import { Orders, OrdersHeader, MoreButton, MoreButtonGroup } from "./styled";
import PageTitle from "~/components/common/PageTitle";

const OrdersManagement = () => {
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const searchInput = useRef<InputRef>(null);

  const productsState = useAppSelector((state) => state.products);
  // const dispatch = useAppDispatch();

  /*  const handleMoreModal = useCallback((status: boolean) => {
    setMoreModal(status);
  }, []);

  const handleClickProduct = useCallback((product: ProductUpdate) => {
     setViewProduct(product);
    setDetailModal(true); 
  }, []);

  const handleCategoryDrawer = useCallback((status: boolean) => {
    /
  }, []); */

  const handleSearch = (
    selectedKeys: string[],
    confirm: (param?: FilterConfirmProps) => void,
    dataIndex: keyof ProductType
  ) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  const handleReset = (clearFilters: () => void) => {
    clearFilters();
    setSearchText("");
  };

  const getColumnSearchProps = (
    dataIndex: keyof ProductType
  ): ColumnType<ProductType> => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
      close,
    }) => (
      <div style={{ padding: 8 }} onKeyDown={(e) => e.stopPropagation()}>
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() =>
            handleSearch(selectedKeys as string[], confirm, dataIndex)
          }
          style={{ marginBottom: 8, display: "block" }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() =>
              handleSearch(selectedKeys as string[], confirm, dataIndex)
            }
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90 }}
          >
            Search
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{ width: 90 }}
          >
            Reset
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              confirm({ closeDropdown: false });
              setSearchText((selectedKeys as string[])[0]);
              setSearchedColumn(dataIndex);
            }}
          >
            Filter
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              close();
            }}
          >
            close
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered: boolean) => (
      <SearchOutlined style={{ color: filtered ? "#1677ff" : undefined }} />
    ),
    onFilter: (value, record) =>
      record[dataIndex]
        .toString()
        .toLowerCase()
        .includes((value as string).toLowerCase()),
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{ backgroundColor: "#ffc069", padding: 0 }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ""}
        />
      ) : (
        text
      ),
  });

  const columns: ColumnsType<ProductType> = [
    {
      title: "Image",
      dataIndex: "image",
      key: "images",
      width: "80px",
      render: (_, record) => (
        <img
          src={getS3Url(record.images.split(",")[0])}
          alt="product-image"
          width={50}
          height={50}
        />
      ),
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      width: "30%",
      ...getColumnSearchProps("name"),
    },
    {
      title: "Sold",
      dataIndex: "sold",
      key: "sold",
      sorter: (a, b) => a.sold - b.sold,
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
      sorter: (a, b) => a.price - b.price,
    },
    {
      title: "Sale",
      dataIndex: "sale",
      key: "sale",
      sorter: (a, b) => a.sale - b.sale,
    },
    {
      title: "Rating",
      dataIndex: "rating",
      key: "rating",
      sorter: (a, b) => a.rating - b.rating,
    },
    {
      title: "Create At",
      dataIndex: "created_at",
      sorter: (a, b) => (a.created_at > b.created_at ? 1 : -1),
      render: (_, { created_at }) => (
        <span>
          {new Date(created_at).toLocaleString("en-EN", {
            timeZone: "Asia/Ho_Chi_Minh",
          })}
        </span>
      ),
    },
    {
      title: "Category",
      dataIndex: "category",
      sorter: (a, b) => (a.category > b.category ? 1 : -1),
      render: (_, { category }) => <span>{TranslateFunc(category)}</span>,
    },
  ];

  const handleChangePagination = (page: number, pageSize: number) => {
    console.log(page);
    console.log(pageSize);
  };

  useEffect(() => {
    // dispatch(fetchOrders());
  }, []);

  return (
    <Orders>
      <OrdersHeader>
        <PageTitle text="Orders Management" />
        <div>
          <MoreButtonGroup>
            <AppstoreAddOutlined />
            <MoreButton>More</MoreButton>
          </MoreButtonGroup>
        </div>
      </OrdersHeader>
      <Table
        columns={columns}
        dataSource={productsState.data}
        size="small"
        rowKey="id"
        loading={!(productsState.status == ASYNC_STATUS.SUCCEED)}
        scroll={{
          scrollToFirstRowOnChange: true,
          y: "calc(100vh - 203px)",
        }}
        pagination={{
          defaultCurrent: 1,
          position: ["bottomCenter"],
          onChange: (page, pageSize) => handleChangePagination(page, pageSize),
        }}
        onRow={(record) => ({
          onClick: () => {
            console.log(record);
            /*  */
          },
        })}
      />
    </Orders>
  );
};

export default withAuth(OrdersManagement);
