import styled from 'styled-components';
import modalClose from '../../../assets/modalClose.svg';
import { useState } from 'react';
import FolderSelectModal from './SelectFolderModal';

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
  z-index: 10;
`;

const ModalContent = styled.div`
  border-radius: 8px;
  position: relative;
  width: 61.3125rem;
  height: 42.8125rem;
  flex-shrink: 0;
  height: 45.5rem;
  flex-shrink: 0;
`;

const NoteDiv = styled.div`
  border-radius: var(--line-height-2xs, 1.25rem) var(--line-height-2xs, 1.25rem) 0rem 0rem;
  height: 36.375rem;
  flex-shrink: 0;
  background: #FFF;
  padding: 2rem;
`;

const CloseButton = styled.div`
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
`;

const ModalTitle = styled.h2`
  font-size: 1.5rem;
  margin-bottom: 1rem;
`;

const ModalBody = styled.div`
  font-size: 1rem;
  line-height: 1.5;
`;

const DownloadDiv = styled.div`
  display: flex;
  justify-content: center;
  gap: 3.87rem;
  background: #F2F4F8;
  border-radius: 0rem 0rem 1.25rem 1.25rem;
  padding: 1.5rem 0rem 1rem 0rem;
`;

const DownloadButton = styled.button`
  width: 18.125rem;
  height: 3.8125rem;
  flex-shrink: 0;
  border-radius: 0.625rem;
  background: ${(props) => (props.disabled ? '#E0E0E0' : '#D1D1D1')};
  color: ${(props) => (props.disabled ? '#A0A0A0' : '#000')};
  font-family: Pretendard;
  font-size: 1rem;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  border: none;
  cursor: ${(props) => (props.disabled ? '' : 'pointer')};
`;

const NoteModal = ({ show, onClose, title, content, isContainCard, libraryId }) => {
  if (!show) return null;
  console.log(isContainCard);

  const [isFolderSelectModal, setIsFolderSelectModal] = useState(false);
  const [isDownloadContain, setIsDownloadContain] = useState(false);

    const handleModalClose = () => {
        setIsFolderSelectModal(false);
    }

    const downloadContain = async () => {
        console.log('download');
        // 폴더 선택 모달창
        setIsFolderSelectModal(true);
        setIsDownloadContain(true);
    }

    const downloadNotContain =  async () => {
        console.log('download not flash');
        setIsFolderSelectModal(true);
        setIsDownloadContain(false);
    }

  return (
    <ModalBackdrop onClick={onClose}>
      <ModalContent onClick={e => e.stopPropagation()}>
        <NoteDiv>
          <CloseButton onClick={onClose}>
            <img src={modalClose} alt="close" />
          </CloseButton>
          <ModalTitle>{title}</ModalTitle>
          <ModalBody>{content}</ModalBody>
        </NoteDiv>
        <DownloadDiv>
            {isContainCard === 'None' ? (
            <>
            <DownloadButton onClick={downloadContain}>
            플래시카드 포함 300P
          </DownloadButton>
          <DownloadButton  onClick={downloadNotContain}>
            플래시카드 미포함 200P
          </DownloadButton>
          </>
                ) : isContainCard === 'ContainCard' ? (
                    <>
                <DownloadButton onClick={downloadContain}>
                새로운 노트로 저장
                </DownloadButton>
                </>
                ) : (
                    <>
                    <DownloadButton  onClick={downloadContain}>
                    플래시카드 포함 100P
                </DownloadButton>
                <DownloadButton onClick={downloadNotContain}>
                새로운 노트로 저장
                </DownloadButton>
                </>
            )} 
        </DownloadDiv>
      </ModalContent>

      <FolderSelectModal 
      isOpen={isFolderSelectModal} onClose={handleModalClose}
      libraryId={libraryId}
      isDownloadContain={isDownloadContain}
       />

    </ModalBackdrop>
  );
};

export default NoteModal;
