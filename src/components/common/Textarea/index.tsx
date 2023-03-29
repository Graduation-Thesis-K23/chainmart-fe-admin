import React, { FC, useId, useState } from "react";

import {
  TextareaGroup,
  TextareaLabel,
  TextareaElement,
  InputG,
  SpanLabel,
} from "./styled";

const Textarea: FC<{
  label?: string;
  onChange: (...event: unknown[]) => void;
  name: string;
  rows?: number;
  inputRef?: React.RefObject<HTMLTextAreaElement>;
}> = ({ name, label, onChange, rows = 2, inputRef }) => {
  const [active, setActive] = useState(false);
  const id = useId();

  const onBlur = () => {
    setActive(false);
  };

  const onFocus = () => {
    setActive(true);
  };

  return (
    <TextareaGroup>
      {label && <TextareaLabel htmlFor={id}>{label}</TextareaLabel>}
      <InputG active={active}>
        <TextareaElement
          id={id}
          rows={rows}
          onChange={onChange}
          onBlur={onBlur}
          onFocus={onFocus}
          name={name}
          ref={inputRef}
        />
        <SpanLabel></SpanLabel>
      </InputG>
    </TextareaGroup>
  );
};

export default Textarea;
