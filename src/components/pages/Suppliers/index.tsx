import React, { useEffect, useState, useCallback, useRef } from "react";
import { Button, Input, InputRef, Space, Table } from "antd";
import { AppstoreAddOutlined, SearchOutlined } from "@ant-design/icons";
import { ColumnsType, ColumnType } from "antd/es/table";

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
import MoreSupplierModal from "./components/MoreSupplierModal";
import DetailSupplierModal from "./components/DetailSupplierModal";
import withAuth from "~/hocs/withAuth";
import Highlighter from "react-highlight-words";
import { FilterConfirmProps } from "antd/es/table/interface";

const SuppliersManagement = () => {
  const dispatch = useAppDispatch();
  const suppliers = useAppSelector((state) => state.suppliers);
  const [moreSupplierModal, setMoreSupplierModal] = useState(false);
  const [detailSupplierModal, setDetailSupplierModal] = useState(false);
  const [supplier, setSupplier] = useState({} as SupplierType);

  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const searchInput = useRef<InputRef>(null);

  useEffect(() => {
    dispatch(fetchSuppliers());
  }, []);

  const handleMoreSupplier = useCallback(
    (status: boolean) => setMoreSupplierModal(status),
    []
  );

  const handleDetailSupplier = useCallback(
    (status: boolean) => setDetailSupplierModal(status),
    []
  );

  const handleSearch = (
    selectedKeys: string[],
    confirm: (param?: FilterConfirmProps) => void,
    dataIndex: keyof SupplierType
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
    dataIndex: keyof SupplierType
  ): ColumnType<SupplierType> => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
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

  const columns: ColumnsType<SupplierType> = [
    {
      title: "No.",
      width: "4%",
      render: (_, __, i) => <span>{i + 1}</span>,
    },
    {
      title: "Name",
      dataIndex: "name",
      width: "30%",
      ...getColumnSearchProps("name"),
    },
    {
      title: "City",
      dataIndex: "city",
      sorter: (a, b) => (a.city > b.city ? 1 : -1),
    },
    {
      title: "Country",
      dataIndex: "country",
      sorter: (a, b) => (a.country > b.country ? 1 : -1),
    },
    {
      title: "Region",
      dataIndex: "region",
      sorter: (a, b) => (a.region > b.region ? 1 : -1),
    },
    {
      title: "Phone",
      dataIndex: "phone",
      sorter: (a, b) => (a.phone > b.phone ? 1 : -1),
    },
    {
      title: "Homepage",
      dataIndex: "homepage",
    },
    {
      title: "Postal Code",
      dataIndex: "postal_code",
      sorter: (a, b) => (a.postal_code > b.postal_code ? 1 : -1),
    },
  ];

  const onRowClick = useCallback((supplier: SupplierType) => {
    setSupplier(supplier);
    handleDetailSupplier(true);
  }, []);

  return (
    <Suppliers>
      <SuppliersHeader>
        <Title>Suppliers Management</Title>
        <div>
          <MoreButtonGroup onClick={() => handleMoreSupplier(true)}>
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
          y: "calc(100vh - 241px)",
        }}
        pagination={false}
        rowKey="id"
        onRow={(supplier) => ({
          onClick: () => onRowClick(supplier),
        })}
      />
      {moreSupplierModal && (
        <MoreSupplierModal
          moreSupplierModal={moreSupplierModal}
          handleMoreSupplier={handleMoreSupplier}
        />
      )}

      {detailSupplierModal && (
        <DetailSupplierModal
          detailSupplierModal={detailSupplierModal}
          handleDetailSupplier={handleDetailSupplier}
          supplier={supplier}
        />
      )}
    </Suppliers>
  );
};

export default withAuth(SuppliersManagement);
