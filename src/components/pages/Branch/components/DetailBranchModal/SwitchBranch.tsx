import { Switch } from "antd";
import React from "react";
import { RefCallBack } from "react-hook-form";
import styled from "styled-components";

const SwitchGroup = styled.div`
  margin-bottom: 10px;
`;

const SwitchLabel = styled.div`
  display: inline-block;
  margin-bottom: 12px;
  font-size: 16px;
  font-weight: 600;
`;

const SwitchInput = styled.div`
  flex: 1;
  background-color: transparent;
  margin-left: 6px;
  border: none;
  outline: none;
`;

const SwitchBranch: React.FC<{
  label?: string;
  onChange: (...event: unknown[]) => void;
  name?: string;
  value: boolean;
  inputRef?: RefCallBack;
}> = ({ label, onChange, inputRef, value }) => {
  return (
    <SwitchGroup>
      <SwitchLabel>{label}</SwitchLabel>
      <SwitchInput>
        <Switch ref={inputRef} defaultChecked={value} onChange={onChange} />
      </SwitchInput>
    </SwitchGroup>
  );
};

export default SwitchBranch;
