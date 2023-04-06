import React, { FC, memo } from "react";
import { Drawer, Divider } from "antd";

import CategoryDrawerTable from "../CategoryDrawerTable";
import CategoryDrawerForm from "../CategoryDrawerForm";

const CategoryDrawer: FC<{
  categoryDrawer: boolean;
  handleCategoryDrawer: (status: boolean) => void;
}> = ({ categoryDrawer, handleCategoryDrawer }) => {
  const onClose = () => {
    handleCategoryDrawer(false);
  };

  return (
    <Drawer
      title="Categories Management"
      placement="right"
      onClose={onClose}
      open={categoryDrawer}
      width="600px"
    >
      <CategoryDrawerForm />
      <Divider />
      <CategoryDrawerTable />
    </Drawer>
  );
};

export default memo(CategoryDrawer);
