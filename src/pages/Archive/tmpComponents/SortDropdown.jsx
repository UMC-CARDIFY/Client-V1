import { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import Sort from '../../../assets/sortIcon.svg';
import Close from '../../../assets/closeIcon.svg'; 

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

const SortDropdown = ({ onSortOptionClick, selectedTab, currentFolderId }) => {
  const [isOpen, setIsOpen] = useState(false);

  // Separate states for each entity
  const [folderSortOption, setFolderSortOption] = useState(null);
  const [folderNoteSortOption, setFolderNoteSortOption] = useState(null);
  const [noteSortOption, setNoteSortOption] = useState(null);

  const dropdownRef = useRef(null);
  const sortDivRef = useRef(null);

  const toggleDropdown = (event) => {
    event.stopPropagation();
    setIsOpen((prev) => !prev);
  };

  const handleSortOptionClick = (option) => {
    let optionWithTab = `${selectedTab};${option}`;

  console.log(optionWithTab)
  console.log(option)

    if (selectedTab === '폴더') {

      if (currentFolderId) {
      setFolderNoteSortOption(optionWithTab);
    } else {
      setFolderSortOption(optionWithTab);
    }
    } else {
      setNoteSortOption(optionWithTab);
    }

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

    if (selectedTab === '폴더') {
      setFolderSortOption(null);
      
      if (currentFolderId) {
      setFolderNoteSortOption(null);
    }
    }  else {
      setNoteSortOption(null);
    }

    if (onSortOptionClick) {
      onSortOptionClick(`${selectedTab};edit-newest`);
    }
    setIsOpen(false);
  };

  const getSelectedOption = () => {
    if (selectedTab === '폴더') {

      if (currentFolderId) {
        return folderNoteSortOption;
      }

      return folderSortOption;


    } 
    return noteSortOption;
  };

  const selectedOption = getSelectedOption();

  return (
    <SortDiv 
      onClick={toggleDropdown} 
      ref={sortDivRef} 
      isOpen={isOpen} 
      hasSelection={!!selectedOption}
    >
      {selectedOption ? (
        <>
        {selectedTab === '폴더' ? (
          <>
            <CloseButton src={Close} alt="Clear" onClick={handleClearSelection} />
            <span>
              {selectedOption.includes('asc') ? '폴더 이름 ↑' : 
              selectedOption.includes('desc') ? '폴더 이름 ↓' : 
              selectedOption.includes('edit-newest') ? '수정일 - 최신순' : 
              selectedOption.includes('edit-oldest') ? '수정일 - 오래된 순' : '정렬'}
            </span>
          </>
        ) : (
          <>
            <CloseButton src={Close} alt="Clear" onClick={handleClearSelection} />
            <span>
            {selectedOption.includes('asc') ? '노트 이름 ↑' : 
              selectedOption.includes('desc') ? '노트 이름 ↓' : 
              selectedOption.includes('edit-newest') ? '수정일 - 최신순' : 
              selectedOption.includes('edit-oldest') ? '수정일 - 오래된 순' : '정렬'}
            </span>
          </>
        )}
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
                e.stopPropagation(); 
                handleSortOptionClick('asc');
              }}
            >
              {currentFolderId ? '폴더 이름 ↑' : '폴더 이름 ↑'}
            </DropdownItem>
            <DropdownItem 
              onClick={(e) => {
                e.stopPropagation(); 
                handleSortOptionClick('desc');
              }}
            >
              {currentFolderId ? '폴더 이름 ↓' : '폴더 이름 ↓'}
            </DropdownItem>
            <DropdownItem 
              onClick={(e) => {
                e.stopPropagation(); 
                handleSortOptionClick('edit-newest');
              }}
            >
              {currentFolderId ? '수정일 - 최신순' : '수정일 - 최신순'}
            </DropdownItem>
            <DropdownItem 
              onClick={(e) => {
                e.stopPropagation(); 
                handleSortOptionClick('edit-oldest');
              }}
            >
              {currentFolderId ? '수정일 - 오래된 순' : '수정일 - 오래된 순'}
            </DropdownItem>
          </FolderDropdown>
        ) : (
          <NoteDropdown ref={dropdownRef}>
            <DropdownItem 
              onClick={(e) => {
                e.stopPropagation(); 
                handleSortOptionClick('asc');
              }}
            >
              노트 이름 ↑
            </DropdownItem>
            <DropdownItem 
              onClick={(e) => {
                e.stopPropagation(); 
                handleSortOptionClick('desc');
              }}
            >
              노트 이름 ↓
            </DropdownItem>
            <DropdownItem 
              onClick={(e) => {
                e.stopPropagation(); 
                handleSortOptionClick('edit-newest');
              }}
            >
              수정일 - 최신순
            </DropdownItem>
            <DropdownItem 
              onClick={(e) => {
                e.stopPropagation(); 
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
  currentFolderId: PropTypes.string, 
};

export default SortDropdown;
