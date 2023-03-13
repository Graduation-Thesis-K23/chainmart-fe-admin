import React, { useEffect } from "react";
import { Table } from "antd";
import { AppstoreAddOutlined } from "@ant-design/icons";
import { ColumnsType } from "antd/es/table";

import {
  Products,
  Title,
  ProductsHeader,
  MoreButton,
  MoreButtonGroup,
} from "./styled";
import { ProductType } from "~/redux/mocks/get-products";
import { fetchProducts } from "~/redux/product";
import { useAppDispatch, useAppSelector } from "~/redux";

const ProductsManagement = () => {
  const productsState = useAppSelector((state) => state.products);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchProducts());
  }, []);

  /*  const handleSearch = (
    selectedKeys: string[],
    confirm: (param?: FilterConfirmProps) => void,
    dataIndex: keyof DataType
  ) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  const getColumnSearchProps = (
    dataIndex: keyof DataType
  ): ColumnType<DataType> => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, close }) => (
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
      <SearchOutlined style={{ color: filtered ? "#1890ff" : undefined }} />
    ),

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
  }); */

  const columns: ColumnsType<ProductType> = [
    {
      title: "Image",
      dataIndex: "image",
      key: "image",
      width: "10%",
      render: (_, record) => (
        <div>
          <img src={record.image} alt="product-image" />
        </div>
      ),
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      width: "30%",
      sorter: (a, b) => a.price - b.price,
      // ...getColumnSearchProps("name"),
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
      sorter: (a, b) => a.price - b.price,
      // ...getColumnSearchProps("image"),
    },
  ];

  return (
    <Products>
      <ProductsHeader>
        <Title>Products Management</Title>
        <MoreButtonGroup>
          <AppstoreAddOutlined />
          <MoreButton>More</MoreButton>
        </MoreButtonGroup>
      </ProductsHeader>
      <Table
        columns={columns}
        dataSource={productsState.data}
        pagination={false}
        size="small"
        scroll={{
          scrollToFirstRowOnChange: true,
          y: "calc(100vh - 220px)",
        }}
        onRow={(record, rowIndex) => ({
          onClick: () => {
            console.log(record, rowIndex);
          },
        })}
      />
    </Products>
  );
};

export default ProductsManagement;
