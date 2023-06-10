import React, { FC, memo } from "react";
import { Drawer } from "antd";

import CategoryDrawerTable from "../CategoryDrawerTable";

const CategoryDrawer: FC<{
  categoryDrawer: boolean;
  handleCategoryDrawer: (status: boolean) => void;
}> = ({ categoryDrawer, handleCategoryDrawer }) => {
  const onClose = () => {
    handleCategoryDrawer(false);
  };

  return (
    <Drawer
      title="Categories List"
      placement="right"
      onClose={onClose}
      open={categoryDrawer}
      width="600px"
    >
      <CategoryDrawerTable />
    </Drawer>
  );
};

export default memo(CategoryDrawer);
