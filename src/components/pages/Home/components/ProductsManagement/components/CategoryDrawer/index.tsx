import React, { FC } from "react";
import { Drawer, Divider } from "antd";

import CategoryDrawerTable from "../CategoryDrawerTable";
import CategoryDrawerForm from "../CategoryDrawerForm";

const CategoryDrawer: FC<{
  state: {
    categoryDrawer: boolean;
    setCategoryDrawer: React.Dispatch<React.SetStateAction<boolean>>;
  };
}> = ({ state }) => {
  const onClose = () => {
    state.setCategoryDrawer(false);
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

export default CategoryDrawer;
