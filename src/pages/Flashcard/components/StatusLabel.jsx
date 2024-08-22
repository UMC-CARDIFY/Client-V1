import React from 'react';
import styled from 'styled-components';

const StatusLabelContainer = styled.div`
  padding: 8px 16px;
  border-radius: 4px;
  border: 1px solid ${({ isSelected }) => (isSelected ? 'black' : 'transparent')};
  background-color: ${({ isSelected }) => (isSelected ? '#f0f0f0' : 'white')};
  cursor: pointer;
  font-family: Pretendard, sans-serif;

  &:hover {
    background-color: #e0e0e0;
  }
`;

const StatusLabel = ({ status, isSelected, onClick }) => {
  return (
    <StatusLabelContainer isSelected={isSelected} onClick={onClick}>
      {status}
    </StatusLabelContainer>
  );
};

export default StatusLabel;
