import styled from "styled-components";

export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

export const TableHeadContainer = styled.thead`
  display: flex;
  flex-direction: column;
`;

export const TableRowContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 2rem;
`;

export const TableHeadRow = styled.tr`
  display: flex;
  align-items: center;
`;

export const TableHead = styled.th`
  flex: ${(props) => props.flex || 1};
  text-align: ${(props) => props.align || "center"};

  color: #787878;
  font-family: Pretendard;
  font-size: 1.25rem;
  font-style: normal;
  font-weight: 500;
  line-height: normal;

  display: flex;
  align-items: center;

  ${(props) =>
    props.withMargin &&
    `
    margin-left: 1.5rem;
  `}
`;

export const TableRow = styled.tr`
  display: flex;
  align-items: center;
`;

export const TableData = styled.td`
  flex: ${(props) => props.flex || 1};
  text-align: ${(props) => props.align || "center"};

  color: #1a1a1a;
  font-family: Pretendard;
  font-size: 1.25rem;
  font-style: normal;
  font-weight: 500;
  line-height: normal;

  display: flex;
  align-items: center;

  ${(props) =>
    props.withMargin &&
    `
    margin-left: 1.5rem;
  `}
`;

export const Divider = styled.td`
  height: 2.4375rem;
  background: #e8e8e8;
`;

export const NoteIconContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 2rem;
  height: 2rem;
`;

export const FavoriteIconContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 2rem;
  height: 2rem;
`;

export const CheckboxContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 2rem;
`;

export const FlashcardContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background-color: #f9f9f9;
  border-radius: 0.5rem;
  padding: 0.5rem 1rem;
  
  span {
    font-size: 1rem;
    font-weight: 500;
    color: #787878;
  }
`;
