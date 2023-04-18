import React from "react";

import Loading from "~/components/common/Loading";

import withAuth from "~/hocs/withAuth";

const EmployeesManagement = () => {
  return <Loading />;
};

export default withAuth(EmployeesManagement);
