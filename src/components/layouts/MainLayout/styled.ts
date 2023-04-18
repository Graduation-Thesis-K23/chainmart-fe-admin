import { Link } from "react-router-dom";
import styled from "styled-components";

const MainColor = "#2da85c";

export const HomeLink = styled(Link)`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 64px;
  width: 100%;
  background-color: #fff;
  border-bottom: 1px solid ${MainColor};
  border-right: 1px solid ${MainColor};
`;

export const Image = styled.img`
  display: inline-block;
  margin: auto;
`;

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 64px;
  padding: 0 16px;
  background-color: #fff;
  border-bottom: 1px solid ${MainColor};
`;
