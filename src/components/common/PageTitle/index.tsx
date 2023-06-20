import React, { FC, memo } from "react";
import styled from "styled-components";

export const Title = styled.p`
  padding: 10px 0;
  font-size: 32px;
  font-weight: 700;
`;

const PageTitle: FC<{
  text: string;
}> = ({ text }) => <Title>{text}</Title>;

export default memo(PageTitle);
