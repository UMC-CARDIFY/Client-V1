import styled from 'styled-components';
import PropTypes from 'prop-types';

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalContainer = styled.div`
  background: #fff;
  box-shadow: 0px 4px 26.7px 0px rgba(0, 0, 0, 0.02), 0px 10px 60px 0px rgba(0, 74, 162, 0.03);
  width: 36rem;
  height: 27.0625rem;
  padding: 2.5rem;
  position: relative;

  @media (max-width: 1440px) {
    width: 33rem;
    height: 25.0625rem;
  }

  @media (max-width: 1200px) {
    width: 30rem;
    height: 23.0625rem;
  }
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.5rem;
`;

const CloseButton = styled.div`
  cursor: pointer;
  width: 1.5rem;
  height: 1.5rem;
  flex-shrink: 0;

  svg {
    width: 100%;
    height: 100%;
  }
`;

const ModalTitle = styled.p`
  font-size: 1.25rem;
  margin: 0;
  color: var(--Grays-Black, #1A1A1A);
  font-family: Pretendard;
  font-size: 0.875rem;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
`;

const ModalContent = styled.div`
  height: 90%;
  overflow-y: auto;
  border: 1px solid #D9D9D9;
`;

const ScrollableContent = styled.div`
  overflow-y: auto;
  padding: 0 0.5rem;
  color: var(--Grays-Black, #1A1A1A);
  font-family: Pretendard;
  font-size: 0.75rem;
  font-style: normal;
  font-weight: 300;
  line-height: normal;
`;

const PrivacyModal = ({ onClose }) => {
  return (
    <ModalOverlay onClick={onClose}>
      <ModalContainer onClick={(e) => e.stopPropagation()}>
        <Header>
          <ModalTitle>개인정보취급방침</ModalTitle>
          <CloseButton onClick={onClose}>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M5 5L19 19M5 19L19 5" stroke="#1A1A1A"/>
            </svg>
          </CloseButton>
        </Header>
        <ModalContent>
          <ScrollableContent>
            <p>
              제1장 총칙<br />
              제1조(목적)<br />
              본 약관은 대·중소기업·농어업협력재단 기술보호통합포털(이하 당 관리시스템)이 제공하는 모든 서비스(이하 서비스)의 이용조건 및 절차, 이용자와 당 관리시스템의 권리, 의무, 책임사항과 기타 필요한 사항을 규정함을 목적으로 합니다.<br />
              제2조(약관의 효력 및 변경)<br />
              ① 당 관리시스템은 귀하가 본 약관 내용에 동의하는 것을 조건으로 귀하에게 서비스를 제공할 것이며, 귀하가 본 약관의 내용에 동의하는 경우, 당 관리시스템의 서비스 제공 행위 및 귀하의 서비스 사용 행위에는 본 약관이 우선적으로 적용될 것입니다.<br />
              ② 약관을 개정할 경우에는 적용일자 및 개정사유를 명시하여 현행약관과 함께 당 관리시스템의 초기화면에 그 적용일자 7일 이전부터 적용일자 전일까지 공지합니다. 다만, 이용자에게 불리하게 약관내용을 변경하는 경우에는 최소한 30일 이상의 사전 유예기간을 두고 공지합니다. 이 경우 당 관리시스템은 개정 전 내용과 개정 후 내용을 명확하게 비교하여 이용자가 알기 쉽도록 표시합니다. 이용자가 변경된 약관에 동의하지 않는 경우, 이용자는 본인의 회원등록을 취소(회원탈퇴)할 수 있으며 계속 사용의 경우는 약관변경에 대한 동의로 간주됩니다.<br />
              제3조(약관 외 준칙)<br />
              제1장 총칙<br />
              제1조(목적)<br />
              본 약관은 대·중소기업·농어업협력재단 기술보호통합포털(이하 당 관리시스템)이 제공하는 모든 서비스(이하 서비스)의 이용조건 및 절차, 이용자와 당 관리시스템의 권리, 의무, 책임사항과 기타 필요한 사항을 규정함을 목적으로 합니다.<br />
              제2조(약관의 효력 및 변경)<br />
              ① 당 관리시스템은 귀하가 본 약관 내용에 동의하는 것을 조건으로 귀하에게 서비스를 제공할 것이며, 귀하가 본 약관의 내용에 동의하는 경우, 당 관리시스템의 서비스 제공 행위 및 귀하의 서비스 사용 행위에는 본 약관이 우선적으로 적용될 것입니다.<br />
              ② 약관을 개정할 경우에는 적용일자 및 개정사유를 명시하여 현행약관과 함께 당 관리시스템의 초기화면에 그 적용일자 7일 이전부터 적용일자 전일까지 공지합니다. 다만, 이용자에게 불리하게 약관내용을 변경하는 경우에는 최소한 30일 이상의 사전 유예기간을 두고 공지합니다. 이 경우 당 관리시스템은 개정 전 내용과 개정 후 내용을 명확하게 비교하여 이용자가 알기 쉽도록 표시합니다. 이용자가 변경된 약관에 동의하지 않는 경우, 이용자는 본인의 회원등록을 취소(회원탈퇴)할 수 있으며 계속 사용의 경우는 약관변경에 대한 동의로 간주됩니다.<br />
              제3조(약관 외 준칙)<br />
              제1장 총칙<br />
              제1조(목적)<br />
              본 약관은 대·중소기업·농어업협력재단 기술보호통합포털(이하 당 관리시스템)이 제공하는 모든 서비스(이하 서비스)의 이용조건 및 절차, 이용자와 당 관리시스템의 권리, 의무, 책임사항과 기타 필요한 사항을 규정함을 목적으로 합니다.<br />
              제2조(약관의 효력 및 변경)<br />
              ① 당 관리시스템은 귀하가 본 약관 내용에 동의하는 것을 조건으로 귀하에게 서비스를 제공할 것이며, 귀하가 본 약관의 내용에 동의하는 경우, 당 관리시스템의 서비스 제공 행위 및 귀하의 서비스 사용 행위에는 본 약관이 우선적으로 적용될 것입니다.<br />
              ② 약관을 개정할 경우에는 적용일자 및 개정사유를 명시하여 현행약관과 함께 당 관리시스템의 초기화면에 그 적용일자 7일 이전부터 적용일자 전일까지 공지합니다. 다만, 이용자에게 불리하게 약관내용을 변경하는 경우에는 최소한 30일 이상의 사전 유예기간을 두고 공지합니다. 이 경우 당 관리시스템은 개정 전 내용과 개정 후 내용을 명확하게 비교하여 이용자가 알기 쉽도록 표시합니다. 이용자가 변경된 약관에 동의하지 않는 경우, 이용자는 본인의 회원등록을 취소(회원탈퇴)할 수 있으며 계속 사용의 경우는 약관변경에 대한 동의로 간주됩니다.<br />
              제3조(약관 외 준칙)<br />
            </p>
          </ScrollableContent>
        </ModalContent>
      </ModalContainer>
    </ModalOverlay>
  );
};

PrivacyModal.propTypes = {
  onClose: PropTypes.func.isRequired,
};

export default PrivacyModal;