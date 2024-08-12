import { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import KebabMenu from './KebabMenu/KebabMenu';
import ExportMenu from './KebabMenu/ExportMenu';
import ShareMenu from './KebabMenu/ShareMenu';
import { useSaveContext } from './SaveContext';

const HeaderWrapper = styled.header`
  background: var(--Grays-White, #FFF);
  box-shadow: 0px 4px 26px 0px rgba(0, 0, 0, 0.02), 0px 10px 60px 0px rgba(0, 74, 162, 0.03);
  padding-left: 1rem;
  padding-right: 1rem; 
  padding-top: 0.75rem;
  padding-bottom: 0.75rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  
  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
  }
`;

const KebabIcon = styled.button`
  width: var(--line-height-xl, 2.7rem);
  height: var(--line-height-xl, 2.7rem);
  flex-shrink: 0;
  background: none;
  border: none;
  cursor: pointer;

  svg {
    width: 100%;
    height: 100%;
  }
`;

const CloseButton = styled.button`
  width: var(--line-height-xl, 3rem);
  height: var(--line-height-xl, 3rem);
  flex-shrink: 0;
  background: none;
  border: none;
  cursor: pointer;
  margin-left: 0.5rem;
  margin-right: 1.5rem;

  svg {
    width: 100%;
    height: 100%;
  }
`;

const SearchWrapper = styled.div`
  display: flex;
  width: 23.125rem;
  padding: 0.5rem 0.75rem;
  align-items: center;
  gap: 0.75rem;
  border-radius: 0.5rem;
  background: var(--Main-BackGround, #F2F4F8);
  box-shadow: 0px 4px 26px 0px rgba(0, 0, 0, 0.02), 0px 10px 60px 0px rgba(0, 74, 162, 0.03);
  position: relative;
`;

const SearchIcon = styled.svg`
  width: 1.5rem;
  height: 1.5rem;
  flex-shrink: 0;
`;

const SearchInput = styled.input`
  border: none;
  background: none;
  outline: none;
  color: var(--Grays-Gray2, #767676);
  font-family: Pretendard;
  font-size: 0.875rem;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  flex-grow: 1;

  &::placeholder {
    color: var(--Grays-Gray2, #767676);
  }
`;

const SearchResultList = styled.div`
  position: absolute;
  top: 100%;
  left: 0;
  background: white;
  width: 100%;
  max-height: 200px;
  overflow-y: auto;
  box-shadow: 0px 4px 26px 0px rgba(0, 0, 0, 0.1);
  border-radius: 0.5rem;
  margin-top: 0.5rem;
  z-index: 1;
`;

const SearchResultItem = styled.div`
  padding: 12px 24px;
  border-bottom: 1px solid #ddd;
  cursor: pointer;

  &:hover {
    background: #f2f4f8;
  }
`;

const StarButton = styled.button`
  width: 2rem;
  height: 2rem;
  flex-shrink: 0;
  background: none;
  border: none;
  cursor: pointer;

  svg {
    width: 100%;
    height: 100%;
    stroke-width: ${(props) => (props.$active ? '1.3px' : '1.3px')};
    stroke: ${(props) => (props.$active ? 'rgba(255, 211, 56, 1)' : 'var(--Grays-Gray3, #B1B1B1)')};
    fill: ${(props) => (props.$active ? 'rgba(255, 211, 56, 1)' : 'none')};
  }
`;

StarButton.propTypes = {
  $active: PropTypes.bool.isRequired,
};


const NotificationText = styled.span`
  color: var(--Grays-Gray3, #B1B1B1);
  margin-left: 1rem;
  font-family: Pretendard;
  font-size: 0.9375rem;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
`;

const RightSection = styled.div`
  display: flex;
  align-items: center;
  position: relative;
`;

const LeftSection = styled.div`
  display: flex;
  align-items: center;
  position: relative;
`;

const SaveButton = styled.button`
  display: inline-flex;
  padding: var(--UI-Component-xxxxxS, 0.25rem) 0.75rem;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
  border-radius: 0.5rem;
  background: var(--Main-BackGround, #F2F4F8);
  border: none;
  cursor: pointer;
  margin-left: 1rem;

  span {
    color: var(--Semantic-Acitve, #699BF7);
    text-align: right;

    /* Typo/Body 2 */
    font-family: Pretendard;
    font-size: 0.9375rem;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
  }
`;

const ToggleMenuButton = styled.button`
  width: 3rem;
  height: 3rem;
  flex-shrink: 0;
  background: none;
  border: none;
  cursor: pointer;
  margin-right: -0.5rem;

  svg {
    width: 100%;
    height: 100%;
  }
`;

const Header = ({ isMenuCollapsed, toggleMenuBar }) => {
  const data = [
    'Document 1',
    'Document 2',
    'Folder A',
    'Folder B',
    'File XYZ',
    'File ABC'
  ];

  const [isStarActive, setIsStarActive] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState([]);
  const [isKebabMenuOpen, setIsKebabMenuOpen] = useState(false);
  const [isExportMenuOpen, setIsExportMenuOpen] = useState(false);
  const [isShareMenuOpen, setIsShareMenuOpen] = useState(false);
  const kebabMenuRef = useRef(null);
  const exportMenuRef = useRef(null);
  const shareMenuRef = useRef(null);

  const toggleStar = () => {
    setIsStarActive(!isStarActive);
  };

  const handleSearch = (term) => {
    setSearchTerm(term);
    if (term === '') {
      setResults([]);
    } else {
      const filteredResults = data.filter(item =>
        item.toLowerCase().includes(term.toLowerCase())
      );
      setResults(filteredResults);
    }
  };

  const handleKebabClick = () => {
    setIsKebabMenuOpen(!isKebabMenuOpen);
    setIsExportMenuOpen(false); // Hide export menu if it's open
    setIsShareMenuOpen(false); // Hide share menu if it's open
  };

  const handleExportClick = () => {
    setIsKebabMenuOpen(false);
    setIsExportMenuOpen(true);
  };

  const handleShareClick = () => {
    setIsKebabMenuOpen(false);
    setIsShareMenuOpen(true);
  };

  const handleClickOutside = (event) => {
    if (kebabMenuRef.current && !kebabMenuRef.current.contains(event.target)) {
      setIsKebabMenuOpen(false);
    }
    if (exportMenuRef.current && !exportMenuRef.current.contains(event.target)) {
      setIsExportMenuOpen(false);
    }
    if (shareMenuRef.current && !shareMenuRef.current.contains(event.target)) {
      setIsShareMenuOpen(false);
    }
  };

  useEffect(() => {
    if (isKebabMenuOpen || isExportMenuOpen || isShareMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isKebabMenuOpen, isExportMenuOpen, isShareMenuOpen]);

  const handleExportPDF = () => {
    alert('PDF로 내보내기');
  };

  const handleExportCSV = () => {
    alert('CSV로 내보내기');
  };

  const handleCopyLink = () => {
    alert('링크가 복사되었습니다.');
  };

  const handleShareToLibrary = () => {
    alert('자료실에 공유되었습니다.');
  };

  //저장
  const { saveImageCard } = useSaveContext(); // Context에서 saveImageCard 함수 가져오기

  const handleSave = () => {
    if (saveImageCard) { // 가림판카드가 저장되어야 하는 경우
      saveImageCard(); // ImageCard의 saveImageCard 함수 호출
    } else {
      //alert('저장할 데이터가 없습니다.');
    }
  };

  return (
    <HeaderWrapper>
      <LeftSection>
        {isMenuCollapsed && (
          <ToggleMenuButton onClick={toggleMenuBar}>
            <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 40 40" fill="none">
              <path d="M21 14L26 19.5L21 25" stroke="#B1B1B1" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M14 14L19 19.5L14 25" stroke="#B1B1B1" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </ToggleMenuButton>
        )}
        <KebabIcon onClick={handleKebabClick}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40" fill="none">
            <path fillRule="evenodd" clipRule="evenodd" d="M18.25 11.8333C18.25 11.3691 18.4344 10.924 18.7626 10.5958C19.0908 10.2676 19.5359 10.0833 20 10.0833H20.0117C20.4758 10.0833 20.9209 10.2676 21.2491 10.5958C21.5773 10.924 21.7617 11.3691 21.7617 11.8333V11.8449C21.7617 12.309 21.5773 12.7542 21.2491 13.0824C20.9209 13.4105 20.4758 13.5949 20.0117 13.5949H20C19.5359 13.5949 19.0908 13.4105 18.7626 13.0824C18.4344 12.7542 18.25 12.309 18.25 11.8449V11.8333ZM18.25 19.9999C18.25 19.5358 18.4344 19.0907 18.7626 18.7625C19.0908 18.4343 19.5359 18.2499 20 18.2499H20.0117C20.4758 18.2499 20.9209 18.4343 21.2491 18.7625C21.5773 19.0907 21.7617 19.5358 21.7617 19.9999V20.0116C21.7617 20.4757 21.5773 20.9208 21.2491 21.249C20.9209 21.5772 20.4758 21.7616 20.0117 21.7616H20C19.5359 21.7616 19.0908 21.5772 18.7626 21.249C18.4344 20.9208 18.25 20.4757 18.25 20.0116V19.9999ZM20 26.4166C19.5359 26.4166 19.0908 26.601 18.7626 26.9291C18.4344 27.2573 18.25 27.7025 18.25 28.1666V28.1783C18.25 28.6424 18.4344 29.0875 18.7626 29.4157C19.0908 29.7439 19.5359 29.9283 20 29.9283H20.0117C20.4758 29.9283 20.9209 29.7439 21.2491 29.4157C21.5773 29.0875 21.7617 28.6424 21.7617 28.1783V28.1666C21.7617 27.7025 21.5773 27.2573 21.2491 26.9291C20.9209 26.601 20.4758 26.4166 20.0117 26.4166H20Z" fill="#B1B1B1"/>
          </svg>
        </KebabIcon>
        {isKebabMenuOpen && (
          <KebabMenu
            ref={kebabMenuRef}
            onShare={handleShareClick}
            onExport={handleExportClick}
            onDelete={() => alert('삭제 기능')}
          />
        )}
        {isExportMenuOpen && (
          <ExportMenu
            ref={exportMenuRef}
            onExportPDF={handleExportPDF}
            onExportCSV={handleExportCSV}
          />
        )}
        {isShareMenuOpen && (
          <ShareMenu
            ref={shareMenuRef}
            onCopyLink={handleCopyLink}
            onShareToLibrary={handleShareToLibrary}
          />
        )}
        <StarButton $active={isStarActive} onClick={toggleStar}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 22 20" fill="none">
            <path d="M11.3026 16.2009C11.1133 16.1014 10.8871 16.1014 10.6978 16.2009L5.17609 19.1035L6.23071 12.9547C6.26688 12.7438 6.19694 12.5286 6.04368 12.3793L1.57487 8.02497L7.74838 7.12784C7.96006 7.09708 8.14305 6.96414 8.23774 6.77233L11.0001 1.17687L13.7616 6.77226C13.8563 6.9641 14.0393 7.09707 14.251 7.12784L20.4247 8.025L15.9567 12.3793C15.8035 12.5287 15.7336 12.7439 15.7698 12.9548L16.8253 19.1035L11.3026 16.2009ZM4.7098 19.3487C4.70991 19.3486 4.71001 19.3485 4.71012 19.3485L4.7098 19.3487ZM20.802 7.65727L20.8016 7.6577L20.802 7.65727Z" stroke={`${(props) => (props.active ? 'rgba(255, 211, 56, 1)' : '#B1B1B1')}`} strokeWidth="1.3" strokeLinejoin="round"/>
          </svg>
        </StarButton>
        <NotificationText>저장되지 않은 변경 사항이 있습니다.</NotificationText>
        <SaveButton onClick={()=>handleSave()}>
          <span>저장하기</span>
        </SaveButton>
      </LeftSection>
      <RightSection>
        <SearchWrapper>
          <SearchIcon xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none">
            <path d="M18 18L15.1047 15.1047M15.1047 15.1047C15.6 14.6094 15.9928 14.0215 16.2608 13.3744C16.5289 12.7273 16.6668 12.0338 16.6668 11.3334C16.6668 10.633 16.5289 9.93948 16.2608 9.2924C15.9928 8.64532 15.6 8.05737 15.1047 7.56212C14.6094 7.06687 14.0215 6.67401 13.3744 6.40598C12.7273 6.13795 12.0338 6 11.3334 6C10.633 6 9.93948 6.13795 9.2924 6.40598C8.64532 6.67401 8.05737 7.06687 7.56212 7.56212C6.56191 8.56233 6 9.9189 6 11.3334C6 12.7479 6.56191 14.1045 7.56212 15.1047C8.56233 16.1049 9.9189 16.6668 11.3334 16.6668C12.7479 16.6668 14.1045 16.1049 15.1047 15.1047Z" stroke="#767676" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
          </SearchIcon>
          <SearchInput
            placeholder="폴더 내 검색"
            value={searchTerm}
            onChange={(e) => handleSearch(e.target.value)}
          />
          {results.length > 0 && (
            <SearchResultList>
              {results.map((result, index) => (
                <SearchResultItem key={index}>
                  {result}
                </SearchResultItem>
              ))}
            </SearchResultList>
          )}
        </SearchWrapper>
        <CloseButton>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40" fill="none">
            <path fillRule="evenodd" clipRule="evenodd" d="M13.621 28.58C13.3007 28.9232 12.7628 28.9417 12.4196 28.6214C12.0764 28.3011 12.0579 27.7632 12.3782 27.42L18.8369 20.5L12.3782 13.58C12.0579 13.2368 12.0764 12.6989 12.4196 12.3786C12.7628 12.0583 13.3007 12.0768 13.621 12.42L19.9996 19.2542L26.3782 12.42C26.6985 12.0768 27.2364 12.0583 27.5796 12.3786C27.9228 12.6989 27.9413 13.2368 27.621 13.58L21.1623 20.5L27.621 27.42C27.9413 27.7632 27.9228 28.3011 27.5796 28.6214C27.2364 28.9417 26.6985 28.9232 26.3782 28.58L19.9996 21.7458L13.621 28.58Z" fill="#B1B1B1"/>
          </svg>
        </CloseButton>
      </RightSection>
    </HeaderWrapper>
  );
};

Header.propTypes = {
  isMenuCollapsed: PropTypes.bool.isRequired,
  toggleMenuBar: PropTypes.func.isRequired,
  active: PropTypes.bool,
};

export default Header;