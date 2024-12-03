import { PageContainer, Content } from "./Layout.style";
import Header from "../components/Header/index";
import Footer from "../components/Footer/index";
import { Outlet } from "react-router-dom"; 

const Layout = () => {
  return (
    <PageContainer>
      <Header />
      <Content>
        <Outlet />
      </Content>
      <Footer />
    </PageContainer>
  );
};

export default Layout;
