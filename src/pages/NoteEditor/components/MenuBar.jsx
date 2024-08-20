import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';
import axios from 'axios';
import config from '../../../api/config';

const MenuBarContainer = styled.div.withConfig({
  shouldForwardProp: (prop) => prop !== 'isCollapsed',
})`
  display: flex;
  flex-direction: column;
  width: 15rem;
  height: 100vh;
  flex-shrink: 0;
  background: var(--Main-BackGround, #F2F4F8);
  padding: 5rem 2rem 0 2rem;
  position: relative;
  transition: transform 0.3s ease-in-out;

  ${({ isCollapsed }) =>
    isCollapsed &&
    css`
      transform: translateX(-100%);
    `}

  @media screen and (max-width: 1024px) {
    width: 13rem;
  }
`;

const NowFolderContainer = styled.div`
  width: 14rem;
  margin-bottom: 0.25rem;
  display: inline-flex;
  align-items: center;
  gap: 0.875rem;
  color: var(--Grays-Gray1, #646464);
  text-overflow: hidden;
  font-family: Pretendard;
  font-size: 1rem;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
`;

const FolderIcon = styled.div`
  width: 2rem;
  height: 2rem;
`;

const Divider = styled.div`
  width: 14rem;
  height: 0.03125rem;
  background: #CACACA;
`;

const Divider2 = styled.div`
  width: 14rem;
  height: 0.03125rem;
  background: #CACACA;
  margin-top: 0.5rem;
  margin-bottom: 0.25rem;
`;

const FavoriteContainer = styled.div`

`;

const FavoriteTitle = styled.div`
  margin-top: 0.25rem;
  display: flex;
  width: 14rem;
  align-items: center; 
  gap: var(--UI-Component-xxxxxS, 0.25rem);
  color: var(--Grays-Gray2, #767676);
  font-family: Pretendard;
  font-size: 0.75rem;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`;


const StarIcon = styled.div`
  width: 2rem;
  height: 2rem;
  flex-shrink: 0;
`;

const NoteContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const NoteList = styled.div`
  width: 14rem;
  display: flex;
  padding: 0.5rem var(--UI-Component-xxxxxS, 0.25rem);


  align-items: center;
  gap: 0.5rem;
  margin-top: var(--UI-Component-xxxxxS, 0.25rem);
  align-self: stretch;
  cursor: pointer;
  border-radius: 0.5rem;
  overflow: hidden;
  color: var(--Grays-Gray1, #646464);
  text-overflow: ellipsis;
  font-family: Pretendard;
  font-size: 0.875rem;
  font-style: normal;
  font-weight: 500;
  line-height: normal;

  &:hover {
    background-color: #ffffff;
  }

  &.selected {
    background: var(--Grays-White, #FFF);
    color: var(--Grays-Black, #1A1A1A);
  }
`;

const NoteIcon = styled.div`
  width: 1.5rem;
  height: 1.5rem;

  svg {
    fill: ${props => props.iconColor};
  }
`;

const AddButton = styled.button`
  display: flex;
  width: 3.9rem; /*글씨가 내려가서 3.6875rem에서 늘림*/
  height: 1.75rem; /*디자인에 맞게 1.625rem에서 늘림*/
  padding: 0.1875rem 0.5625rem 0.1875rem 0.3125rem;
  align-items: center;
  justify-content: center;
  align-self: center;
  gap: 0.25rem;
  flex-shrink: 0;
  border-radius: 0.5rem;
  border: none;
  background: var(--Main-PrimaryDull, #E3EAF6);
  margin-top: 1.25rem;
  cursor: pointer;

  color: var(--Grays-Gray1, #646464);
  font-family: Pretendard;
  font-size: 0.75rem;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
`;

const PlusIcon = styled.div`
  width: 1.25rem;
  height: 1.25rem;
  flex-shrink: 0;
`;

const BackButtonDiv = styled.div`
  position: absolute;
  bottom: 1rem;
  left: 50%;
  transform: translateX(-50%);
`;

const BackButton = styled.div`
  width: 2rem;
  height: 2rem;
  cursor: pointer;
`;

const PushButton = styled.div`
  position: absolute;
  top: 1rem;
  right: 1rem;
  width: 2.5rem;
  height: 2.5rem;
  cursor: pointer;
  flex-shrink: 0;
`;

const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center; /* 가로 방향으로 가운데 정렬 */
  padding-bottom: 2rem; /* 추가 버튼 위의 여백을 위해 추가 */
  width: 100%;
`;

const colorMap = {
  blue: '#6698F5',
  ocean: '#5AA6C7',
  lavedar: '#949AEC',
  gray: '#A9A9A9',
  mint: '#77CEC6',
  sage: '#AECA99',
  orange: '#FDB456',
  plum: '#D49AE9',
  coral: '#FD855F',
  rose: '#ED83B1'
};

const MenuBar = ({ isCollapsed, toggleMenuBar, selectedFolderId, onSelectNote }) => {
  const [selectedNoteId, setSelectedNoteId] = useState(null);
  const [notes, setNotes] = useState([]);
  const [folderName, setFolderName] = useState(''); // 폴더 이름 상태 추가
  const [folderColor, setFolderColor] = useState('gray'); // 폴더 색상 상태 추가 (기본값: gray)

  useEffect(() => {
    const fetchNotesAndFolderName = async () => {
      const token = localStorage.getItem('accessToken');

      if (!token) {
        alert('로그인이 필요합니다.');
        return;
      }

      try {
        const response = await axios.post(
          `${config.apiBaseUrl}/notes/getNoteToFolder`,
          {
            folderId: selectedFolderId,
            page: 0,
            size: 20,
            order: 'asc',
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'application/json',
            },
          }
        );

        if (response.status === 200) {
          setNotes(response.data.noteList); // 노트 목록 설정
          setFolderName(response.data.folderName); // 폴더 이름 설정
          setFolderColor(response.data.folderColor); // 폴더 색상 설정
        } else {
          console.error('노트 목록을 가져오는 데 실패했습니다:', response.status);
        }
      } catch (error) {
        console.error('노트 목록을 가져오는 중 오류 발생:', error);
      }
    };

    if (selectedFolderId) {
      fetchNotesAndFolderName(); // 폴더 ID가 설정될 때마다 노트와 폴더 정보를 가져옴
    }
  }, [selectedFolderId]);

  const favoriteNotes = notes.filter(note => note.markState === 'ACTIVE');
  const folderIconColor = colorMap[folderColor] || colorMap.gray;

  const handleAddNote = async () => {
    const token = localStorage.getItem('accessToken');
  
    if (!token) {
      alert('토큰이 존재하지 않습니다. 다시 로그인해주세요.');
      return;
    }
  
    try {
      const response = await axios.get(`${config.apiBaseUrl}/notes/addNote`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: {
          folderId: selectedFolderId, 
        },
      });
  
      if (response.status === 200) {
        const { noteId, createdAt } = response.data;
        console.log('생성된 noteId:', noteId);
  
        setNotes((prevNotes) => [
          ...prevNotes,
          {
            noteId,
            name: `제목없음`, // 기본 노트 이름 설정
            isFavorite: false,
            createdAt,
          },
        ]);
      } else {
        console.error('노트 생성에 실패했습니다:', response.status);
      }
    } catch (error) {
      console.error('노트 생성 중 오류 발생:', error);
    }
  };
  
  const handleClick = (note) => {
    setSelectedNoteId(note.noteId);
    onSelectNote(note.noteId); // 선택된 노트의 ID를 NoteEditor로 전달
  };

  return (
    <MenuBarContainer isCollapsed={isCollapsed}>
      <PushButton onClick={toggleMenuBar}>
        {isCollapsed ? (
          <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 40 40" fill="none">
            <path
              d="M21 14L26 19.5L21 25"
              stroke="#B1B1B1"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M14 14L19 19.5L14 25"
              stroke="#B1B1B1"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        ) : (
          <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 40 40" fill="none">
            <path
              d="M26 25L21 19.5L26 14"
              stroke="#B1B1B1"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M19 25L14 19.5L19 14"
              stroke="#B1B1B1"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        )}
      </PushButton>
      <ContentContainer>

      <NowFolderContainer>
        <FolderIcon>
          {/* 폴더 아이콘 색상 설정 */}
          <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" fill="none">
            <path
              d="M6.4 25.5999C5.74 25.5999 5.1752 25.3651 4.7056 24.8955C4.236 24.4259 4.0008 23.8607 4 23.1999V8.7999C4 8.1399 4.2352 7.5751 4.7056 7.1055C5.176 6.6359 5.7408 6.4007 6.4 6.3999H13.6L16 8.7999H25.6C26.26 8.7999 26.8252 9.0351 27.2956 9.5055C27.766 9.9759 28.0008 10.5407 28 11.1999V23.1999C28 23.8599 27.7652 24.4251 27.2956 24.8955C26.826 25.3659 26.2608 25.6007 25.6 25.5999H6.4Z"
              fill={folderIconColor}
            />
          </svg>
        </FolderIcon>
        {folderName}
      </NowFolderContainer>

      <Divider />

      {favoriteNotes.length > 0 && (
        <>
          <FavoriteContainer>
            <FavoriteTitle>
              <StarIcon>
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" fill="none">
                  <path d="M15.9998 20.2526L12.4225 22.1331C12.2024 22.2488 11.9452 22.0619 11.9873 21.8168L12.6705 17.8333L9.77531 15.0122C9.5972 14.8387 9.69544 14.5363 9.94153 14.5005L13.9412 13.9193L15.7308 10.2942C15.8409 10.0713 16.1588 10.0713 16.2688 10.2943L18.0578 13.9193L22.0576 14.5005C22.3036 14.5363 22.4019 14.8387 22.2238 15.0122L19.3292 17.8333L20.013 21.8168C20.0551 22.0619 19.7979 22.2488 19.5777 22.1331L15.9998 20.2526Z" fill="#FFD338"/>
                </svg>
              </StarIcon>
              즐겨찾기 한 항목
            </FavoriteTitle>
            <NoteContainer>
              {favoriteNotes.map((note) => (
                <NoteList
                  key={note.noteId}
                  className={selectedNoteId === note.noteId ? 'selected' : ''}
                  onClick={() => handleClick(note)}
                >
                  <NoteIcon iconColor={folderIconColor}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                      <path d="M6.25694 21.5999C5.76556 21.5999 5.3556 21.4356 5.02707 21.1071C4.69854 20.7786 4.53391 20.3686 4.5332 19.8772V4.12257C4.5332 3.6319 4.69783 3.2223 5.02707 2.89377C5.35631 2.56524 5.76627 2.40061 6.25694 2.3999H14.2523C14.5175 2.3999 14.7719 2.50526 14.9594 2.6928L19.1736 6.90701C19.3612 7.09455 19.4665 7.3489 19.4665 7.61412V19.8772C19.4665 20.3679 19.3023 20.7779 18.9737 21.1071C18.6452 21.4363 18.2349 21.6006 17.7428 21.5999H6.25694ZM14.1332 7.73324H18.1584C18.2475 7.73324 18.2922 7.62552 18.2292 7.56253L14.3039 3.63728C14.2409 3.57428 14.1332 3.6189 14.1332 3.70799V7.73324Z" />
                    </svg>
                  </NoteIcon>
                  {note.name}
                </NoteList>
              ))}
            </NoteContainer>
          </FavoriteContainer>

          <Divider2 />
        </>
      )}


      <NoteContainer>
        {notes.filter((note) => !note.isFavorite).map((note) => (
          <NoteList
            key={note.noteId}
            className={selectedNoteId === note.noteId ? 'selected' : ''}
            onClick={() => handleClick(note)}
          >
            <NoteIcon iconColor={folderIconColor}>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M6.25694 21.5999C5.76556 21.5999 5.3556 21.4356 5.02707 21.1071C4.69854 20.7786 4.53391 20.3686 4.5332 19.8772V4.12257C4.5332 3.6319 4.69783 3.2223 5.02707 2.89377C5.35631 2.56524 5.76627 2.40061 6.25694 2.3999H14.2523C14.5175 2.3999 14.7719 2.50526 14.9594 2.6928L19.1736 6.90701C19.3612 7.09455 19.4665 7.3489 19.4665 7.61412V19.8772C19.4665 20.3679 19.3023 20.7779 18.9737 21.1071C18.6452 21.4363 18.2349 21.6006 17.7428 21.5999H6.25694ZM14.1332 7.73324H18.1584C18.2475 7.73324 18.2922 7.62552 18.2292 7.56253L14.3039 3.63728C14.2409 3.57428 14.1332 3.6189 14.1332 3.70799V7.73324Z" />
              </svg>
            </NoteIcon>
            {note.name}
          </NoteList>
        ))}
      </NoteContainer>
      </ContentContainer>

      <AddButton onClick={handleAddNote}>
        <PlusIcon>
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
          <rect x="4.16699" y="9.58325" width="11.6667" height="1" fill="#646464"/>
          <rect x="10.417" y="4.16675" width="11.6667" height="1" transform="rotate(90 10.417 4.16675)" fill="#646464"/>
          </svg>
        </PlusIcon>
        추가
      </AddButton>

      <BackButtonDiv>
        <BackButton />
      </BackButtonDiv>
    </MenuBarContainer>
  );
};

MenuBar.propTypes = {
  isCollapsed: PropTypes.bool.isRequired,
  toggleMenuBar: PropTypes.func.isRequired,
  selectedFolderId: PropTypes.number.isRequired, // 아카이브에서 선택된 폴더 ID
  onSelectNote: PropTypes.func.isRequired, 
};

export default MenuBar;