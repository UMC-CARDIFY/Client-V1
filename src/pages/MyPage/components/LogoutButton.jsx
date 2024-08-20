import { useState } from 'react';
import styled from 'styled-components';
import LogoutModal from './Modal/LogoutModal';
import logoutIcon from '../../../assets/logout.svg';

const LogoutButtonContainer = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  height: 3.875rem;
  gap: 1.0625rem;
  flex-shrink: 0;
  border: none;
  border-radius: 0.625rem;
  background: #F8F8F8;
  color: #000;
  font-family: Pretendard;
  font-size: 1.25rem;
  font-style: normal;
  font-weight: 400;
  line-height: 1.5625rem; /* 125% */
  cursor: pointer;

  &:hover {
    background: #1C6BFF;
    color: white;
  }
`;

const LogoutButton = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleLogoutClick = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <LogoutButtonContainer onClick={handleLogoutClick}>
        <img src={logoutIcon} alt="logoutIcon" style={{margin: '0 0 0 1.5rem'}} />
        로그아웃
      </LogoutButtonContainer>
      {isModalOpen && <LogoutModal onClose={closeModal} />}
    </>
  );
};

export default LogoutButton;