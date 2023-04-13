import React, { useEffect, useState, memo, useCallback } from "react";
import { Table } from "antd";
import { AppstoreAddOutlined, ContainerOutlined } from "@ant-design/icons";
import { ColumnsType } from "antd/es/table";

import MoreProductModal from "./components/MoreProductModal";
import DetailProductModal from "./components/DetailProductModal";
import CategoryDrawer from "./components/CategoryDrawer";

import {
  Products,
  Title,
  ProductsHeader,
  MoreButton,
  MoreButtonGroup,
  CategoryButtonGroup,
} from "./styled";
import {
  ASYNC_STATUS,
  useAppDispatch,
  useAppSelector,
  fetchProducts,
  ProductType,
} from "~/redux";
import getS3Url from "~/utils/get-url-s3";

export interface ProductUpdate
  extends Omit<ProductType, "options,specifications"> {
  specifications: string;
  options: string;
}

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
  },
  {
    title: "Price",
    dataIndex: "price",
    key: "price",
  },
  {
    title: "Quantity",
    dataIndex: "quantity",
    key: "quantity",
  },
  {
    title: "Sale",
    dataIndex: "sale",
    render: (_, { sale }) => <span>{sale ? sale : "0"}</span>,
  },
  {
    title: "Category",
    dataIndex: "category",
    render: (_, { category }) => <span>{category.name}</span>,
  },
  {
    title: "Expiry Date",
    dataIndex: "expiry_date",
    render: (_, { expiry_date }) => <span>{expiry_date.substring(0, 10)}</span>,
  },
];

const ProductsManagement = () => {
  const [moreModal, setMoreModal] = useState(false);
  const [detailModal, setDetailModal] = useState(false);
  const [viewProduct, setViewProduct] = useState({} as ProductUpdate);
  const [categoryDrawer, setCategoryDrawer] = useState(false);

  const productsState = useAppSelector((state) => state.products);
  const dispatch = useAppDispatch();

  const handleMoreModal = useCallback((status: boolean) => {
    setMoreModal(status);
  }, []);

  const handleClickProduct = useCallback((product: ProductUpdate) => {
    setViewProduct(product);
    setDetailModal(true);
  }, []);

  const handleCategoryDrawer = useCallback((status: boolean) => {
    setCategoryDrawer(status);
  }, []);

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

  return (
    <Products>
      <ProductsHeader>
        <Title>Products Management</Title>
        <div>
          <CategoryButtonGroup onClick={() => handleCategoryDrawer(true)}>
            <ContainerOutlined />
            <MoreButton>Category</MoreButton>
          </CategoryButtonGroup>
          <MoreButtonGroup onClick={() => handleMoreModal(true)}>
            <AppstoreAddOutlined />
            <MoreButton>More</MoreButton>
          </MoreButtonGroup>
        </div>
      </ProductsHeader>
      <Table
        columns={columns}
        dataSource={productsState.data}
        pagination={false}
        size="small"
        rowKey="id"
        loading={!(productsState.status == ASYNC_STATUS.SUCCEED)}
        scroll={{
          scrollToFirstRowOnChange: true,
          y: "calc(100vh - 203px)",
        }}
        onRow={(record) => ({
          onClick: () => handleClickProduct(record),
        })}
      />
      {moreModal && (
        <MoreProductModal moreModal={moreModal} setMoreModal={setMoreModal} />
      )}
      {detailModal && (
        <DetailProductModal
          detailModal={detailModal}
          setDetailModal={setDetailModal}
          product={viewProduct}
        />
      )}
      {categoryDrawer && (
        <CategoryDrawer
          categoryDrawer={categoryDrawer}
          handleCategoryDrawer={handleCategoryDrawer}
        />
      )}
    </Products>
  );
};

export default memo(ProductsManagement);
