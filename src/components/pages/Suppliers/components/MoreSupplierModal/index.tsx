import React, { FC, memo } from "react";
import { Col, Modal, Row } from "antd";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-toastify";

import { Input, Select } from "~/components/common";

import { addSupplier, AddSupplierType } from "~/redux/supplier";
import { useAppDispatch } from "~/redux";
import { CancelButton, FooterForm, SubmitButton } from "../../styled";
import Log from "~/utils/Log";

const MoreSupplierModal: FC<{
  moreSupplierModal: boolean;
  handleMoreSupplier: (status: boolean) => void;
}> = ({ moreSupplierModal, handleMoreSupplier }) => {
  Log("MoreSupplierModal");
  const dispatch = useAppDispatch();

  const { control, handleSubmit, formState } = useForm({
    defaultValues: {
      name: "",
      address: "",
      city: "",
      country: "",
      region: "",
      phone: "",
      homepage: "",
      postal_code: "",
    },
  });

  const onSubmit: SubmitHandler<AddSupplierType> = async (data) => {
    const result = await dispatch(addSupplier(data));
    if (result.meta.requestStatus === "fulfilled") {
      handleMoreSupplier(false);

      toast.success("Add supplier success!", {
        autoClose: 1000,
        hideProgressBar: true,
      });
    }
  };

  return (
    <Modal
      title="More Supplier"
      open={moreSupplierModal}
      onOk={() => handleMoreSupplier(false)}
      onCancel={() => handleMoreSupplier(false)}
      centered
      footer={null}
      width={800}
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <Row gutter={24}>
          <Col xs={12} xl={12}>
            <Controller
              name="name"
              control={control}
              render={({ field: { onChange, name, ref } }) => (
                <Input
                  label="Name"
                  onChange={onChange}
                  name={name}
                  inputRef={ref}
                />
              )}
            />
          </Col>
          <Col xs={12} xl={12}>
            <Controller
              name="address"
              control={control}
              render={({ field: { onChange, name, ref } }) => (
                <Input
                  label="Address"
                  onChange={onChange}
                  name={name}
                  inputRef={ref}
                />
              )}
            />
          </Col>
        </Row>
        <Row gutter={24}>
          <Col xs={12} xl={12}>
            <Controller
              name="city"
              control={control}
              render={({ field: { onChange, name, ref } }) => (
                <Input
                  label="City"
                  onChange={onChange}
                  name={name}
                  inputRef={ref}
                />
              )}
            />
          </Col>
          <Col xs={12} xl={12}>
            <Controller
              name="phone"
              control={control}
              render={({ field: { onChange, name, ref } }) => (
                <Input
                  label="Phone"
                  onChange={onChange}
                  name={name}
                  inputRef={ref}
                />
              )}
            />
          </Col>
        </Row>
        <Row gutter={24}>
          <Col xs={12} xl={12}>
            <Controller
              name="region"
              control={control}
              render={({ field: { onChange } }) => (
                <Select
                  label="Region"
                  onChange={onChange}
                  options={[
                    {
                      value: "jack",
                      label: "Jack",
                    },
                    {
                      value: "lucy",
                      label: "Lucy",
                    },
                    {
                      value: "tom",
                      label: "Tom",
                    },
                  ]}
                />
              )}
            />
          </Col>
          <Col xs={12} xl={12}>
            <Controller
              name="country"
              control={control}
              render={({ field: { onChange } }) => (
                <Select
                  label="Country"
                  onChange={onChange}
                  options={[
                    {
                      value: "1",
                      label: "12",
                    },
                    {
                      value: "45",
                      label: "45",
                    },
                    {
                      value: "78",
                      label: "78",
                    },
                  ]}
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
              render={({ field: { onChange, name, ref } }) => (
                <Input
                  label="Homepage"
                  onChange={onChange}
                  name={name}
                  inputRef={ref}
                />
              )}
            />
          </Col>
          <Col xs={12} xl={12}>
            <Controller
              name="postal_code"
              control={control}
              render={({ field: { onChange, name, ref } }) => (
                <Input
                  label="Postal Code"
                  onChange={onChange}
                  name={name}
                  inputRef={ref}
                />
              )}
            />
          </Col>
        </Row>
        <FooterForm>
          <CancelButton
            type="reset"
            value="Cancel"
            onClick={() => handleMoreSupplier(false)}
          />
          <SubmitButton type="submit" disabled={formState.isSubmitting} />
        </FooterForm>
      </form>
    </Modal>
  );
};

export default memo(MoreSupplierModal);
