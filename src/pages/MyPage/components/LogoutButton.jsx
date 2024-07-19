import styled from 'styled-components';

const LogoutButtonContainer = styled.button`
  display: flex;
  width: 42.25rem;
  padding: 1rem;
  justify-content: space-between;
  align-items: center;
  flex-direction: column;
  border: 1px solid #D9D9D9;
  cursor: pointer;
  margin-top: 1rem;
`;

const Text = styled.span`
  color: #000;
  font-family: Pretendard;
  font-size: 1rem;
  font-style: normal;
  font-weight: 300;
  line-height: normal;
`;

const LogoutButton = () => {
  const handleLogout = () => {
    console.log("Logout clicked");
  };

  return (
    <LogoutButtonContainer onClick={handleLogout}>
      <Text>로그아웃</Text>
    </LogoutButtonContainer>
  );
};

export default LogoutButton;
