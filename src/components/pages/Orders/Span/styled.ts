import styled from "styled-components";

export const InputGroup = styled.div`
  margin-bottom: 10px;
`;

export const InputLabel = styled.label`
  display: inline-block;
  margin-bottom: 12px;
  font-size: 16px;
  font-weight: 600;
`;

export const SpanLabel = styled.span`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 2px;
  z-index: 99;

  &::before,
  &::after {
    content: "";
    position: absolute;
    bottom: 0;
    left: 0;
    width: 0;
    height: 100%;
    background-color: green;
    transition: 0.4s;
  }

  &::after {
    left: auto;
    right: 0;
  }
`;

export const InputG = styled.div<{ active: boolean }>`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #eee;
  padding: 8px;

  ${(props) =>
    props.active
      ? `${SpanLabel} {
    &::after,
    &::before {
      width: 50%;
      transition: 0.4s;
    }
  }`
      : ""}
`;

export const InputElement = styled.input`
  flex: 1;
  display: inline-block;
  background-color: transparent;
  margin-left: 6px;
  border: none;
  outline: none;
`;
