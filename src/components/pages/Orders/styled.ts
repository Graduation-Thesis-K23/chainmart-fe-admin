import styled from "styled-components";

export const Orders = styled.section`
  padding: 24px;
  height: 100%;
`;

export const OrdersHeader = styled.div`
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

export const CategoryButtonGroup = styled(MoreButtonGroup)`
  margin-right: 10px;
`;

export const MoreButton = styled.span`
  margin-left: 4px;
  background-color: transparent;
  color: inherit;
`;
