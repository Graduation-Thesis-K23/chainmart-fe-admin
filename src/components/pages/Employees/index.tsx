import React, { useState, useCallback, useRef, useEffect } from "react";
import { AppstoreAddOutlined, SearchOutlined } from "@ant-design/icons";
import { FilterConfirmProps } from "antd/es/table/interface";
import { Button, Input, InputRef, Space } from "antd";
import Table, { ColumnType, ColumnsType } from "antd/es/table";
import Highlighter from "react-highlight-words";

import {
  ASYNC_STATUS,
  EmployeeType,
  fetchEmployee,
  useAppDispatch,
  useAppSelector,
} from "~/redux";
import withAuth from "~/hocs/withAuth";
import {
  Employees,
  EmployeesHeader,
  MoreButton,
  MoreButtonGroup,
} from "./styled";
import MoreEmployeeDrawer from "./MoreEmployeeDrawer";
import PageTitle from "~/components/common/PageTitle";
import ViewEmployeeDrawer from "./ViewEmployeeDrawer";
import ReloadButton from "~/components/common/ReloadButton";

const EmployeesManagement = () => {
  const [moreDrawer, setMoreDrawer] = useState(false);
  const [detailModal, setDetailModal] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState<EmployeeType>({
    id: "",
    name: "",
    phone: "",
    branch: {
      id: "",
      name: "",
    },
  } as EmployeeType);

  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const searchInput = useRef<InputRef>(null);

  const { employee } = useAppSelector((state) => state);
  const dispatch = useAppDispatch();

  const handleMoreEmployee = useCallback((status: boolean) => {
    setMoreDrawer(status);
  }, []);

  const handleViewEmployee = useCallback((status: boolean) => {
    setDetailModal(status);
  }, []);

  const handleClickEmployee = useCallback((employee: EmployeeType) => {
    setDetailModal(true);
    setSelectedEmployee(employee);
  }, []);

  const handleSearch = (
    selectedKeys: string[],
    confirm: (param?: FilterConfirmProps) => void,
    dataIndex: keyof EmployeeType
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
    dataIndex: keyof EmployeeType
  ): ColumnType<EmployeeType> => ({
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

  const columns: ColumnsType<EmployeeType> = [
    {
      title: "No.",
      width: "4%",
      render: (_, __, i) => <span>{i + 1}</span>,
    },
    {
      title: "Name",
      dataIndex: "name",
      ...getColumnSearchProps("name"),
    },
    {
      title: "Phone",
      dataIndex: "phone",
      width: "250px",
      ...getColumnSearchProps("phone"),
    },
    {
      title: "Role",
      dataIndex: "role",
    },
    {
      title: "Branch",
      dataIndex: "branch",
      width: "250px",
      sorter: (a, b) => a.branch.name.localeCompare(b.branch.name),
      render: (_, employee) => <span>{employee.branch.name}</span>,
    },
  ];

  const handleChangePagination = (page: number, pageSize: number) => {
    console.log(page);
    console.log(pageSize);
  };

  useEffect(() => {
    dispatch(fetchEmployee());
  }, []);

  return (
    <Employees>
      <EmployeesHeader>
        <PageTitle text="Employees Management" />
        <div>
          <MoreButtonGroup onClick={() => handleMoreEmployee(true)}>
            <AppstoreAddOutlined />
            <MoreButton>More</MoreButton>
          </MoreButtonGroup>
        </div>
      </EmployeesHeader>
      <Table
        columns={columns}
        dataSource={employee.data}
        rowKey="id"
        loading={!(employee.status == ASYNC_STATUS.SUCCEED)}
        scroll={{
          scrollToFirstRowOnChange: true,
          y: "calc(100vh - 203px)",
        }}
        pagination={{
          defaultCurrent: 1,
          position: ["topCenter"],
          pageSize: 12,
          onChange: (page, pageSize) => handleChangePagination(page, pageSize),
        }}
        onRow={(record) => ({
          onClick: () => handleClickEmployee(record),
        })}
      />
      {employee.status === ASYNC_STATUS.FAILED && <ReloadButton />}

      {moreDrawer && (
        <MoreEmployeeDrawer
          employeeDrawer={moreDrawer}
          handleEmployeeDrawer={handleMoreEmployee}
        />
      )}

      {detailModal && (
        <ViewEmployeeDrawer
          employee={selectedEmployee}
          viewEmployeeDrawer={detailModal}
          handleViewEmployeeDrawer={handleViewEmployee}
        />
      )}
    </Employees>
  );
};

export default withAuth(EmployeesManagement);
