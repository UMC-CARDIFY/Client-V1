import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { fetchFolders } from '../../api/common/selectFolderModal/fetchFolders';
import { useNavigate } from 'react-router-dom';
import { writeNote } from '../../api/common/selectFolderModal/writeNote';

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;
`;

const ModalContainer = styled.div`
  position: relative;
  width: 50rem;
  height: 32.5rem;
  flex-shrink: 0;
  border-radius: 0.75rem;
  background: var(--Grays-White, #FFF);
  box-shadow: 0px 4px 26px rgba(0, 0, 0, 0.02), 0px 10px 60px rgba(0, 74, 162, 0.03);
  padding: 2.5rem;
  z-index: 1000;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 1.27rem;
  right: 0.75rem;
  display: flex;
  width: 2.25rem;
  height: 2.25rem;
  padding: 0.75rem;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
  flex-shrink: 0;
  border-radius: 0.25rem;
  background: var(--Grays-White, #FFF);
  border: none;
  cursor: pointer;

  &:hover {
    background: var(--Grays-Gray8, #F4F4F4);
  }

  svg {
    fill: #B1B1B1;
  }
`;

const Heading = styled.div`
  color: var(--Grays-Black, #1A1A1A);
  font-family: Pretendard;
  font-size: 1rem;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  margin: 0;
`;

const SearchContainer = styled.div`
  display: flex;
  width: 48rem;
  height: var(--line-height-xl, 2.5rem);
  padding: 0.25rem 1rem 0.25rem 0.5rem; 
  align-items: center;
  gap: 0.5rem;
  flex-shrink: 0;
  border-bottom: 1px solid var(--grays-gray-5-divider, #E8E8E8);
  margin-top: 1.5rem;
  margin-bottom: 0.5rem;
`;

const SearchIcon = styled.div`
  width: 2rem;
  height: 2rem;
  flex-shrink: 0;

  svg {
    width: 100%;
    height: 100%;
  }
`;

const SearchInput = styled.input`
  width: 100%;
  height: 100%;
  border: none;
  outline: none;
  color: var(--Grays-Black, #1A1A1A);
  font-family: Pretendard;
  font-size: 0.9375rem;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  
  &::placeholder {
    color: var(--Grays-Gray3, #B1B1B1);
  }
`;

const FolderListContainer = styled.div`
  display: flex;
  width: 48rem;
  height: 26.3125rem;
  padding: var(--UI-Component-None, 0rem) 0.5rem;
  flex-direction: column;
  align-items: flex-start;
  flex-shrink: 0;
  overflow-y: auto; /* 내용이 많을 경우 스크롤 허용 */
  margin: 0 auto; /* 좌우 기준 중앙 정렬 */
`;

const FolderItemContainer = styled.div`
  display: flex;
  align-items: center;
  padding: 0.5rem 0;
  cursor: pointer;
  border-radius: 0.25rem;
  background-color: var(--Grays-White, #FFF);
  flex-direction: row; 
  width: 100%; 
  
  &:hover {
    background: var(--Grays-Gray8, #F4F4F4);
  }
`;

const FavoriteIcon = styled.div`
  display: flex;
  align-items: flex-start;
  align-self: stretch;
  border-radius: 0.25rem;
  background: transparent;
  width: 2rem;
  height: 2rem;

  svg {
    width: 100%;
    height: 100%;
  }
`;

const FolderIcon = styled.div`
  width: 1.5rem;
  height: 1.5rem;
  flex-shrink: 0;
  margin-right: var(--font-size-md, 1rem);

  svg {
    width: 100%;
    height: 100%;
  }
`;

const FolderName = styled.p`
  margin: 0;
  font-family: Pretendard;
  font-size: 0.875rem;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  flex-grow: 1;
  display: flex;
  align-items: center;
  color: var(--Grays-Black, #1A1A1A);
`;

const NoteCount = styled.span`
  margin-left: 0.2rem;
  color: var(--Grays-Gray3, #B1B1B1);
  font-family: Pretendard;
  font-size: 0.875rem;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`;

const colorMap = {
  blue: '#6698F5',
  ocean: '#5AA6C7',
  lavender: '#949AEC',
  gray: '#A9A9A9',
  mint: '#77CEC6',
  sage: '#AECA99',
  orange: '#FDB456',
  plum: '#D49AE9',
  coral: '#FD855F',
  rose: '#ED83B1'
};

const FolderItem = ({ name, count, color, markState, onClick }) => {
  const folderColor = colorMap[color] || '#A9A9A9'; 
  const isFavorite = markState === 'ACTIVE';

  return (
    <FolderItemContainer onClick={onClick}> {/* 여기에 onClick 전달 */}
      <FavoriteIcon>
        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" fill={isFavorite ? "#FFD338" : "transparent"} stroke={isFavorite ? "#FFD338" : "#B1B1B1"}>
          <path d="M15.9998 20.2527L12.4225 22.1332C12.2024 22.2489 11.9452 22.062 11.9873 21.8169L12.6705 17.8333L9.77531 15.0123C9.5972 14.8388 9.69544 14.5363 9.94153 14.5006L13.9412 13.9193L15.7308 10.2943C15.8409 10.0714 16.1588 10.0714 16.2688 10.2943L18.0578 13.9193L22.0576 14.5006C22.3036 14.5363 22.4019 14.8387 22.2238 15.0123L19.3292 17.8333L20.013 21.8169C20.0551 22.0619 19.7979 22.2489 19.5777 22.1332L15.9998 20.2527Z" />
        </svg>
      </FavoriteIcon>
      <FolderIcon>
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill={folderColor}>
          <path d="M4.8 19.2C4.305 19.2 3.8814 19.0239 3.5292 18.6717C3.177 18.3195 3.0006 17.8956 3 17.4V6.6C3 6.105 3.1764 5.6814 3.5292 5.3292C3.882 4.977 4.3056 4.8006 4.8 4.8H10.2L12 6.6H19.2C19.695 6.6 20.1189 6.7764 20.4717 7.1292C20.8245 7.482 21.0006 7.9056 21 8.4V17.4C21 17.895 20.8239 18.3189 20.4717 18.6717C20.1195 19.0245 19.6956 19.2006 19.2 19.2H4.8Z" />
        </svg>
      </FolderIcon>
      <FolderName>
        {name} <NoteCount>({count})</NoteCount>
      </FolderName>
    </FolderItemContainer>
  );
};

FolderItem.propTypes = {
  name: PropTypes.string.isRequired,
  count: PropTypes.number.isRequired,
  color: PropTypes.string.isRequired, 
  markState: PropTypes.string.isRequired, 
  onClick: PropTypes.func.isRequired,  // 추가
};

const decomposeHangul = (text) => {
  const initialConsonants = [
    'ㄱ', 'ㄲ', 'ㄴ', 'ㄷ', 'ㄸ', 'ㄹ', 'ㅁ', 'ㅂ', 'ㅃ', 'ㅅ', 'ㅆ', 'ㅇ', 'ㅈ', 'ㅉ', 'ㅊ', 'ㅋ', 'ㅌ', 'ㅍ', 'ㅎ'
  ];
  const medialVowels = [
    'ㅏ', 'ㅐ', 'ㅑ', 'ㅒ', 'ㅓ', 'ㅔ', 'ㅕ', 'ㅖ', 'ㅗ', 'ㅘ', 'ㅙ', 'ㅚ', 'ㅛ', 'ㅜ', 'ㅝ', 'ㅞ', 'ㅟ', 'ㅠ', 'ㅡ', 'ㅢ', 'ㅣ'
  ];
  const finalConsonants = [
    '', 'ㄱ', 'ㄲ', 'ㄳ', 'ㄴ', 'ㄵ', 'ㄶ', 'ㄷ', 'ㄹ', 'ㄺ', 'ㄻ', 'ㄼ', 'ㄽ', 'ㄾ', 'ㄿ', 'ㅀ', 'ㅁ', 'ㅂ', 'ㅄ', 'ㅅ', 'ㅆ', 'ㅇ', 'ㅈ', 'ㅊ', 'ㅋ', 'ㅌ', 'ㅍ', 'ㅎ'
  ];
  
  return text.split('').map((char) => {
    const code = char.charCodeAt(0) - 44032;
    if (code >= 0 && code <= 11171) {
      const initial = initialConsonants[Math.floor(code / 588)];
      const medial = medialVowels[Math.floor((code % 588) / 28)];
      const final = finalConsonants[code % 28];
      return initial + medial + final;
    }
    return char;
  }).join('');
};

const FolderSelectModal = ({ isOpen, onClose }) => {
  const [folders, setFolders] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate(); // useNavigate 훅 사용

  useEffect(() => {
    const loadFolders = async () => {
      try {
        const data = await fetchFolders();
        setFolders(data);
      } catch (error) {
        console.error('폴더 목록을 가져오는 중 오류가 발생했습니다.');
      }
    };

    if (isOpen) {
      loadFolders();
    }
  }, [isOpen]);

  const handleFolderClick = async (folderId) => {
    try {
        const note = await writeNote(folderId);
        console.log('API Response:', note);  // 로깅 추가
        // API 응답의 성공 여부를 확인하는 로직이 올바른지 검토
        if (note.noteId) {  // noteId가 있는지 확인하는 조건으로 변경
            console.log('Navigating to:', `/note-editor?folderId=${folderId}&noteId=${note.noteId}`);  // 내비게이션 전 로깅
            navigate(`/note-editor?folderId=${folderId}&noteId=${note.noteId}`);
        } else {
            console.error('Note creation failed:', note);
        }
    } catch (error) {
        console.error('노트 작성 중 오류가 발생했습니다:', error);
    }
};


  const filteredFolders = folders.filter((folder) => {
    const decomposedFolderName = decomposeHangul(folder.name);
    const decomposedSearchTerm = decomposeHangul(searchTerm);

    return decomposedFolderName.includes(decomposedSearchTerm);
  });

  if (!isOpen) return null;

  return (
    <ModalOverlay onClick={onClose}>
      <ModalContainer onClick={(e) => e.stopPropagation()}>
        <CloseButton onClick={onClose}>
          <svg xmlns="http://www.w3.org/2000/svg" width="12" height="13" viewBox="0 0 12 13" fill="none">
            <path fillRule="evenodd" clipRule="evenodd" d="M1.45814 12.1289C1.13029 12.4649 0.592144 12.4715 0.256146 12.1437C-0.0798521 11.8158 -0.0864619 11.2777 0.241381 10.9417L4.8125 6.25687L0.241381 1.57205C-0.086463 1.23605 -0.079853 0.697902 0.256146 0.370058C0.592143 0.0422153 1.13029 0.0488253 1.45814 0.384824L5.99988 5.03953L10.5416 0.384821C10.8695 0.0488223 11.4076 0.0422124 11.7436 0.370055C12.0796 0.697899 12.0862 1.23605 11.7584 1.57205L7.18726 6.25686L11.7584 10.9417C12.0862 11.2777 12.0796 11.8158 11.7436 12.1437C11.4076 12.4715 10.8695 12.4649 10.5416 12.1289L5.99988 7.4742L1.45814 12.1289Z" fill="#B1B1B1"/>
          </svg>
        </CloseButton>
        <Heading>새로운 노트를 추가할 폴더 선택</Heading>
        <SearchContainer>
          <SearchIcon>
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" fill="none">
              <path d="M23 23L19.6221 19.6221M19.6221 19.6221C20.1999 19.0444 20.6583 18.3584 20.971 17.6035C21.2837 16.8486 21.4446 16.0394 21.4446 15.2223C21.4446 14.4052 21.2837 13.5961 20.971 12.8411C20.6583 12.0862 20.1999 11.4003 19.6221 10.8225C19.0444 10.2447 18.3584 9.78635 17.6035 9.47365C16.8486 9.16094 16.0394 9 15.2223 9C14.4052 9 13.5961 9.16094 12.8411 9.47365C12.0862 9.78635 11.4003 10.2447 10.8225 10.8225C9.65556 11.9894 9 13.5721 9 15.2223C9 16.8726 9.65556 18.4552 10.8225 19.6221C11.9894 20.7891 13.5721 21.4446 15.2223 21.4446C16.8726 21.4446 18.4552 20.7891 19.6221 19.6221Z" stroke="#B1B1B1" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </SearchIcon>
          <SearchInput 
            placeholder="폴더명을 검색하세요."
            value={searchTerm} 
            onChange={(e) => setSearchTerm(e.target.value)} 
          />
        </SearchContainer>
        <FolderListContainer>
          {filteredFolders.map((folder) => (
            <FolderItem
              key={folder.folderId}
              name={folder.name}
              count={folder.getNoteCount}
              color={folder.color}
              markState={folder.markState} 
              onClick={() => handleFolderClick(folder.folderId)}
            />
          ))}
        </FolderListContainer>
      </ModalContainer>
    </ModalOverlay>
  );
};


FolderSelectModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default FolderSelectModal;