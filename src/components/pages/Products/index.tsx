import React, { useEffect, useState, useCallback, useRef } from "react";
import { Button, Space, Table, Input, InputRef } from "antd";
import {
  AppstoreAddOutlined,
  ContainerOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import { ColumnsType, ColumnType } from "antd/es/table";
import Highlighter from "react-highlight-words";

import MoreProductModal from "./components/MoreProductModal";
import DetailProductModal from "./components/DetailProductModal";
import CategoryDrawer from "./components/CategoryDrawer";

import {
  Products,
  ProductsHeader,
  MoreButton,
  MoreButtonGroup,
  CategoryButtonGroup,
} from "./styled";
import PageTitle from "~/components/common/PageTitle";
import {
  ASYNC_STATUS,
  useAppDispatch,
  useAppSelector,
  fetchProducts,
  ProductType,
} from "~/redux";
import getS3Url from "~/utils/get-url-s3";
import withAuth from "~/hocs/withAuth";
import TranslateFunc from "~/utils/dictionary";
import { FilterConfirmProps } from "antd/es/table/interface";
import ReloadButton from "~/components/common/ReloadButton";
import convertPrice from "~/utils/convert-price";

export interface ProductUpdate extends Omit<ProductType, "specifications"> {
  specifications: string;
}

const ProductsManagement = () => {
  const [moreModal, setMoreModal] = useState(false);
  const [detailModal, setDetailModal] = useState(false);
  const [viewProduct, setViewProduct] = useState({} as ProductUpdate);
  const [categoryDrawer, setCategoryDrawer] = useState(false);
  const [page, setPage] = useState(1);

  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const searchInput = useRef<InputRef>(null);

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
      title: "No.",
      width: "4%",
      render: (_, __, i) => <span>{i + 1}</span>,
    },
    {
      title: "Image",
      dataIndex: "image",
      key: "images",
      width: "80px",
      render: (_, record) => (
        <img
          src={getS3Url(record.images[0])}
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
      title: "Price",
      dataIndex: "price",
      key: "price",
      render: (price) => <span>{convertPrice(price)}</span>,
      sorter: (a, b) => a.price - b.price,
    },
    {
      title: "Sale",
      dataIndex: "sale",
      key: "sale",
      sorter: (a, b) => a.sale - b.sale,
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

  const handleChangePagination = (page: number) => {
    setPage(page);
    dispatch(fetchProducts(page));
  };

  useEffect(() => {
    dispatch(fetchProducts(page));
  }, []);

  return (
    <Products>
      <ProductsHeader>
        <PageTitle text="Products Management" />
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
        size="small"
        rowKey="id"
        loading={!(productsState.status == ASYNC_STATUS.SUCCEED)}
        scroll={{
          scrollToFirstRowOnChange: true,
          y: "calc(100vh - 267px)",
        }}
        pagination={{
          defaultCurrent: page,
          position: ["topCenter"],
          pageSize: 10,
          onChange: (page) => handleChangePagination(page),
          total: productsState.metadata.totalDocs,
          showSizeChanger: false,
        }}
        onRow={(record) => ({
          onClick: () => handleClickProduct(record),
        })}
      />
      {productsState.status === ASYNC_STATUS.FAILED && <ReloadButton />}
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

export default withAuth(ProductsManagement);
