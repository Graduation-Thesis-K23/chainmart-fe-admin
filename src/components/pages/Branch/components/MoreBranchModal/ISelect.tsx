import { Select } from "antd";
import React, { memo, useId } from "react";
import { Control, Controller } from "react-hook-form";

import { AddBranchType } from "~/redux";
import { SelectGroup, SelectIcon, SelectInput, SelectLabel } from "./styled";

export interface SelectOption {
  value: string;
  label: string;
}

const ISelect: React.FC<{
  label: string;
  icon: JSX.Element;
  control: Control<AddBranchType>;
  name: "city" | "ward" | "district";
  options: Array<SelectOption>;
  disabled?: boolean;
  setStep: React.Dispatch<
    React.SetStateAction<{
      step: number;
      timestamp: number;
    }>
  >;
}> = (props) => {
  const {
    label,
    icon,
    control,
    name,
    options,
    disabled = false,
    setStep,
  } = props;

  const id = useId();

  const onSelect = () => {
    if (name === "district") {
      props.setStep({
        step: 1,
        timestamp: Date.now(),
      });
    } else if (name === "city") {
      setStep({
        step: 2,
        timestamp: Date.now(),
      });
    } else if (name === "ward") {
      setStep({
        step: 3,
        timestamp: Date.now(),
      });
    }
  };

  return (
    <Controller
      control={control}
      rules={{
        required: true,
      }}
      name={name}
      render={({ field: { onChange, ref } }) => (
        <SelectGroup>
          <SelectLabel htmlFor={id}>{label}</SelectLabel>
          <SelectInput>
            <SelectIcon>{icon}</SelectIcon>
            <Select
              style={{
                width: "100%",
              }}
              bordered={false}
              options={options}
              id={id}
              ref={ref}
              onChange={onChange}
              disabled={disabled}
              showSearch
              onSelect={onSelect}
              filterOption={(input, option) =>
                (option?.label ?? "")
                  .toLowerCase()
                  .includes(input.toLowerCase())
              }
            />
          </SelectInput>
        </SelectGroup>
      )}
    />
  );
};

export default memo(ISelect);
