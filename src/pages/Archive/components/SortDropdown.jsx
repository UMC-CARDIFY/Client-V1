import { useState, useEffect, useRef } from 'react';
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
  background-color: white;
  box-shadow: 0px 4px 26px 0px rgba(0, 0, 0, 0.02), 0px 10px 60px 0px rgba(0, 74, 162, 0.03);
  z-index: 10;
  border-radius: 0.5rem; 
  overflow: hidden;
`;

const DropdownItem = styled.div`
  padding: 1.06rem 1rem;
  cursor: pointer;

  &:hover {
    background-color: #f0f0f0;
  }

  &:first-child {
    border-top-left-radius: 0.5rem; 
    border-top-right-radius: 0.5rem; 
  }

  &:last-child {
    border-bottom-left-radius: 0.5rem; 
    border-bottom-right-radius: 0.5rem; 
  }
`;

const FolderDropdown = styled(Dropdown)`
  width: 8.375rem;
`;

const NoteDropdown = styled(Dropdown)`
  /* 노트 탭에 대한 추가 스타일링을 여기에 추가 */
`;

const SortDropdown = ({ onSortOptionClick, selectedTab }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleSortOptionClick = (option) => {
    const optionWithTab = `${selectedTab};${option}`; // 선택된 탭과 옵션을 결합
    console.log(`Selected sort option: ${optionWithTab}`);
    if (onSortOptionClick) {
      onSortOptionClick(optionWithTab); // 결합된 옵션 전달
    }
    setIsOpen(false);
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <SortDiv onClick={toggleDropdown} ref={dropdownRef}>
        <img src={Sort} alt="Sort Icon"/>
        정렬
        {isOpen && (
            selectedTab === '폴더' ? (
                <FolderDropdown>
                    <DropdownItem onClick={() => handleSortOptionClick('asc')}>폴더 오름차순</DropdownItem>
                    <DropdownItem onClick={() => handleSortOptionClick('desc')}>폴더 내림차순</DropdownItem>
                    <DropdownItem onClick={() => handleSortOptionClick('edit-newest')}>수정일 - 최신순</DropdownItem>
                    <DropdownItem onClick={() => handleSortOptionClick('edit-oldest')}>수정일 - 오래된 순</DropdownItem>
                </FolderDropdown>
            ) : (
                <NoteDropdown>
                    <DropdownItem onClick={() => handleSortOptionClick('asc')}>노트 오름차순</DropdownItem>
                    <DropdownItem onClick={() => handleSortOptionClick('desc')}>노트 내림차순</DropdownItem>
                    <DropdownItem onClick={() => handleSortOptionClick('edit-newest')}>수정일 - 최신순</DropdownItem>
                    <DropdownItem onClick={() => handleSortOptionClick('edit-oldest')}>수정일 - 오래된 순</DropdownItem>
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

export default SortDropdown;
