import styled from "styled-components";
import logo from "../../assets/logo.svg";
import MyPage from "../../assets/myPage.svg";
import searchThin from "../../assets/searchThin.svg";

const Container = styled.header`
  display: flex;
  justify-content: center;
  padding: 2rem 4rem;
  align-items: center;
  box-shadow: 0px 4px 26px 0px rgba(0, 0, 0, 0.02), 0px 10px 60px 0px rgba(0, 74, 162, 0.03);
`;


const ButtonContainer = styled.div`
  display: flex;
  gap: 2rem;
  margin-left: 11.02rem;
  margin-right: 10.94rem;
`;

const InputContainer = styled.div`
  display: flex;
  margin-right: 2.5rem;
  width: 20.8125rem;
  height: 3.1875rem;
  align-items: center;
  border-radius: 1.625rem;
  background: #f5f5f5;
  padding-left: 1.56rem;
`;

const SearchThin = styled.img`
  width: 21px;
  height: 21px;
  margin-right: 1rem;
`;

const Input = styled.input`
  all: unset;
`;

const Button = styled.button`
  all: unset;
  cursor: pointer;
`;

const Header = () => {
  return (
    <Container>
      <img src={logo} />
      <ButtonContainer>
        <Button>대시보드</Button>
        <Button>아카이브</Button>
        <Button>플래시 카드</Button>
        <Button>자료실</Button>
      </ButtonContainer>
      <InputContainer>
        <SearchThin src={searchThin} />
        <Input />
      </InputContainer>
      <img src={MyPage} />
    </Container>
  );
};

export default Header;
