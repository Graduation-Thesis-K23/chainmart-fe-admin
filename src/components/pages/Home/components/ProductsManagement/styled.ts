import styled from "styled-components";

export const Products = styled.section`
  padding: 24px;
  height: 100%;
`;

export const Title = styled.p`
  padding: 10px 0;
  font-size: 32px;
  font-weight: 700;
`;

export const ProductsHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const MoreButtonGroup = styled.div`
  display: inline;
  padding: 8px 12px;
  border-radius: 4px;
  background-color: green;
  color: #fff;
  cursor: pointer;

  &:hover {
    opacity: 0.6;
  }
`;

export const MoreButton = styled.span`
  margin-left: 4px;
  background-color: transparent;
  color: inherit;
`;
