import React, { FC, memo } from "react";
import { Drawer, Divider } from "antd";

const SupplierDrawer: FC<{
  state: {
    supplierDrawer: boolean;
    handleSupplierDrawer: (status: boolean) => void;
  };
}> = ({ state }) => {
  const onClose = () => {
    state.handleSupplierDrawer(false);
  };

  return (
    <Drawer
      title="Supplier Management"
      placement="right"
      onClose={onClose}
      open={state.supplierDrawer}
      width="500"
    >
      <Divider />
    </Drawer>
  );
};

export default memo(SupplierDrawer);
