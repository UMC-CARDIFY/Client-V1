import React from 'react';
import StatusLabel from './StatusLabel';
import styled from 'styled-components';

const StatusDropdownContainer = styled.div`
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
`;

const StatusFilteringDropdown = ({ statuses, selectedStatus, onStatusSelect }) => {
  return (
    <StatusDropdownContainer>
      {statuses.map((status, index) => (
        <StatusLabel 
          key={index} 
          status={status} 
          isSelected={selectedStatus === status} 
          onClick={() => onStatusSelect(status)} 
        />
      ))}
    </StatusDropdownContainer>
  );
};

export default StatusFilteringDropdown;
