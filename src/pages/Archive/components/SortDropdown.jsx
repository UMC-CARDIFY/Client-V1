import { useState } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import Sort from '../../../assets/sortIcon.svg'

const SortDiv = styled.div`
  cursor: pointer;
  position: relative;
  display: flex;
padding: 0.1875rem 0.5rem 0.1875rem 0.4375rem;
align-items: center;
gap: 0.375rem;
border-radius: 0.3125rem;
background: var(--Main-Button, #ECEFF4);
color: var(--Grays-Black, #1A1A1A);
font-family: Pretendard;
font-size: 0.875rem;
font-style: normal;
font-weight: 500;
line-height: normal;
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

const FolderDropdown = styled(Dropdown)`
  /* 폴더 탭에 대한 추가 스타일링을 여기에 추가 */
`;

const NoteDropdown = styled(Dropdown)`
  /* 노트 탭에 대한 추가 스타일링을 여기에 추가 */
`;



const SortDropdown = ({ onSortOptionClick ,selectedTab}) => {
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
          <img src={Sort} alt="Sort Icon"/>
          정렬
          {isOpen && (
              selectedTab === '폴더' ? (
                  <FolderDropdown>
                      <DropdownItem onClick={() => handleSortOptionClick('asc')}>폴더 오름차순</DropdownItem>
                      <DropdownItem onClick={() => handleSortOptionClick('desc')}>폴더 내림차순</DropdownItem>
                      <DropdownItem onClick={() => handleSortOptionClick('edit-newest')}>폴더 수정일 - 최신순</DropdownItem>
                      <DropdownItem onClick={() => handleSortOptionClick('edit-oldest')}>폴더 수정일 - 오래된 순</DropdownItem>
                  </FolderDropdown>
              ) : (
                  <NoteDropdown>
                      <DropdownItem onClick={() => handleSortOptionClick('asc')}>노트 오름차순</DropdownItem>
                      <DropdownItem onClick={() => handleSortOptionClick('desc')}>노트 내림차순</DropdownItem>
                      <DropdownItem onClick={() => handleSortOptionClick('edit-newest')}>노트 수정일 - 최신순</DropdownItem>
                      <DropdownItem onClick={() => handleSortOptionClick('edit-oldest')}>노트 수정일 - 오래된 순</DropdownItem>
                  </NoteDropdown>
              )
          )}
      </SortDiv>
  );
};

  SortDropdown.propTypes = {
    onSortOptionClick: PropTypes.func.isRequired,
    selectedTab: PropTypes.string.isRequired, 
  };


export default SortDropdown