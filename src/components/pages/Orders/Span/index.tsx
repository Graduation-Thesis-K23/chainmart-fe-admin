import React, { FC, memo, HTMLInputTypeAttribute, useState } from "react";

import {
  InputGroup,
  InputLabel,
  InputElement,
  SpanLabel,
  InputG,
} from "./styled";

const Span: FC<{
  label: string;
  type?: HTMLInputTypeAttribute;
  value: string | number;
}> = ({ label, type = "text", value }) => {
  const [active, setActive] = useState(false);

  const onBlur = () => {
    setActive(false);
  };

  const onFocus = () => {
    setActive(true);
  };

  return (
    <InputGroup>
      {label && <InputLabel>{label}</InputLabel>}
      <InputG active={active}>
        <InputElement
          type={type}
          onFocus={onFocus}
          onBlur={onBlur}
          value={value}
          autoComplete="off"
          disabled
        />
        <SpanLabel></SpanLabel>
      </InputG>
    </InputGroup>
  );
};

export default memo(Span);
