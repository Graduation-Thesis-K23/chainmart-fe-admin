import styled from "styled-components";

export const Suppliers = styled.section`
  padding: 24px;
  height: 100%;
`;

export const SuppliersHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const Title = styled.p`
  padding: 10px 0;
  font-size: 32px;
  font-weight: 700;
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

export const FooterForm = styled.div`
  display: flex;
  justify-content: flex-end;
`;

export const SubmitButton = styled.input`
  padding: 8px 14px;
  background-color: green;
  color: white;
  border: 0;
  cursor: pointer;
`;

export const CancelButton = styled.input`
  margin-right: 8px;
  padding: 8px 14px;
  background-color: rgb(238, 238, 238);
  color: #000000c8;
  border: 0;
  cursor: pointer;
`;
