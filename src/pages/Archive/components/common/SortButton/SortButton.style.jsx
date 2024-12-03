import styled from "styled-components";

export const StyledSortButton = styled.div`
  display: inline-flex;
  padding: 0.75rem 1.25rem;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  border-radius: 0.75rem;
  background: #f5f5f5;
  color: #1a1a1a;
  font-size: 1.125rem;
  font-weight: 600;
  cursor: pointer;

  &:hover {
    color: #1062fe;
  }
  &:active {
    background: #e3e3e3;
  }
`;
