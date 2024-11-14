import styled from "styled-components";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import DefaultFolder from './components/DefaultFolder';

const Archive = () => {
  return (
    <PageContainer>
      <Header />
      <Content>
        <DefaultFolder />
      </Content>
      <Footer />
    </PageContainer>
  );
};

export default Archive;

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

const Content = styled.div`
  flex: 1; /* 헤더와 푸터를 제외한 나머지 공간을 차지 */
  display: flex;
  box-sizing: border-box;
  width: 100%;
`;
