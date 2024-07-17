import MenuBar from '../../components/MenuBar'
import TopBar from '../../components/TopBar'
import styled from 'styled-components'
import Frame from './components/Frame'

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
  return (
    <>
    <Container>
      <MenuBar />
      <Vcontainer>
        <TopBar />
        <Frame />
      </Vcontainer>
    </Container>
    
    </>
  )
}

export default Archive
