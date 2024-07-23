import { useState } from 'react';
import styled from 'styled-components';

const MenuBarContainer = styled.div`
  width: 15rem;
  height: 100vh;
  flex-shrink: 0;
  background: var(--Main-BackGround, #F2F4F8);
  padding: 5rem 2rem 0 2rem;
  position: relative;
`;

const NowFolderContainer = styled.div`
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
  color: var(--Grays-Gray1, #646464);
  text-overflow: ellipsis;

  font-family: Pretendard;
  font-size: 1rem;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
`;

const FolderIcon = styled.div`
  width: 1.5rem;
  height: 1.5rem;
  flex-shrink: 0;
  background: #ccc;
  background-size: contain;
  margin-right: 0.5rem;
`;

const Divider = styled.div`
  width: 13rem;
  height: 0.03125rem;
  background: #CACACA;
`;

const FavoriteContainer = styled.div`
  margin-bottom: 1rem;
`;

const FavoriteTitle = styled.div`
  font-size: 1rem;
  margin-top: 0.5rem;
  margin-bottom: 0.5rem;
  display: flex;
  align-items: center;
  color: var(--Grays-Gray2, #767676);

  font-family: Pretendard;
  font-size: 0.75rem;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`;

const StarIcon = styled.div`
  width: 1.5rem;
  height: 1.5rem;
  flex-shrink: 0;
  background: #ccc;
  margin-right: 0.5rem;
`;

const NoteList = styled.div`
  width: 13rem;
  display: flex;
  padding: 0.5rem 0.25rem;
  align-items: center;
  gap: 0.5rem;
  align-self: stretch;
  cursor: pointer;
  transition: background-color 0.3s;
  color: var(--Grays-Gray1, #646464);

  font-family: Pretendard;
  font-size: 0.875rem;
  font-style: normal;
  font-weight: 500;
  line-height: normal;

  &:hover {
    background-color: #ffffff;
  }

  &.selected {
    border-radius: 0.5rem;
    background: var(--Grays-White, #FFF);
    color: var(--Grays-Black, #1A1A1A);
  }
`;

const NoteIcon = styled.div`
  width: 1.5rem;
  height: 1.5rem;
  background: #ccc;
  margin-right: 0.5rem;
`;

const AddButton = styled.button`
  display: flex;
  width: 3.6875rem;
  height: 1.625rem;
  padding: 0.1875rem 0.5625rem 0.1875rem 0.3125rem;
  align-items: center;
  justify-content: center;
  gap: 0.25rem;
  flex-shrink: 0;
  border-radius: 0.5rem;
  border: none;
  background: var(--Main-PrimaryDull, #E3EAF6);
  margin-top: 1rem;
  cursor: pointer;
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

const MenuBar = () => {
  const [selectedItem, setSelectedItem] = useState('');

  const menuItems = [
    { id: 1, name: '4차시 오답', isFavorite: true },
    { id: 2, name: '9차시 오답', isFavorite: true },
    { id: 3, name: '1차시', isFavorite: false },
    { id: 4, name: '제목', isFavorite: false },
    { id: 5, name: '3차시', isFavorite: false },
    { id: 6, name: '4차시', isFavorite: false },
    { id: 7, name: '5차시', isFavorite: false },
    { id: 8, name: '6차시', isFavorite: false },
    { id: 9, name: '7차시', isFavorite: false },
    { id: 10, name: '8차시', isFavorite: false },
    { id: 11, name: '9차시', isFavorite: false },
  ];

  const handleClick = (item) => {
    setSelectedItem(item.name);
  };

  return (
    <MenuBarContainer>
      <NowFolderContainer>
        <FolderIcon /> 폴더 이름
      </NowFolderContainer>

      <Divider />
      <FavoriteContainer>
        <FavoriteTitle>
          <StarIcon />
          즐겨찾기 한 항목
        </FavoriteTitle>
        {menuItems.filter(item => item.isFavorite).map(item => (
          <NoteList
            key={item.id}
            className={selectedItem === item.name ? 'selected' : ''}
            onClick={() => handleClick(item)}
          >
            <NoteIcon />
            {item.name}
          </NoteList>
        ))}
      </FavoriteContainer>
      <Divider />
      <div>
        {menuItems.filter(item => !item.isFavorite).map(item => (
          <NoteList
            key={item.id}
            className={selectedItem === item.name ? 'selected' : ''}
            onClick={() => handleClick(item)}
          >
            <NoteIcon />
            {item.name}
          </NoteList>
        ))}
      </div>

      <AddButton>+ 추가</AddButton>

      <BackButtonDiv>
        <BackButton />
      </BackButtonDiv>
    </MenuBarContainer>
  );
}

export default MenuBar;
