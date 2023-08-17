import React, { FC, useId, memo } from "react";
import { Switch } from "antd";

import { InputGroup, InputLabel, SpanLabel } from "./styled";

const SwitchE: FC<{
  label?: string;
  onChange: (...event: unknown[]) => void;
  value?: boolean;
}> = ({ label, onChange, value }) => {
  const id = useId();

  return (
    <InputGroup>
      {label && <InputLabel htmlFor={id}>{label}</InputLabel>}
      <Switch id={id} onChange={onChange} defaultChecked={value} />
      <SpanLabel></SpanLabel>
    </InputGroup>
  );
};

export default memo(SwitchE);
