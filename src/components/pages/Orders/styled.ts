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

export const ProductsLabel = styled.label`
  display: inline-block;
  margin-bottom: 12px;
  margin-top: 12px;
  font-size: 16px;
  font-weight: 600;
`;

export const ProductsTable = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

export const THead = styled.thead`
  width: 100%;
  border-bottom: 1px solid #ddd;
  background-color: #eee;
  font-size: 20px;
  font-weight: 600;

  th {
    padding: 12px 0;
  }
`;

export const TBody = styled.tbody`
  width: 100%;

  td {
    text-align: center;
    padding: 12px 0;
    border-bottom: 1px solid #ddd;
    font-size: 16px;
  }

  td:nth-child(2) {
    text-align: left;
  }
`;
