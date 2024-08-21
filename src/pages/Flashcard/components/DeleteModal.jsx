import PropTypes from 'prop-types';
import styled from 'styled-components';

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: var(--Main-Overlay, rgba(0, 0, 0, 0.30));
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 100;
`;

const ModalContent = styled.div`
  display: flex;
  flex-direction: column;
  width: 29.5rem;
  padding: 2rem 2rem 1.5rem 2rem;
  background: #FFF;
  box-shadow: 0px 4px 12px 0px rgba(0, 0, 0, 0.04), 0px 4px 20px 0px rgba(0, 0, 0, 0.06);
`;

const Icon = styled.div`
  width: 1.5rem;
  height: 1.5rem;
`;

const Title = styled.div`
  display: flex;
  align-items: center;
  color: var(--alert, #EA1215);
  font-family: Pretendard;
  font-size: 1.25rem;
  font-weight: 700;
  gap: 0.75rem;
`;

const Content = styled.div`
  color: var(--kakao-logo, #000);
  font-family: Pretendard;
  font-size: 1rem;
  font-weight: 400;
  line-height: 1.5;
  margin-top: 1rem;
`;

const ModalButtons = styled.div`
  display: flex;
  justify-content: flex-end;
  width: 100%;
  margin-top: 1.5rem;

  color: var(--kakao-logo, #000);
font-family: Pretendard;
font-size: 1rem;
font-style: normal;
font-weight: 400;
line-height: normal;
`;

const Button = styled.div`
  border: 1px solid #DDD;
  cursor: pointer;
  padding: 0.4375rem 1rem;
  text-align: center;
  background: #FFF;
`;

const ConfirmButton = styled(Button)`
`;

const CancelButton = styled(Button)`
`;

const DeleteModal = ({ onClose, onConfirm, noteName }) => (
  <ModalOverlay>
    <ModalContent>
      <Title>
        <Icon>
          <img src="/icons/alert.svg" alt="" />
        </Icon>
        카드 삭제
      </Title>
      <Content>
        ‘{noteName}’을 삭제하시겠습니까?<br />
        이 플래시카드를 생성한 노트도 함께 삭제됩니다.
      </Content>
      <ModalButtons>
        <CancelButton onClick={onClose}>취소</CancelButton>
        <ConfirmButton onClick={onConfirm}>확인</ConfirmButton>
      </ModalButtons>
    </ModalContent>
  </ModalOverlay>
);

DeleteModal.propTypes = {
  onClose: PropTypes.func.isRequired,
  onConfirm: PropTypes.func.isRequired,
  noteName: PropTypes.string.isRequired,
};

export default DeleteModal;
