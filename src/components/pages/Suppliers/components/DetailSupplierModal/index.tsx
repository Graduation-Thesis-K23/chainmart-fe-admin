import React, { FC, memo } from "react";
import { Button, Col, Modal, Row } from "antd";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-toastify";

import { SupplierType, updateSupplier } from "~/redux/supplier";
import { Input } from "~/components/common";

import { CancelButton, FooterForm } from "../../styled";
import Log from "~/utils/Log";
import { useAppDispatch } from "~/redux";

const DetailSupplierModal: FC<{
  detailSupplierModal: boolean;
  handleDetailSupplier: (status: boolean) => void;
  supplier: SupplierType;
}> = ({ detailSupplierModal, handleDetailSupplier, supplier }) => {
  Log("DetailSupplierModal");

  const dispatch = useAppDispatch();

  const {
    control,
    handleSubmit,
    formState: { isDirty, isSubmitting },
  } = useForm({
    defaultValues: {
      ...supplier,
    },
  });

  const onSubmit: SubmitHandler<SupplierType> = async (data) => {
    if (!isDirty) {
      handleDetailSupplier(false);
    } else {
      const result = await dispatch(updateSupplier(data));
      if (result.meta.requestStatus === "fulfilled") {
        handleDetailSupplier(false);
        toast.success("Update supplier success!", {
          autoClose: 1000,
          hideProgressBar: true,
        });
      }
    }
  };

  return (
    <Modal
      title="Detail Supplier"
      open={detailSupplierModal}
      onOk={() => handleDetailSupplier(false)}
      onCancel={() => handleDetailSupplier(false)}
      centered
      footer={null}
      width={800}
    >
      <form>
        <Row gutter={24}>
          <Col xs={12} xl={12}>
            <Controller
              name="name"
              control={control}
              render={({ field: { onChange, name, ref, value } }) => (
                <Input
                  label="Name"
                  onChange={onChange}
                  name={name}
                  value={value}
                  inputRef={ref}
                />
              )}
              defaultValue={supplier.name}
            />
          </Col>
          <Col xs={12} xl={12}>
            <Controller
              name="address"
              control={control}
              render={({ field: { onChange, name, ref, value } }) => (
                <Input
                  label="Address"
                  onChange={onChange}
                  name={name}
                  value={value}
                  inputRef={ref}
                />
              )}
              defaultValue={supplier.address}
            />
          </Col>
        </Row>
        <Row gutter={24}>
          <Col xs={12} xl={12}>
            <Controller
              name="city"
              control={control}
              render={({ field: { onChange, name, ref, value } }) => (
                <Input
                  label="City"
                  onChange={onChange}
                  name={name}
                  value={value}
                  inputRef={ref}
                />
              )}
              defaultValue={supplier.city}
            />
          </Col>
          <Col xs={12} xl={12}>
            <Controller
              name="phone"
              control={control}
              render={({ field: { onChange, name, ref, value } }) => (
                <Input
                  label="Phone"
                  onChange={onChange}
                  name={name}
                  value={value}
                  inputRef={ref}
                />
              )}
              defaultValue={supplier.phone}
            />
          </Col>
        </Row>
        <Row gutter={24}>
          <Col xs={12} xl={12}>
            <Controller
              name="region"
              control={control}
              render={({ field: { onChange, name, ref, value } }) => (
                <Input
                  label="Region"
                  onChange={onChange}
                  name={name}
                  value={value}
                  inputRef={ref}
                />
              )}
            />
          </Col>
          <Col xs={12} xl={12}>
            <Controller
              name="country"
              control={control}
              render={({ field: { onChange, name, ref, value } }) => (
                <Input
                  label="Country"
                  onChange={onChange}
                  name={name}
                  value={value}
                  inputRef={ref}
                />
              )}
            />
          </Col>
        </Row>
        <Row gutter={24}>
          <Col xs={12} xl={12}>
            <Controller
              name="homepage"
              control={control}
              render={({ field: { onChange, name, ref, value } }) => (
                <Input
                  label="Homepage"
                  onChange={onChange}
                  name={name}
                  value={value}
                  inputRef={ref}
                />
              )}
              defaultValue={supplier.homepage}
            />
          </Col>
          <Col xs={12} xl={12}>
            <Controller
              name="postal_code"
              control={control}
              render={({ field: { onChange, name, ref, value } }) => (
                <Input
                  label="Postal Code"
                  onChange={onChange}
                  name={name}
                  value={value}
                  inputRef={ref}
                />
              )}
              defaultValue={supplier.postal_code}
            />
          </Col>
        </Row>
        <FooterForm>
          <CancelButton
            type="reset"
            value="Cancel"
            onClick={() => handleDetailSupplier(false)}
          />
          <Button
            type="primary"
            onClick={handleSubmit(onSubmit)}
            loading={isSubmitting}
          >
            Update
          </Button>
        </FooterForm>
      </form>
    </Modal>
  );
};

export default memo(DetailSupplierModal);
