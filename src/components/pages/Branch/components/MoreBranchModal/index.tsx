import React, { FC, memo, useEffect, useState } from "react";
import { Col, Drawer, Row } from "antd";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import {
  BuildOutlined,
  GlobalOutlined,
  WindowsOutlined,
} from "@ant-design/icons";

import { Input } from "~/components/common";

import { AddBranchType, addBranch, useAppDispatch } from "~/redux";
import { CancelButton, FooterForm, SubmitButton } from "../../styled";
import Log from "~/utils/Log";
import DistrictSelect from "./DistrictSelect";
import CitySelect from "./CitySelect";
import WardSelect from "./WardSelect";
import { toast } from "react-toastify";

const MoreBranchModal: FC<{
  moreBranchModal: boolean;
  handleMoreBranch: (status: boolean) => void;
}> = ({ moreBranchModal, handleMoreBranch }) => {
  Log("MoreBranchModal");
  /*
  0 not select so enable only city
  1 is city selected so enable district more.
  2 is district selected so enable ward more. 
  3 (can submit)
  */
  const [step, setStep] = useState({ step: 0, timestamp: Date.now() });
  const dispatch = useAppDispatch();

  const { control, handleSubmit, getValues, setFocus, formState } = useForm({
    defaultValues: {
      name: "",
      address: "",
      city: "",
      district: "",
      ward: "",
      phone: "",
      active: true,
    },
    mode: "onTouched",
    reValidateMode: "onChange",
  });

  const onSubmit: SubmitHandler<AddBranchType> = async (data) => {
    await dispatch(addBranch(data));

    handleMoreBranch(false);

    toast.success("Add branch success!", {
      autoClose: 1000,
      hideProgressBar: true,
    });
  };

  useEffect(() => {
    if (step.step === 1) {
      setFocus("city");
    } else if (step.step === 2) {
      setFocus("ward");
    } else if (step.step === 3) {
      setFocus("address");
    }
  }, [setFocus, step]);

  return (
    <Drawer
      title="More Branch"
      open={moreBranchModal}
      placement="right"
      size="large"
      onClose={() => handleMoreBranch(false)}
      width={800}
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <Row gutter={24}>
          <Col xs={24} xl={24}>
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
              rules={{
                required: true,
              }}
            />
          </Col>
        </Row>
        <Row gutter={24}>
          <Col xs={8} xl={8}>
            <DistrictSelect
              label="District"
              icon={<GlobalOutlined />}
              control={control}
              name="district"
              setStep={setStep}
            />
          </Col>
          <Col xs={8} xl={8}>
            <CitySelect
              label="City"
              icon={<WindowsOutlined />}
              control={control}
              name="city"
              disabled={!(step.step > 0)}
              setStep={setStep}
              district={getValues("district")}
            />
          </Col>
          <Col xs={8} xl={8}>
            <WardSelect
              label="Ward"
              icon={<BuildOutlined />}
              control={control}
              name="ward"
              disabled={!(step.step > 1)}
              setStep={setStep}
              city={getValues("city")}
              district={getValues("district")}
            />
          </Col>
        </Row>
        <Row gutter={24}>
          <Col xs={16} xl={16}>
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
              rules={{
                required: true,
              }}
            />
          </Col>
          <Col xs={8} xl={8}>
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
              rules={{
                required: true,
              }}
            />
          </Col>
        </Row>

        <FooterForm>
          <CancelButton
            type="reset"
            value="Cancel"
            onClick={() => handleMoreBranch(false)}
          />
          <SubmitButton type="submit" disabled={formState.isSubmitting} />
        </FooterForm>
      </form>
    </Drawer>
  );
};

export default memo(MoreBranchModal);
