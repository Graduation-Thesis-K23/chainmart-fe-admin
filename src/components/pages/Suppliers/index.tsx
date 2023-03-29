import React, { useEffect, useState, useCallback, memo } from "react";
import { Table } from "antd";
import { AppstoreAddOutlined } from "@ant-design/icons";
import { ColumnsType } from "antd/es/table";

import {
  Suppliers,
  SuppliersHeader,
  Title,
  MoreButtonGroup,
  MoreButton,
} from "./styled";
import { fetchSuppliers, SupplierType } from "~/redux/supplier";
import { useAppDispatch, useAppSelector } from "~/redux";
import { ASYNC_STATUS } from "~/redux/constants";
import MoreSupplierModal from "./components/MoreSupplierModal";
import DetailSupplierModal from "./components/DetailSupplierModal";

const columns: ColumnsType<SupplierType> = [
  {
    title: "No",
    width: "10%",
    render: (_, __, i) => <span>{i + 1}</span>,
  },
  {
    title: "Name",
    dataIndex: "name",
    width: "30%",
  },
  {
    title: "City",
    dataIndex: "city",
  },
  {
    title: "Country",
    dataIndex: "country",
  },
  {
    title: "Region",
    dataIndex: "region",
  },
  {
    title: "Phone",
    dataIndex: "phone",
  },
  {
    title: "Homepage",
    dataIndex: "homepage",
  },
  {
    title: "Postal Code",
    dataIndex: "postal_code",
  },
];

const SuppliersManagement = () => {
  const dispatch = useAppDispatch();
  const suppliers = useAppSelector((state) => state.suppliers);
  const [moreSupplierModal, setMoreSupplierModal] = useState(false);
  const [detailSupplierModal, setDetailSupplierModal] = useState(false);
  const [supplier, setSupplier] = useState({} as SupplierType);

  useEffect(() => {
    dispatch(fetchSuppliers());
  }, []);

  const handleMoreSupplier = useCallback(
    (status: boolean) => setMoreSupplierModal(status),
    []
  );

  const handleDetailSupplier = useCallback(
    (status: boolean) => setDetailSupplierModal(status),
    []
  );

  const onRowClick = useCallback((supplier: SupplierType) => {
    setSupplier(supplier);
    handleDetailSupplier(true);
  }, []);

  return (
    <Suppliers>
      <SuppliersHeader>
        <Title>Suppliers Management</Title>
        <div>
          <MoreButtonGroup onClick={() => handleMoreSupplier(true)}>
            <AppstoreAddOutlined />
            <MoreButton>More</MoreButton>
          </MoreButtonGroup>
        </div>
      </SuppliersHeader>
      <Table
        columns={columns}
        dataSource={suppliers.data}
        loading={!(suppliers.status == ASYNC_STATUS.SUCCEED)}
        scroll={{
          scrollToFirstRowOnChange: true,
          y: "calc(100vh - 241px)",
        }}
        pagination={false}
        rowKey="id"
        onRow={(supplier) => ({
          onClick: () => onRowClick(supplier),
        })}
      />
      {moreSupplierModal && (
        <MoreSupplierModal
          moreSupplierModal={moreSupplierModal}
          handleMoreSupplier={handleMoreSupplier}
        />
      )}

      {detailSupplierModal && (
        <DetailSupplierModal
          detailSupplierModal={detailSupplierModal}
          handleDetailSupplier={handleDetailSupplier}
          supplier={supplier}
        />
      )}
    </Suppliers>
  );
};

export default memo(SuppliersManagement);
