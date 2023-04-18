import React, { memo } from "react";
import styled from "styled-components";

const LoadingContainer = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: inline-block;
  width: 100px;
  height: 100px;

  div {
    box-sizing: border-box;
    display: block;
    position: absolute;
    width: 84px;
    height: 84px;
    margin: 8px;
    border: 8px solid #845f5f;
    border-radius: 50%;
    animation: lds-ring1 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
    border-color: #ae8b8b transparent transparent transparent;
  }
  div:nth-child(1) {
    animation-delay: -0.45s;
  }
  div:nth-child(2) {
    animation-delay: -0.3s;
  }
  div:nth-child(3) {
    animation-delay: -0.15s;
  }
  @keyframes lds-ring1 {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;

const LoadingLarge = () => {
  return (
    <LoadingContainer>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </LoadingContainer>
  );
};

export default memo(LoadingLarge);
