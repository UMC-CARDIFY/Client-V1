import MenuBar from '../../components/MenuBar'
import TopBar from '../../components/TopBar'
import styled from 'styled-components'

const Container = styled.div`
  display:flex;
  flex-direction: row;
`


export const Archive = () => {
  return (
    <>
    <Container>
      <MenuBar />
      <TopBar />
    </Container>
    
    </>
  )
}

export default Archive
