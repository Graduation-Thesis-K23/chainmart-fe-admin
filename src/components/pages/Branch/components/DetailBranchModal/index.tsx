import React, { FC, memo } from "react";
import { Button, Col, Modal, Row } from "antd";
import { Controller, SubmitHandler, useForm } from "react-hook-form";

import { Input } from "~/components/common";

import { CancelButton, FooterForm } from "../../styled";
import Log from "~/utils/Log";
import { BranchType, updateBranch, useAppDispatch } from "~/redux";
import SwitchBranch from "./SwitchBranch";
import { toast } from "react-toastify";

const DetailBranchModal: FC<{
  detailBranchModal: boolean;
  handleDetailBranch: (status: boolean) => void;
  branch: BranchType;
}> = ({ detailBranchModal, handleDetailBranch, branch }) => {
  Log("DetailBranchModal");

  const dispatch = useAppDispatch();

  const {
    control,
    handleSubmit,
    formState: { isSubmitting, isDirty },
  } = useForm({
    defaultValues: {
      ...branch,
    },
  });

  const onSubmit: SubmitHandler<BranchType> = async (data) => {
    if (!isDirty) {
      handleDetailBranch(false);
    } else {
      await dispatch(updateBranch(data));

      handleDetailBranch(false);
      toast.success("Update branch success!", {
        autoClose: 1000,
        hideProgressBar: true,
      });
    }
  };

  return (
    <Modal
      title="Detail Branch"
      open={detailBranchModal}
      onOk={() => handleDetailBranch(false)}
      onCancel={() => handleDetailBranch(false)}
      centered
      footer={null}
      width={800}
    >
      <form>
        <Row gutter={24}>
          <Col xs={16} xl={16}>
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
              defaultValue={branch.name}
            />
          </Col>
          <Col xs={8} xl={8}>
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
            />
          </Col>
        </Row>
        <Row gutter={24}>
          <Col xs={8} xl={8}>
            <Controller
              name="district"
              control={control}
              render={({ field: { onChange, name, ref, value } }) => (
                <Input
                  label="District"
                  onChange={onChange}
                  name={name}
                  value={value}
                  inputRef={ref}
                />
              )}
              defaultValue={branch.district}
            />
          </Col>
          <Col xs={8} xl={8}>
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
              defaultValue={branch.phone}
            />
          </Col>
          <Col xs={8} xl={8}>
            <Controller
              name="ward"
              control={control}
              render={({ field: { onChange, name, ref, value } }) => (
                <Input
                  label="Ward"
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
          <Col xs={20} xl={20}>
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
            />
          </Col>
          <Col xs={4} xl={4}>
            <Controller
              name="active"
              control={control}
              render={({ field: { onChange, value } }) => (
                <SwitchBranch
                  value={value}
                  onChange={onChange}
                  label="Active"
                />
              )}
            />
          </Col>
        </Row>

        <FooterForm>
          <CancelButton
            type="reset"
            value="Cancel"
            onClick={() => handleDetailBranch(false)}
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

export default memo(DetailBranchModal);
