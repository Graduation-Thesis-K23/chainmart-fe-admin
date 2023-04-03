import React, { FC, useId } from "react";
import dayjs from "dayjs";
import { DatePicker as DatePickerAntd } from "antd";
import { DateGroup, DateLabel, DateC } from "./styled";

const DatePicker: FC<{
  onChange: (...event: unknown[]) => void;
  name: string;
  label?: string;
}> = ({ onChange, name, label }) => {
  const id = useId();

  return (
    <DateGroup>
      {label && <DateLabel htmlFor={id}>{label}</DateLabel>}
      <DateC>
        <DatePickerAntd
          style={{
            width: "100%",
          }}
          onChange={onChange}
          defaultValue={dayjs()}
          name={name}
          format="YYYY/MM/DD"
          bordered={false}
        />
      </DateC>
    </DateGroup>
  );
};

export default DatePicker;
