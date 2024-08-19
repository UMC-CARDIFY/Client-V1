import styled from 'styled-components';
import closeCard from '../../../assets/flashcard/closeCard.svg';
import folder from '../../../assets/flashcard/folder.svg';
import toNoteEditor from '../../../assets/flashcard/toNoteEditor.svg';

const ModalBackdrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  background: var(--Main-BackGround, #F2F4F8);
  width: 100%;
  height: 100%;
  position: relative;
  display: flex;
  flex-direction: column;
`;

const CloseButton = styled.div`
  position: absolute;
  top: 2.5rem;
  right: 2.5rem;
  background: none;
  border: none;
  cursor: pointer;
  width: 2.75rem;
  height: 2.75rem;
  flex-shrink: 0;
`;

const ModalTitle = styled.div`
  margin-top: 4rem;
  text-align: center;
  margin-bottom: 0.63rem;
  color: var(--Grays-Black, #1A1A1A);
  font-family: Pretendard;
  font-size: 1.5rem;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
`;

const ModalSubTitle = styled.div`
  display: flex;
  align-self: center;
  color: var(--Grays-Gray2, #767676);
  font-family: Pretendard;
  font-size: 1.125rem;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
  gap: 0.09rem;
`;

const ModalBody = styled.div`
  flex: 1;
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: center;
  position: relative;
`;

const CardBox = styled.div`
  width: 55.625rem;
  height: 32.75rem;
  flex-shrink: 0;
  border-radius: 0.75rem;
  background: var(--Grays-White, #FFF);
  box-shadow: 0px 4px 26px 0px rgba(0, 0, 0, 0.02), 0px 10px 60px 0px rgba(0, 74, 162, 0.03);
  z-index: 2;
  margin: 0 4rem;
  
  padding: 5rem;
  box-sizing: border-box;
  position: relative;

  color: var(--kakao-logo, #000);
font-family: Pretendard;
font-size: 1.25rem;
font-style: normal;
font-weight: 400;
line-height: normal;
`;

const SideBox = styled.div`
  width: 50rem;
  height: 32.75rem; /* CardBox와 동일한 높이 */
  flex-shrink: 0;
  border-radius: 0.75rem;
  background: var(--Grays-White, #FFF);
  box-shadow: 0px 4px 26px 0px rgba(0, 0, 0, 0.02), 0px 10px 60px 0px rgba(0, 74, 162, 0.03);
  position: absolute;
  z-index: 1;
  top: 5.4rem;
`;

const LeftBox = styled(SideBox)`
  left: calc(-27vw); /* 화면 크기에 따라 위치 조정 */
  transform: rotate(-6deg);
`;

const RightBox = styled(SideBox)`
  right: calc(-27vw); /* 화면 크기에 따라 위치 조정 */
  transform: rotate(6deg);
`;

const ToEditor = styled.div`
    position: absolute;
    bottom: 1rem;
    right: 1.5rem;
    display: flex;
width: 4rem;
height: 4rem;
padding: 1.21875rem 0.5rem 1.11456rem 1.25rem;
justify-content: flex-end;
align-items: center;
flex-shrink: 0;
cursor: pointer;
`;

const PageDiv = styled.div`
display: inline-flex;
align-items: center;
gap: var(--UI-Component-xxxxxS, 0.25rem);
justify-content: center;
    margin-bottom: 5rem;

    color: var(--Grays-Gray1, #646464);
font-family: Pretendard;
font-size: 1rem;
font-style: normal;
font-weight: 400;
line-height: normal;
`;


const CommonStudyModal = ({ onClose, studyCardSetId, noteName, folderName, color }) => {
  console.log(studyCardSetId);

  return (
    <ModalBackdrop onClick={onClose}>
      <ModalContent onClick={e => e.stopPropagation()}>
        <CloseButton onClick={onClose}>
          <img src={closeCard} alt="close" />
        </CloseButton>
        <ModalTitle>{noteName}</ModalTitle>
        <ModalSubTitle>
          <img src={folder} alt="folder" />
          {folderName}
        </ModalSubTitle>
        <ModalBody>
          <LeftBox />
          <CardBox>
            {/* 여기에서 카드 스택을 채우세요 */}
            card content
            <ToEditor>
              <img src={toNoteEditor} alt="toNoteEditor" />
            </ToEditor>
          </CardBox>
          <RightBox />
        </ModalBody>

        <PageDiv>
            <div>1</div>
            <div>/</div>
            <div>2</div>
        </PageDiv>
      </ModalContent>
    </ModalBackdrop>
  );
};

export default CommonStudyModal;
