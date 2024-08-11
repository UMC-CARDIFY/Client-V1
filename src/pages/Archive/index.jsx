import MenuBar from '../../components/MenuBar'
import TopBar from '../../components/TopBar'
import styled from 'styled-components'
import Frame from './components/Frame'
import { useState } from 'react'
import { Desktop, Tablet, Laptop } from '../../styles/MediaQuery'

const Container = styled.div`
  display: flex;
  width: 100%;
  height: 100vh;
`

const Vcontainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const ContentArea = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%; 
  background: var(--Main-BackGround, #F2F4F8);
  gap: 2rem;

`;


export const Archive = () => {

  const [selectedTab, setSelectedTab] = useState('폴더');

  console.log(selectedTab)

  return (
    <>
    <Container>
      <Desktop>
      <MenuBar />
      <Vcontainer>
        <TopBar title='아카이브' subtitle='노트 작성 및 관리' setSelectedTab={setSelectedTab} selectedTab={selectedTab} />
        <ContentArea>
          <Frame selectedTab={selectedTab} />
        </ContentArea>
      </Vcontainer>
      </Desktop>
      <Laptop>
      <MenuBar />
      <Vcontainer>
        <TopBar title='아카이브' subtitle='노트 작성 및 관리' setSelectedTab={setSelectedTab} selectedTab={selectedTab} />
        <Frame selectedTab={selectedTab} />
      </Vcontainer>
      </Laptop>
      <Tablet>
      <MenuBar />
      <Vcontainer>
        <TopBar title='아카이브' subtitle='노트 작성 및 관리' setSelectedTab={setSelectedTab} selectedTab={selectedTab} />
        <Frame selectedTab={selectedTab} />
      </Vcontainer>
      </Tablet>
    </Container>
    
    
    </>
  )
}

export default Archive
