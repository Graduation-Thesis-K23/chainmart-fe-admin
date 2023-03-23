import React, {
  FC,
  useId,
  memo,
  HTMLInputTypeAttribute,
  useState,
} from "react";

import {
  InputGroup,
  InputLabel,
  InputElement,
  SpanLabel,
  InputG,
} from "./styled";

const Input: FC<{
  label?: string;
  type?: HTMLInputTypeAttribute;
  onChange: (...event: unknown[]) => void;
  name: string;
}> = ({ label, type = "text", onChange, name }) => {
  const [active, setActive] = useState(false);
  const id = useId();

  const onBlur = () => {
    setActive(false);
  };

  const onFocus = () => {
    setActive(true);
  };

  return (
    <InputGroup>
      {label && <InputLabel htmlFor={id}>{label}</InputLabel>}
      <InputG active={active}>
        <InputElement
          type={type}
          id={id}
          onChange={onChange}
          onFocus={onFocus}
          onBlur={onBlur}
          name={name}
          required
        />
        <SpanLabel></SpanLabel>
      </InputG>
    </InputGroup>
  );
};

export default memo(Input);
