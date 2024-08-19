import PropTypes from 'prop-types';
import styled from 'styled-components';

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
  margin: 1.5rem auto;
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


const FolderSelectModal = ({ isOpen, onClose }) => {
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
          <SearchInput placeholder="폴더명을 검색하세요." />
        </SearchContainer>
      </ModalContainer>
    </ModalOverlay>
  );
};

FolderSelectModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default FolderSelectModal;
