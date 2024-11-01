import styled from "styled-components";
import footerLogo from "../../assets/footerLogo.svg";
import insta from "../../assets/insta.svg";
import tistory from "../../assets/tistory.svg";

const Container = styled.footer`
  background: #ebebeb;
  padding: 2rem 5rem;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

const ButtonWrapper = styled.div`
  display: flex;
  gap: 1.5rem;
`;

const Button = styled.div`
  all: unset;
  color: #575757;
`;

const LogoContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 0.87rem;
`;

const Logo = styled.img`
  width: 3.875rem;
  height: 3.875rem;
`;

const Text = styled.p`
  color: #575757;
  font-size: 1rem;
  font-style: normal;
  font-weight: 400;
`;

const Footer = () => {
  return (
    <Container>
      <ButtonContainer>
        <ButtonWrapper>
          <Button>이용 가이드</Button>
          <Button>요금제 소개</Button>
          <Button>이용 약관</Button>
          <Button>개인정보취급방침</Button>
        </ButtonWrapper>
        <img src={insta} />
      </ButtonContainer>
      <LogoContainer>
        <Logo src={footerLogo} />
        <Text>CARDIFY @ 2024. All rights reserved.</Text>
      </LogoContainer>
    </Container>
  );
};

export default Footer;
