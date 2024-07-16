import styled from 'styled-components';

const MenuBarContainer = styled.div`
  width: 15rem;
  border-right: 1px solid var(--B1B1B1, #B1B1B1);
  flex-shrink: 0;
  display:flex;
  flex-direction:column;
  justify-content:center;
  align-items: center;
    `;

const MenuContainer = styled.div`
  display: inline-flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 1rem;
  margin: 11rem 0 19.75rem 0;
    `;

const Menu = styled.div`
  display:flex;
  flex-direction:row;
  padding: 0.5rem;
  align-items: center;
  gap: 0.5rem;
  align-self: stretch;
    `;

const Text = styled.p`
  margin:0;
    `;

const NoteAdd =styled.button`
  display: inline-flex;
  padding: 0.5rem var(--font-size-md, 1rem);
  justify-content: center;
  align-items: center;
  gap: var(--font-size-md, 0.875rem);
  border: 1px solid #000;
  background: rgba(0, 0, 0, 0.20);
  margin-bottom:4rem;
`;


const MenuBar = () => {
  return (  
    <MenuBarContainer>
     <div style={{ width: '6.25rem', height: '6.25rem' ,background:'gray', marginTop:'4.5rem'}}>로고</div>  
      <MenuContainer>
        <Menu>
        <div style={{ width: '32px', height: '32px',background:'gray' }}>로고</div>
          <Text>대시보드</Text>
        </Menu>
        <Menu>
        <div style={{ width: '32px', height: '32px',background:'gray' }}>로고</div>
          <Text>아카이브</Text>
        </Menu>
        <Menu>
        <div style={{ width: '32px', height: '32px',background:'gray' }}>로고</div>
          <Text>플래시 카드</Text>
        </Menu>
        <Menu>
        <div style={{ width: '32px', height: '32px' ,background:'gray'}}>로고</div>
          <Text>자료실</Text>
        </Menu>
      </MenuContainer>
      <NoteAdd>노트 추가</NoteAdd>
    </MenuBarContainer>
  )
}

export default MenuBar