import React, { HTMLInputTypeAttribute, useId } from "react";
import { Input } from "antd";
import { RefCallBack } from "react-hook-form";

const MoreModalInput: React.FC<{
  onChange: (...event: unknown[]) => void;
  value: string | number;
  name: string;
  innerRef: RefCallBack;
  label: string;
  type?: HTMLInputTypeAttribute;
}> = ({ onChange, label, innerRef, name, type = "text" }) => {
  const id = useId();

  return (
    <div>
      <label htmlFor={id}>{label}</label>
      <Input
        allowClear
        name={name}
        onChange={onChange}
        ref={innerRef}
        id={id}
        required
        type={type}
      />
    </div>
  );
};

export default MoreModalInput;
