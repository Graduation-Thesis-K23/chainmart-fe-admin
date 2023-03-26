import React, { useEffect, useMemo } from "react";
import { Table, Popconfirm, notification } from "antd";
import { ColumnsType } from "antd/es/table";
import styled from "styled-components";

import { useAppDispatch, useAppSelector } from "~/redux";
import {
  fetchCategories,
  CategoryType,
  deleteCategory,
} from "~/redux/category";
import { ASYNC_STATUS } from "~/redux/constants";

const DeleteButton = styled.button`
  background-color: white;
  color: red;
  font-weight: 600;
  border: none;
  cursor: pointer;
`;

const CategoryDrawerTable = () => {
  const dispatch = useAppDispatch();
  const categoriesState = useAppSelector((state) => state.categories);

  const [api, contextHolder] = notification.useNotification();

  const confirm = (id: string) => {
    dispatch(deleteCategory(id));

    api.open({
      message: "Success",
      description: "Delete category successfully.",
      duration: 1.5,
      placement: "topLeft",
    });
  };

  const columns: ColumnsType<CategoryType> = useMemo(
    () => [
      {
        title: "No",
        dataIndex: "id",
        align: "center",
        width: "15%",
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
      {
        title: "Action",
        render: (_, { id }) => (
          <Popconfirm
            title="Delete the task"
            description="Are you sure to delete this category?"
            onConfirm={() => confirm(id)}
            okText="Yes"
            cancelText="No"
          >
            <DeleteButton>Delete</DeleteButton>
          </Popconfirm>
        ),
      },
    ],
    []
  );

  useEffect(() => {
    dispatch(fetchCategories());
  }, []);

  return (
    <>
      {contextHolder}
      <Table
        columns={columns}
        dataSource={categoriesState.data}
        loading={!(categoriesState.status === ASYNC_STATUS.SUCCEED)}
        scroll={{ y: 580 }}
        pagination={false}
        rowKey="id"
      />
    </>
  );
};

export default CategoryDrawerTable;
