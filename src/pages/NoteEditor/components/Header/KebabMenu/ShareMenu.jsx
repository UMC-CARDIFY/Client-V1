import { forwardRef, useState, useContext } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { NoteContext } from '../../../../../api/NoteContext';
import { cancelShare } from '../../../../../api/noteeditor/cancelShare';
import LibraryIcon from '../../../../../assets/shareLibrary.svg';

const ShareMenuWrapper = styled.div`
  position: absolute;
  width: 16.625rem;
  height: auto;
  top: 4.25rem; // 위치 조정
  left: 1.06rem;
  flex-shrink: 0;
  border-radius: 0.25rem;
  border: 1px solid var(--grays-gray-5-divider, #E8E8E8);
  background: var(--Grays-White, #FFF);
  box-shadow: 0px 4px 26px 0px rgba(0, 0, 0, 0.02), 0px 10px 60px 0px rgba(0, 74, 162, 0.03);
  z-index: 10;
  padding: 1.5rem 1.4rem;
  box-sizing: border-box;
`;

const Title = styled.div`
  color: var(--Grays-Black, #1A1A1A);
  font-family: Pretendard;
  font-size: 0.875rem;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
`;

const SubTitle = styled.div`
  color: var(--Grays-Gray2, #767676);
  font-family: Pretendard;
  font-size: 0.75rem;
  font-style: normal;
  font-weight: 300;
  line-height: normal;
  margin: 0.5rem 0 1rem 0;
`;

const CategoryDiv = styled.div`

`;

const CategoryRow = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.5rem;
`;

const CategoryButton = styled.div`
  padding: 0.375rem 0.625rem;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: var(--font-size-xs, 0.8125rem);
  background: ${(props) => (props.selected ? '#4A89FF' : '#f6f6f6')};
  color: ${(props) => (props.selected ? '#fff' : 'var(--Grays-Gray3, #B1B1B1)')};
  font-family: Pretendard;
  font-size: 0.75rem;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  cursor: pointer;
  transition: 0.2s;

  &:hover {
    background: ${(props) => (props.selected ? '#4A89FF' : '#F0F0F0')};
  }
`;

const ButtonWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-top: 1rem;
`;

const ShareMenuButton = styled.button`
  display: flex;
  width: 100%;
  padding: 0.75rem 0.375rem;
  justify-content: center;
  align-items: center;
  gap: 0.38rem;
  border-radius: 0.25rem;
  border: none;
  cursor: pointer;
  backgroud: ${(props) => (props.disabled ? '#F0F0F0' : '#ECEFF4')};
  color: ${(props) => (props.disabled ? '#b1b1b1' : '#646464')};
  font-family: Pretendard;
  font-size: 0.75rem;
  font-style: normal;
  font-weight: 500;
  line-height: normal;

  pointer-events: ${(props) => (props.disabled ? 'none' : 'auto')};

  &: hover{
    background: ${(props) => (props.disabled ? '#F0F0F0' : '#E6EAF1')};
  }
`;

// eslint-disable-next-line react/display-name
const ShareMenu = forwardRef(({ onShareToLibrary }, ref) => {
  const [selectedCategories, setSelectedCategories] = useState([]);
  //const [shared, setShared] = useState(false);
  const { noteData, setNoteData } = useContext(NoteContext); // NoteContext 사용
  const { isUpload, noteId } = noteData; // isUpload 상태와 noteId 가져오기
  const handleCategoryClick = (category) => {
    setSelectedCategories((prevSelected) => {
      if (prevSelected.includes(category)) {
        // 이미 선택된 카테고리를 다시 클릭하면 제거
        return prevSelected.filter((item) => item !== category);
      } else if (prevSelected.length < 3) {
        // 최대 3개의 카테고리 선택 가능
        return [...prevSelected, category];
      }
      return prevSelected; // 이미 3개 선택되었으면 아무 작업도 안 함
    });
  };

  const handleShareToLibrary = async () => {
    if (isUpload) {
      try {
        await cancelShare(noteData.noteId);
        setNoteData((prevData) => ({ ...prevData, isUpload: false }));
        setSelectedCategories([]); // 공유 취소 후 선택된 카테고리 초기화
        console.log('공유 취소 성공');
      } catch (error) {
        console.error('공유 취소 중 오류 발생:', error);
      }
    } else {
      onShareToLibrary(selectedCategories);
      setNoteData((prevData) => ({ ...prevData, isUpload: true }));
    }
  };

  return (
    <ShareMenuWrapper ref={ref}>
      <Title>공유하기</Title>
      <SubTitle>* 최대 3개 선택</SubTitle>
      <CategoryDiv>
        {isUpload ? (
          <CategoryRow>
            {selectedCategories.map((category) => (
              <CategoryButton key={category} selected>
                {category}
              </CategoryButton>
            ))}
          </CategoryRow>
        ) : (
          <>
            <CategoryRow>
              <CategoryButton
                onClick={() => handleCategoryClick('과학')}
                selected={selectedCategories.includes('과학')}
              >
                과학
              </CategoryButton>
              <CategoryButton
                onClick={() => handleCategoryClick('기술 · 공학')}
                selected={selectedCategories.includes('기술 · 공학')}
              >
                기술 · 공학
              </CategoryButton>
              <CategoryButton
                onClick={() => handleCategoryClick('경제 · 경영')}
                selected={selectedCategories.includes('경제 · 경영')}
              >
                경제 · 경영
              </CategoryButton>
            </CategoryRow>

            <CategoryRow>
              <CategoryButton
                onClick={() => handleCategoryClick('컴퓨터 · IT')}
                selected={selectedCategories.includes('컴퓨터 · IT')}
              >
                컴퓨터 · IT
              </CategoryButton>
              <CategoryButton
                onClick={() => handleCategoryClick('언어')}
                selected={selectedCategories.includes('언어')}
              >
                언어
              </CategoryButton>
              <CategoryButton
                onClick={() => handleCategoryClick('일반 상식')}
                selected={selectedCategories.includes('일반 상식')}
              >
                일반 상식
              </CategoryButton>
            </CategoryRow>

            <CategoryRow>
              <CategoryButton
                onClick={() => handleCategoryClick('인문')}
                selected={selectedCategories.includes('인문')}
              >
                인문
              </CategoryButton>
              <CategoryButton
                onClick={() => handleCategoryClick('예술')}
                selected={selectedCategories.includes('예술')}
              >
                예술
              </CategoryButton>
              <CategoryButton
                onClick={() => handleCategoryClick('역사 · 문화')}
                selected={selectedCategories.includes('역사 · 문화')}
              >
                역사 · 문화
              </CategoryButton>
              <CategoryButton
                onClick={() => handleCategoryClick('수학')}
                selected={selectedCategories.includes('수학')}
              >
                수학
              </CategoryButton>
            </CategoryRow>

            <CategoryRow>
              <CategoryButton
                onClick={() => handleCategoryClick('취업 · 수험')}
                selected={selectedCategories.includes('취업 · 수험')}
              >
                취업 · 수험
              </CategoryButton>
              <CategoryButton
                onClick={() => handleCategoryClick('기타')}
                selected={selectedCategories.includes('기타')}
              >
                기타
              </CategoryButton>
              <CategoryButton
                onClick={() => handleCategoryClick('정치 · 사회')}
                selected={selectedCategories.includes('정치 · 사회')}
              >
                정치 · 사회
              </CategoryButton>
            </CategoryRow>
          </>
        )}
      </CategoryDiv>

      <ButtonWrapper>
      <ShareMenuButton onClick={handleShareToLibrary} disabled={selectedCategories.length === 0 && !isUpload}>
      <img src={LibraryIcon} alt="LibraryIcon" style={{padding: '0'}} />
          {isUpload ? '공유 취소' : '자료실에 공유'}
        </ShareMenuButton>
      </ButtonWrapper>
    </ShareMenuWrapper>
  );
});

ShareMenu.propTypes = {
  onShareToLibrary: PropTypes.func.isRequired,
};

export default ShareMenu;