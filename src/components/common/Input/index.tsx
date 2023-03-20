import React, { FC, useId, memo, HTMLInputTypeAttribute } from "react";

import { InputGroup, InputLabel, InputElement } from "./styled";

const Input: FC<{
  label?: string;
  type?: HTMLInputTypeAttribute;
  onChange: (...event: unknown[]) => void;
  name: string;
}> = ({ label, type = "text", onChange, name }) => {
  const id = useId();

  const onBlur = () => {
    console.log("s");
  };

  return (
    <InputGroup>
      {label && <InputLabel htmlFor={id}>{label}</InputLabel>}
      <InputElement
        type={type}
        id={id}
        onChange={onChange}
        onBlur={onBlur}
        name={name}
      />
    </InputGroup>
  );
};

export default memo(Input);
