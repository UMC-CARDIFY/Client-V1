import { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import postNoteSearch from '../../../../api/noteeditor/postNoteSearch';
import { useLocation, useNavigate } from 'react-router-dom';
import arrow from '../../../../assets/arrow.svg';

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
  max-height: 26.125rem;
  overflow-y: auto;
  margin-top: 1.25rem;
  z-index: 1;
  display: flex;
  width: 23rem;
  align-items: center;
  flex-direction: column;
  border-radius: 0.3125rem;
  border: 1px solid var(--grays-gray-5-divider, #E8E8E8);
  box-shadow: 0px 4px 26px 0px rgba(0, 0, 0, 0.02), 0px 10px 60px 0px rgba(0, 74, 162, 0.03);
  box-sizing: border-box;
`;

const SearchResultItemTitle = styled.div`
  padding: 0.75rem 1.5rem;
  border-bottom: 1px solid var(--grays-gray-5-divider, #E8E8E8);
  background: #F5F6F9;
  cursor: pointer;
  width: 100%;
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;

  &:hover {
    background: #ECEFF4;
  }
    &.active{
    background: linear-gradient(0deg, rgba(0, 0, 0, 0.02) 0%, rgba(0, 0, 0, 0.02) 100%), #ECEFF4;
    }
`;

const NoteContent = styled.div`
  padding: 12px 24px;
  border-bottom: 1px solid #ddd;
  cursor: pointer;
  width: 100%;
  box-sizing: border-box;
`;

const NoteDiv =styled.div`
  width: 100%;
  
`;

const Img = styled.img`
   justify-content: flex-end;
`;

const Search = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const searchParams = new URLSearchParams(location.search);
  const folderId = searchParams.get('folderId');
  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [expandedNoteId, setExpandedNoteId] = useState(null);
  const dropdownRef = useRef(null);

  const handleSearch = async (term) => {
    setSearchTerm(term);
    if (term === '') {
      setResults([]);
      setIsDropdownOpen(false); // 검색어가 없으면 드롭다운 닫기
    } else {
      try {
        const { noteList } = await postNoteSearch(folderId, term);
        setResults(noteList);
        setIsDropdownOpen(true); // 검색 결과가 있으면 드롭다운 열기
      } catch (error) {
        console.error("Error fetching search results:", error);
        setResults([]);
        setIsDropdownOpen(false); // 오류 발생 시 드롭다운 닫기
      }
    }
  };

  const handleResultClick = (noteId) => {
    navigate(`/note-editor?folderId=${folderId}&noteId=${noteId}`);
    setIsDropdownOpen(false); // 결과 클릭 시 드롭다운 닫기
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsDropdownOpen(false); // 외부 클릭 시 드롭다운 닫기
    }
  };

  const toggleExpand = (noteId) => {
    setExpandedNoteId(prevId => (prevId === noteId ? null : noteId)); // 클릭된 노트를 확장하거나 닫기
  };

  useEffect(() => {
    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  return (
    <SearchWrapper ref={dropdownRef}>
      <SearchIcon xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none">
        <path d="M18 18L15.1047 15.1047M15.1047 15.1047C15.6 14.6094 15.9928 14.0215 16.2608 13.3744C16.5289 12.7273 16.6668 12.0338 16.6668 11.3334C16.6668 10.633 16.5289 9.93948 16.2608 9.2924C15.9928 8.64532 15.6 8.05737 15.1047 7.56212C14.6094 7.06687 14.0215 6.67401 13.3744 6.40598C12.7273 6.13795 12.0338 6 11.3334 6C10.633 6 9.93948 6.13795 9.2924 6.40598C8.64532 6.67401 8.05737 7.06687 7.56212 7.56212C6.56191 8.56233 6 9.9189 6 11.3334C6 12.7479 6.56191 14.1045 7.56212 15.1047C8.56233 16.1049 9.9189 16.6668 11.3334 16.6668C12.7479 16.6668 14.1045 16.1049 15.1047 15.1047Z" stroke="#767676" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
      </SearchIcon>
      <SearchInput
        placeholder="폴더 내 검색"
        value={searchTerm}
        onChange={(e) => handleSearch(e.target.value)}
        onFocus={() => searchTerm && setIsDropdownOpen(true)} // input 클릭 시 드롭다운 열기
      />
      {isDropdownOpen && results.length > 0 && (
        <SearchResultList>
          {results.map((result) => (
            <NoteDiv key={result.noteId}>
              <SearchResultItemTitle onClick={() => handleResultClick(result.noteId)}>
                <div>{result.noteName}</div>
                <Img src={arrow} alt='arrow'/>
              </SearchResultItemTitle>
              {result.textList.length > 0 ? (
                    result.textList.map((text, index) => (
                      <NoteContent key={index}>{text}</NoteContent>
                    ))
                  ) : (
                    '내용 없음'
                  )}
            </NoteDiv>
          ))}
        </SearchResultList>
      )}
    </SearchWrapper>
  );
};

export default Search;
