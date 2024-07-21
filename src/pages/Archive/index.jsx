import MenuBar from '../../components/MenuBar'
import TopBar from '../../components/TopBar'
import styled from 'styled-components'
import Frame from './components/Frame'
import { useState } from 'react'
import { Desktop, Tablet, Laptop } from '../../styles/MediaQuery'

const Container = styled.div`
  display:flex;
  flex-direction: row;
  width: 100%;
  position:relative;
  height: 100vh;
`

const Vcontainer = styled.div`
  width:100%;
  height: 100%;
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
        <Frame selectedTab={selectedTab} />
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
      {/* <Vcontainer>
        <TopBar title='아카이브' subtitle='노트 작성 및 관리' setSelectedTab={setSelectedTab} selectedTab={selectedTab} />
        <Frame selectedTab={selectedTab} />
      </Vcontainer> */}
    </Container>
    
    
    </>
  )
}

export default Archive
