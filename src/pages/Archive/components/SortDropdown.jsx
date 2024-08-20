import { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import Sort from '../../../assets/sortIcon.svg';
import Close from '../../../assets/closeIcon.svg'; // X 버튼 아이콘

const SortDiv = styled.div`
  cursor: pointer;
  position: relative;
  display: flex;
  padding: 0.1875rem 0.5rem 0.1875rem 0.4375rem;
  align-items: center;
  gap: 0.375rem;
  border-radius: 0.3125rem;
  background: ${({ isOpen, hasSelection }) =>
    isOpen || hasSelection ? '#DCE8FF' : '#ECEFF4'};
  color: var(--Grays-Black, #1A1A1A);
  font-family: Pretendard;
  font-size: 0.875rem;
  font-style: normal;
  font-weight: 500;
  line-height: normal;

  &:hover {
    background: ${({ isOpen, hasSelection }) =>
      isOpen || hasSelection ? '#DCE8FF' : '#E3EAF6'};
  }

  &:active {
    background: #DCE8FF;
  }
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
  width: 8.375rem;
`;

const CloseButton = styled.img`
  cursor: pointer;
`;

const SortDropdown = ({ onSortOptionClick, selectedTab }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const dropdownRef = useRef(null);
  const sortDivRef = useRef(null);

  const toggleDropdown = (event) => {
    event.stopPropagation();
    setIsOpen(prev => !prev);
  };

  const handleSortOptionClick = (option) => {
    const optionWithTab = `${selectedTab};${option}`;
    console.log(optionWithTab)
    setSelectedOption(option); 
    if (onSortOptionClick) {
      onSortOptionClick(optionWithTab); 
    }
    setIsOpen(false);
  };

  const handleClickOutside = (event) => {
    if (
      sortDivRef.current &&
      !sortDivRef.current.contains(event.target) &&
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target)
    ) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleClearSelection = (event) => {
    event.stopPropagation();
    setSelectedOption(null); // 상태를 초기 상태로 변경
    if (onSortOptionClick) {
      onSortOptionClick(`${selectedTab};edit-newest`); // 초기 상태로 API 호출
    }
    setIsOpen(false);
  };

  return (
    <SortDiv 
      onClick={toggleDropdown} 
      ref={sortDivRef} 
      isOpen={isOpen} 
      hasSelection={!!selectedOption}
    >
      {selectedOption ? (
        <>
          <CloseButton src={Close} alt="Clear" onClick={handleClearSelection} />
          <span>
            {selectedOption === 'asc' ? '이름 ↑' : 
             selectedOption === 'desc' ? '이름 ↓' : 
             selectedOption === 'edit-newest' ? '수정일 - 최신순' : 
             selectedOption === 'edit-oldest' ? '수정일 - 오래된 순' : '정렬'}
          </span>
        </>
      ) : (
        <>
          <img src={Sort} alt="Sort Icon" />
          정렬
        </>
      )}
      {isOpen && (
        selectedTab === '폴더' ? (
          <FolderDropdown ref={dropdownRef}>
            <DropdownItem 
              onClick={(e) => {
                e.stopPropagation(); // 이벤트 버블링 방지
                handleSortOptionClick('asc');
              }}
            >
              폴더 이름 ↑
            </DropdownItem>
            <DropdownItem 
              onClick={(e) => {
                e.stopPropagation(); // 이벤트 버블링 방지
                handleSortOptionClick('desc');
              }}
            >
              폴더 이름 ↓
            </DropdownItem>
            <DropdownItem 
              onClick={(e) => {
                e.stopPropagation(); // 이벤트 버블링 방지
                handleSortOptionClick('edit-newest');
              }}
            >
              수정일 - 최신순
            </DropdownItem>
            <DropdownItem 
              onClick={(e) => {
                e.stopPropagation(); // 이벤트 버블링 방지
                handleSortOptionClick('edit-oldest');
              }}
            >
              수정일 - 오래된 순
            </DropdownItem>
          </FolderDropdown>
        ) : (
          <NoteDropdown ref={dropdownRef}>
            <DropdownItem 
              onClick={(e) => {
                e.stopPropagation(); // 이벤트 버블링 방지
                handleSortOptionClick('asc');
              }}
            >
              노트 이름 ↑
            </DropdownItem>
            <DropdownItem 
              onClick={(e) => {
                e.stopPropagation(); // 이벤트 버블링 방지
                handleSortOptionClick('desc');
              }}
            >
              노트 이름 ↓
            </DropdownItem>
            <DropdownItem 
              onClick={(e) => {
                e.stopPropagation(); // 이벤트 버블링 방지
                handleSortOptionClick('edit-newest');
              }}
            >
              수정일 - 최신순
            </DropdownItem>
            <DropdownItem 
              onClick={(e) => {
                e.stopPropagation(); // 이벤트 버블링 방지
                handleSortOptionClick('edit-oldest');
              }}
            >
              수정일 - 오래된 순
            </DropdownItem>
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
