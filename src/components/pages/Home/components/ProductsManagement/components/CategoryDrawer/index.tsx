import React, { FC, memo } from "react";
import { Drawer, Divider } from "antd";

import CategoryDrawerTable from "../CategoryDrawerTable";
import CategoryDrawerForm from "../CategoryDrawerForm";

const CategoryDrawer: FC<{
  state: {
    categoryDrawer: boolean;
    handleCategoryDrawer: (status: boolean) => void;
  };
}> = ({ state }) => {
  const onClose = () => {
    state.handleCategoryDrawer(false);
  };

  return (
    <Drawer
      title="Categories Management"
      placement="right"
      onClose={onClose}
      open={state.categoryDrawer}
      width="500"
    >
      <CategoryDrawerForm />
      <Divider />
      <CategoryDrawerTable />
    </Drawer>
  );
};

export default memo(CategoryDrawer);
