import { LabeledValue } from "antd/es/select";
import React, { FC, useId, memo } from "react";
import { Select as SelectElement } from "antd";
import { SelectG, SelectGroup, SelectLabel } from "./styled";

interface SelectData {
  value: string;
  label: string;
}

const Select: FC<{
  label?: string;
  onChange: (...event: unknown[]) => void;
  options: SelectData[];
  value?: string | string[] | number | number[] | LabeledValue | LabeledValue[];
  defaultValue?: string;
  loading?: boolean;
  disabled?: boolean;
}> = ({
  label,
  onChange,
  options,
  defaultValue,
  loading = false,
  disabled = false,
}) => {
  const id = useId();

  return (
    <SelectGroup>
      {label && <SelectLabel htmlFor={id}>{label}</SelectLabel>}
      <SelectG>
        <SelectElement
          id={id}
          onChange={onChange}
          options={options}
          showSearch
          loading={loading}
          bordered={false}
          style={{
            width: "100%",
          }}
          defaultValue={defaultValue}
          disabled={disabled}
        />
      </SelectG>
    </SelectGroup>
  );
};

export default memo(Select);
