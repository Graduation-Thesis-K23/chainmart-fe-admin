import React, { useEffect, useState, useCallback, useRef } from "react";
import { Button, Input, InputRef, Space, Table } from "antd";
import { AppstoreAddOutlined, SearchOutlined } from "@ant-design/icons";
import { ColumnsType, ColumnType } from "antd/es/table";
import Highlighter from "react-highlight-words";
import { FilterConfirmProps } from "antd/es/table/interface";

import { Branch, BranchHeader, MoreButtonGroup, MoreButton } from "./styled";
import { useAppDispatch, useAppSelector } from "~/redux";
import { ASYNC_STATUS } from "~/redux/constants";
import withAuth from "~/hocs/withAuth";
import { BranchType, fetchBranch } from "~/redux/branch";
import MoreBranchModal from "./components/MoreBranchModal";
import DetailBranchModal from "./components/DetailBranchModal";
import PageTitle from "~/components/common/PageTitle";

const BranchManagement = () => {
  const dispatch = useAppDispatch();
  const branchList = useAppSelector((state) => state.branch);
  const [moreBranchModal, setMoreBranchModal] = useState(false);
  const [detailBranchModal, setDetailBranchModal] = useState(false);
  const [branch, setBranch] = useState({} as BranchType);

  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const searchInput = useRef<InputRef>(null);

  useEffect(() => {
    dispatch(fetchBranch());
  }, []);

  const handleMoreBranch = useCallback(
    (status: boolean) => setMoreBranchModal(status),
    []
  );

  const handleDetailBranch = useCallback(
    (status: boolean) => setDetailBranchModal(status),
    []
  );

  const handleSearch = (
    selectedKeys: string[],
    confirm: (param?: FilterConfirmProps) => void,
    dataIndex: keyof BranchType
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
    dataIndex: keyof BranchType
  ): ColumnType<BranchType> => ({
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

  const columns: ColumnsType<BranchType> = [
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
      title: "District",
      dataIndex: "district",
      width: "10%",
    },
    {
      title: "City",
      dataIndex: "city",
      width: "10%",
    },
    {
      title: "Ward",
      dataIndex: "ward",
      width: "10%",
    },
    {
      title: "Address",
      dataIndex: "address",
    },
    {
      title: "Phone",
      dataIndex: "phone",
      width: "10%",
      sorter: (a, b) => (a.phone > b.phone ? 1 : -1),
    },
  ];

  const onRowClick = useCallback((branch: BranchType) => {
    setBranch(branch);
    handleDetailBranch(true);
  }, []);

  return (
    <Branch>
      <BranchHeader>
        <PageTitle text="Branch Management" />
        <div>
          <MoreButtonGroup onClick={() => handleMoreBranch(true)}>
            <AppstoreAddOutlined />
            <MoreButton>More</MoreButton>
          </MoreButtonGroup>
        </div>
      </BranchHeader>
      <Table
        columns={columns}
        dataSource={branchList.data}
        loading={!(branchList.status === ASYNC_STATUS.SUCCEED)}
        scroll={{
          scrollToFirstRowOnChange: true,
          y: "calc(100vh - 241px)",
        }}
        pagination={false}
        rowKey="id"
        onRow={(branch) => ({
          onClick: () => onRowClick(branch),
        })}
      />
      {moreBranchModal && (
        <MoreBranchModal
          moreBranchModal={moreBranchModal}
          handleMoreBranch={handleMoreBranch}
        />
      )}

      {detailBranchModal && (
        <DetailBranchModal
          detailBranchModal={detailBranchModal}
          handleDetailBranch={handleDetailBranch}
          branch={branch}
        />
      )}
    </Branch>
  );
};

export default withAuth(BranchManagement);
