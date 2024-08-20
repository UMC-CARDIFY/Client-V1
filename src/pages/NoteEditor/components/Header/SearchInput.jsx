import { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

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

const Search = ({ data }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState([]);

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

  return (
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
  );
};

Search.propTypes = {
  data: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default Search;
