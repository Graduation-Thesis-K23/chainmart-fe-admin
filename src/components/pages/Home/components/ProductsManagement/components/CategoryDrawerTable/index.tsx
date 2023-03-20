import React, { useEffect } from "react";
import { Table } from "antd";
import { ColumnsType } from "antd/es/table";

import { useAppDispatch, useAppSelector } from "~/redux";
import { fetchCategories } from "~/redux/category";
import { CategoryType } from "~/redux/mocks/get-categories";
import { ASYNC_STATUS } from "~/redux/constants";

const columns: ColumnsType<CategoryType> = [
  {
    title: "Index",
    dataIndex: "id",
    align: "center",
    width: "3%",
    render: (_, __, index) => <span>{index + 1}</span>,
  },
  {
    title: "Name",
    dataIndex: "name",
    width: "25%",
  },
  {
    title: "Description",
    dataIndex: "description",
  },
];

const CategoryDrawerTable = () => {
  const dispatch = useAppDispatch();
  const categoriesState = useAppSelector((state) => state.categories);

  useEffect(() => {
    dispatch(fetchCategories());
  }, []);

  return (
    <Table
      columns={columns}
      dataSource={categoriesState.data}
      loading={!(categoriesState.status === ASYNC_STATUS.SUCCEED)}
      pagination={false}
    />
  );
};

export default CategoryDrawerTable;
