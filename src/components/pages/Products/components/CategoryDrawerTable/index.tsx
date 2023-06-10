import React, { useMemo } from "react";
import { Table, Image } from "antd";
import { ColumnsType } from "antd/es/table";

import { CategoryType } from "~/shared";
import categories from "~/sub-categories/categories";
import Translate from "~/components/common/Translate";

const CategoryDrawerTable = () => {
  // const [api, contextHolder] = notification.useNotification();

  /*  const confirm = (id: string) => {
    dispatch(deleteCategory(id));

    api.open({
      message: "Success",
      description: "Delete category successfully.",
      duration: 1.5,
      placement: "topLeft",
    });
  }; */

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
        title: "Image",
        dataIndex: "src",
        width: "15%",
        render: (_, category) => (
          <Image
            src={category.src}
            alt="category-image"
            width={40}
            height={40}
          />
        ),
      },
      {
        title: "Name",
        dataIndex: "textKey",
        render: (_, { textKey }) => <Translate textKey={textKey} />,
      },
    ],
    []
  );

  return (
    <>
      <Table
        columns={columns}
        dataSource={categories}
        scroll={{ y: 846 }}
        pagination={false}
        rowKey="id"
      />
    </>
  );
};

export default CategoryDrawerTable;
