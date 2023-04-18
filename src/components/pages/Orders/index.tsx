import React from "react";

import { LoadingLarge, Loading } from "~/components/common";

import withAuth from "~/hocs/withAuth";

const OrdersManagement = () => {
  return (
    <>
      <LoadingLarge />
      <Loading />
    </>
  );
};

export default withAuth(OrdersManagement);
