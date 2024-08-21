import { forwardRef, useState } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
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
  padding: 1.5rem 1.5rem;
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
  background: #F6F6F6;
  color: var(--Grays-Gray3, #B1B1B1);
  font-family: Pretendard;
  font-size: 0.75rem;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  cursor: pointer;

  &:hover {
    background: #F0F0F0;
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
  background: var(--Main-BackGround, #F0F0F0);
  border: none;
  cursor: pointer;
  color: #B1B1B1;
  font-family: Pretendard;
  font-size: 0.75rem;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
`;

// eslint-disable-next-line react/display-name
const ShareMenu = forwardRef(({ onShareToLibrary }, ref) => {


  return (
    <ShareMenuWrapper ref={ref}>
      <Title>
         공유하기
      </Title>
      <SubTitle>* 최대 3개 선택</SubTitle>
      <CategoryDiv>
        <CategoryRow>
          <CategoryButton>과학 </CategoryButton>
          <CategoryButton>기술·공학 </CategoryButton>
          <CategoryButton>경제·경영 </CategoryButton>
        </CategoryRow>

        <CategoryRow>
          <CategoryButton>컴퓨터·IT </CategoryButton>
          <CategoryButton>언어 </CategoryButton>
          <CategoryButton>일반 상식 </CategoryButton>
        </CategoryRow>

        <CategoryRow>
          <CategoryButton>인문 </CategoryButton>
          <CategoryButton>예술 </CategoryButton>
          <CategoryButton>역사·문화 </CategoryButton>
          <CategoryButton>수학 </CategoryButton>
        </CategoryRow>

        <CategoryRow>
          <CategoryButton>취업·수험 </CategoryButton>
          <CategoryButton>기타 </CategoryButton>
          <CategoryButton>정치·사회 </CategoryButton>
        </CategoryRow>
      </CategoryDiv>

      <ButtonWrapper>
        <ShareMenuButton onClick={onShareToLibrary}>
          <img src={LibraryIcon} alt="LibraryIcon" style={{padding: '0'}} />
          자료실에 공유
        </ShareMenuButton>
      </ButtonWrapper>
    </ShareMenuWrapper>
  );
});

ShareMenu.propTypes = {
  onShareToLibrary: PropTypes.func.isRequired,
};

export default ShareMenu;
