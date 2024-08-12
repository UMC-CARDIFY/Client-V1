import { useState } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const SortDiv = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
  position: relative;
  border-radius: 0.5rem;
  padding: 0.5rem 1rem;
  background-color: white;
  box-shadow: 0px 4px 26px 0px rgba(0, 0, 0, 0.02), 0px 10px 60px 0px rgba(0, 74, 162, 0.03);
`;

const Dropdown = styled.div`
  position: absolute;
  top: 100%;
  left: 0;
  width: 100%;
  margin-top: 0.5rem;
  padding: 0.5rem 0;
  border-radius: 0.5rem;
  background-color: white;
  box-shadow: 0px 4px 26px 0px rgba(0, 0, 0, 0.02), 0px 10px 60px 0px rgba(0, 74, 162, 0.03);
  z-index: 10;
`;

const DropdownItem = styled.div`
  padding: 0.5rem 1rem;
  cursor: pointer;
  &:hover {
    background-color: #f0f0f0;
  }
`;

const SortIcon = styled.div`
  width: 1rem;
  height: 1rem;
  background-color: gray;
  margin-right: 0.5rem;
`;


const SortDropdown = ({ onSortOptionClick }) => {
    const [isOpen, setIsOpen] = useState(false);
  
    const toggleDropdown = () => {
      setIsOpen(!isOpen);
    };
  
    const handleSortOptionClick = (option) => {
      console.log(`Selected sort option: ${option}`);
      if (onSortOptionClick) {
        onSortOptionClick(option);
      }
      setIsOpen(false);
    };
  
    return (
      <SortDiv onClick={toggleDropdown}>
        <SortIcon />
        <div>정렬</div> 
        {isOpen && (
          <Dropdown>
            <DropdownItem onClick={() => handleSortOptionClick('asc')}>오름차순</DropdownItem>
            <DropdownItem onClick={() => handleSortOptionClick('desc')}>내림차순</DropdownItem>
            <DropdownItem onClick={() => handleSortOptionClick('edit-newest')}>수정일 - 최신순</DropdownItem>
            <DropdownItem onClick={() => handleSortOptionClick('edit-oldest')}>수정일 - 오래된 순</DropdownItem>
          </Dropdown>
        )}
      </SortDiv>
    );
  };

  SortDropdown.propTypes = {
    onSortOptionClick: PropTypes.func.isRequired,
  };


export default SortDropdown