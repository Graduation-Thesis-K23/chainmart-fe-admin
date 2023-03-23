import styled from "styled-components";

export const TextareaGroup = styled.div`
  width: 100%;
  margin-bottom: 16px;
`;

export const TextareaLabel = styled.label`
  display: block;
  padding-bottom: 10px;
  font-size: 16px;
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

export const TextareaElement = styled.textarea`
  width: 100%;
  padding: 10px;
  background-color: #eee;
  border: none;
  outline: none;
`;
