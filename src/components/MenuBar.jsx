import { useState } from 'react';
import styled from 'styled-components';
import { useNavigate, useLocation } from 'react-router-dom';

const MenuBarContainer = styled.div`
  width: 15.5rem;
  height: 100%; 
  flex-shrink: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  background: var(--Grays-White, #FFF);
  box-shadow: 4px 0px 26px 0px rgba(0, 0, 0, 0.02), 4px 0px 60px 0px rgba(0, 74, 162, 0.02);
  
  @media (max-width: 1200px) {
    width: 7rem;
  }
`;

const LogoContainer = styled.div`
  width: 4.88819rem;
  height: 4.04338rem;
  margin-top: 4.5rem;
  flex-shrink: 0;
  svg {
    width: 100%;
    height: 100%;
  }

  @media (max-width: 1200px) {
    width: 3.07956rem;
    height: 2.58775rem;
    margin-top: 3rem;
  }
`;

const TextLogoContainer = styled.div`
  width: 6.25rem;
  height: 1.03375rem;
  flex-shrink: 0;
  margin-top: 1rem;
  svg {
    width: 100%;
    height: 100%;
  }

  @media (max-width: 1200px) {
    width: 3.9375rem;
    height: 0.66156rem; 
  }
`;

const MenuContainer = styled.div`
  display: inline-flex;
  flex-direction: column;
  margin-top: auto;
  align-items: center;
  gap: var(--font-size-md, 1rem);

  @media (max-width: 1200px) {
    align-items: center;
    margin-top: auto;
  }
`;

const Menu = styled.div`
  display: flex;
  flex-direction: row;
  padding: 0.5rem;
  align-items: center;
  gap: 0.5rem;
  align-self: stretch;
  cursor: pointer;
  ${({ isActive }) => isActive && `
    svg {
      stroke: var(--Main-Primary, #0F62FE);
    }
    p {
      color: var(--Main-Primary, #0F62FE);
    }
  `}
  ${({ isActive }) => !isActive && `
    &:hover {
      svg {
        stroke: var(--Grays-Gray1, #646464);
      }
      p {
        color: var(--Grays-Gray1, #646464);
      }
    }
  `}

  @media (max-width: 1200px) {
    flex-direction: column;
    gap: 0;
    p {
      display: none;
    }
  }
`;

const Text = styled.p`
  margin: 0;
  color: var(--Grays-Gray3, #B1B1B1);
  font-family: Pretendard;
  font-size: 1.1rem;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
`;

const DashboardIcon = styled.div`
  display: flex;
  width: 1.5rem;
  height: 1.6875rem;
  flex-shrink: 0;
  align-items: center;
  svg {
    stroke-width: 2.2px;
    stroke: var(--Grays-Gray3, #B1B1B1);
  }
`;

const FlashCardIcon = styled.div`
  display: flex;
  width: 32px;
  height: 26px;
  flex-shrink: 0;
  align-items: center;
`;

const ArchiveIcon = styled.div`
  display: flex;
  width: 24px;
  height: 30px;
  flex-shrink: 0;
  align-items: center;
`;

const ResourceIcon = styled.div`
  display: flex;
  width: 28px;
  height: 28px;
  flex-shrink: 0;
  align-items: center;
`;

const NoteAdd = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
  width: 8.625rem;
  height: var(--line-height-xl, 2.5rem);
  flex-shrink: 0;
  border-radius: 0.375rem;
  background: var(--Main-Primary, #0F62FE);
  border: none;
  cursor: pointer;
  margin-top: auto;
  margin-bottom: 4rem;

  @media (max-width: 1200px) {
    width: var(--line-height-xl, 2.5rem);
    height: var(--line-height-xl, 2.5rem);
    margin-top: auto;
    margin-bottom: 3rem;
  }
`;

const NoteAddIcon = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: var(--font-size-md, 0.9rem);
  height: var(--font-size-md, 0.9rem);
  flex-shrink: 0;
  svg {
    width: 100%;
    height: 100%;
  }

  @media (max-width: 1200px) {
    width: 1rem;
    height: 1rem;
  }
`;

const NoteAddText = styled.span`
  color: var(--Grays-White, #FFF);
  font-family: Pretendard;
  font-size: 1rem;
  font-style: normal;
  font-weight: 600;
  line-height: normal;

  @media (max-width: 1200px) {
    display: none;
  }
`;


const MenuBar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [activePath, setActivePath] = useState(location.pathname);

  const navigateTo = (path) => {
    setActivePath(path);
    navigate(path);
  };

  return (  
    <MenuBarContainer>
      <LogoContainer>
        <svg xmlns="http://www.w3.org/2000/svg" width="79" height="65" viewBox="0 0 79 65" fill="none">
          <path d="M46.3573 64.6941L13.4731 32.5086L46.0306 0.00012207L78.9147 32.1736L46.3573 64.6881V64.6941ZM16.6654 30.7692L36.6171 50.493L58.9422 32.2873L36.6171 11.8344L16.6654 30.7692Z" fill="#72A3FF"/>
          <path d="M33.5883 64.694L0.704102 32.5086L33.2615 6.10352e-05L66.1457 32.1736L33.5883 64.6881V64.694ZM20.6645 32.4129L33.4854 44.964L46.1732 32.2872L33.3523 19.7361L20.6645 32.4129Z" fill="#0F62FE"/>
        </svg>
      </LogoContainer>  
      <TextLogoContainer>
        <svg xmlns="http://www.w3.org/2000/svg" width="100" height="17" viewBox="0 0 100 17" fill="none">
          <path d="M100 0.835449L93.5305 11.3552V16.6447H91.4139V11.3552L85.144 0.835449H87.5202L92.5521 9.421L97.7437 0.835449H100Z" fill="#0F62FE"/>
          <path d="M72.3606 0.835449H83.5426V2.69072H74.4572V8.07889L82.664 8.05916V9.91443H74.4572V16.6447H72.3606V0.835449Z" fill="#0F62FE"/>
          <path d="M68.9194 0.835449V16.6447H66.8228V0.835449H68.9194Z" fill="#0F62FE"/>
          <path d="M49.6824 0.835449H55.3532C60.8644 0.835449 64.0592 4.03283 64.0592 8.74995C64.0592 13.4671 60.8644 16.6447 55.3532 16.6447H49.6824V0.835449ZM55.4131 14.7697C59.4666 14.7697 61.9426 12.5986 61.9426 8.74995C61.9426 4.90125 59.4666 2.69072 55.4131 2.69072H51.779V14.7697H55.4131Z" fill="#0F62FE"/>
          <path d="M47.4522 16.6447H44.9762L41.342 11.0197C41.0425 11.0394 40.743 11.0592 40.4435 11.0592H36.5497V16.6447H34.4531V0.835449H40.4435C44.477 0.835449 46.8531 2.82888 46.8531 5.94731C46.8531 8.17758 45.6351 9.83548 43.4386 10.6052L47.4522 16.6447ZM40.2837 9.2039C43.0593 9.2039 44.7565 8.0789 44.7565 5.94731C44.7565 3.81572 43.0593 2.69072 40.2837 2.69072H36.5497V9.2039H40.2837Z" fill="#0F62FE"/>
          <path d="M30.0296 16.6447L28.4322 12.7368H20.7446L19.1471 16.6447H16.9507L23.5401 0.835449H25.7565L32.3259 16.6447H30.0296ZM21.4834 10.9013H27.6934L24.5984 3.26309L21.4834 10.9013Z" fill="#0F62FE"/>
          <path d="M8.38648 17C3.55427 17 0 13.5065 0 8.73021C0 3.95388 3.55427 0.460449 8.38648 0.460449C12.5198 0.460449 15.3752 2.82888 16.2139 6.14468H14.0773C13.3984 3.91441 11.3417 2.37493 8.42642 2.37493C4.75234 2.37493 2.09662 5.01967 2.09662 8.73021C2.09662 12.421 4.77231 15.0855 8.42642 15.0855C11.4216 15.0855 13.658 13.3486 14.2371 11.0986H16.3736C15.6747 14.3947 12.6197 17 8.38648 17Z" fill="#0F62FE"/>
        </svg>
      </TextLogoContainer>
      <MenuContainer>
        <Menu isActive={activePath === '/dashboard'} onClick={() => navigateTo('/dashboard')}>
          <DashboardIcon>
            {activePath === '/dashboard' ? (
              <svg xmlns="http://www.w3.org/2000/svg" width="28" height="30" viewBox="0 0 28 30" fill="none">
                <path d="M2.5 28.5C2.22386 28.5 2 28.2761 2 28V11C2 10.6852 2.14819 10.3889 2.4 10.2L13.4 1.95C13.7556 1.68333 14.2444 1.68333 14.6 1.95L25.6 10.2C25.8518 10.3889 26 10.6852 26 11V28C26 28.2761 25.7761 28.5 25.5 28.5H17.5C17.2239 28.5 17 28.2761 17 28V19C17 18.4477 16.5523 18 16 18H12C11.4477 18 11 18.4477 11 19V28C11 28.2761 10.7761 28.5 10.5 28.5H2.5Z" fill="#0F62FE" stroke="#0F62FE" strokeWidth="2.2"/>
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" width="28" height="30" viewBox="0 0 28 30" fill="none">
                <path d="M2.5 28.5C2.22386 28.5 2 28.2761 2 28V11C2 10.6852 2.14819 10.3889 2.4 10.2L13.4 1.95C13.7556 1.68333 14.2444 1.68333 14.6 1.95L25.6 10.2C25.8518 10.3889 26 10.6852 26 11V28C26 28.2761 25.7761 28.5 25.5 28.5H17.5C17.2239 28.5 17 28.2761 17 28V19C17 18.4477 16.5523 18 16 18H12C11.4477 18 11 18.4477 11 19V28C11 28.2761 10.7761 28.5 10.5 28.5H2.5Z" stroke="#B1B1B1" strokeWidth="2.2"/>
              </svg>
            )}
          </DashboardIcon>
          <Text>대시보드</Text>
        </Menu>
        <Menu isActive={activePath === '/archive'} onClick={() => navigateTo('/archive')}>
          <ArchiveIcon>
            {activePath === '/archive' ? (
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="30" viewBox="0 0 24 30" fill="none">
                <path d="M14.6666 1.66663H3.99992C3.29267 1.66663 2.6144 1.94758 2.1143 2.44767C1.6142 2.94777 1.33325 3.62605 1.33325 4.33329V25.6666C1.33325 26.3739 1.6142 27.0521 2.1143 27.5522C2.6144 28.0523 3.29267 28.3333 3.99992 28.3333H19.9999C20.7072 28.3333 21.3854 28.0523 21.8855 27.5522C22.3856 27.0521 22.6666 26.3739 22.6666 25.6666V9.66663L14.6666 1.66663Z" fill="#0F62FE" stroke="#0F62FE" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M14.6665 1.66663V9.66663H22.6665" stroke="white" strokeWidth="2.2" strokeLinecap="square" strokeLinejoin="round"/>
                <path d="M17.3332 16.3333H6.6665" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M17.3332 21.6666H6.6665" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M9.33317 10.9999H7.99984H6.6665" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="30" viewBox="0 0 24 30" fill="none">
                <path d="M14.6666 1.66675H3.99992C3.29267 1.66675 2.6144 1.9477 2.1143 2.4478C1.6142 2.94789 1.33325 3.62617 1.33325 4.33341V25.6667C1.33325 26.374 1.6142 27.0523 2.1143 27.5524C2.6144 28.0525 3.29267 28.3334 3.99992 28.3334H19.9999C20.7072 28.3334 21.3854 28.0525 21.8855 27.5524C22.3856 27.0523 22.6666 26.374 22.6666 25.6667V9.66675L14.6666 1.66675Z" stroke="#B1B1B1" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M14.6665 1.66675V9.66675H22.6665" stroke="#B1B1B1" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M17.3332 16.3334H6.6665" stroke="#B1B1B1" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M17.3332 21.6667H6.6665" stroke="#B1B1B1" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M9.33317 11H7.99984H6.6665" stroke="#B1B1B1" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            )}
          </ArchiveIcon>
          <Text>아카이브</Text>
        </Menu>
        <Menu isActive={activePath === '/flashcard'} onClick={() => navigateTo('/flashcard')}>
          <FlashCardIcon>
            {activePath === '/flashcard' ? (
              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="26" viewBox="0 0 32 26" fill="none">
                <path d="M7.81846 6.2672L7.99227 5.35878L8.6875 1.7251L30.3901 5.65605L27.6092 20.1908L24.8964 19.6994L24.2182 19.5766" stroke="#0F62FE" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
                <rect x="1.60986" y="7.2749" width="22" height="17" stroke="#0F62FE" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
                <rect x="1.60986" y="7.2749" width="22" height="17" fill="#0F62FE"/>
                <line x1="6.70986" y1="14.1749" x2="18.5099" y2="14.1749" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
                <line x1="6.70986" y1="18.1749" x2="14.5099" y2="18.1749" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="26" viewBox="0 0 32 26" fill="none">
                <path d="M7.81846 6.2672L7.99227 5.35878L8.6875 1.7251L30.3901 5.65605L27.6092 20.1908L24.8964 19.6994L24.2182 19.5766" stroke="#B1B1B1" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
                <rect x="1.60986" y="7.2749" width="22" height="17" stroke="#B1B1B1" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
                <line x1="6.70986" y1="14.1749" x2="18.5099" y2="14.1749" stroke="#B1B1B1" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
                <line x1="6.70986" y1="18.1749" x2="14.5099" y2="18.1749" stroke="#B1B1B1" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            )}
          </FlashCardIcon>
          <Text>플래시 카드</Text>
        </Menu>
        <Menu isActive={activePath === '/library'} onClick={() => navigateTo('/library')}>
          <ResourceIcon>
            {activePath === '/library' ? (
              <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 28 28" fill="none">
                <path d="M5.26667 3.48L2.384 13.9427C2.12943 14.8656 2.00027 15.8186 2 16.776V23.3333C2 24.0406 2.28095 24.7189 2.78105 25.219C3.28115 25.719 3.95942 26 4.66667 26H23.3333C24.0406 26 24.7189 25.719 25.219 25.219C25.719 24.7189 26 24.0406 26 23.3333V16.776C25.9997 15.8186 25.8706 14.8656 25.616 13.9427L22.7333 3.48C22.5126 3.03572 22.1722 2.66183 21.7506 2.40037C21.329 2.13892 20.8428 2.00026 20.3467 2H7.65333C7.15722 2.00026 6.67102 2.13892 6.24939 2.40037C5.82777 2.66183 5.48744 3.03572 5.26667 3.48Z" fill="#0F62FE"/>
                <path d="M5.26667 3.48L2.384 13.9427C2.12943 14.8656 2.00027 15.8186 2 16.776V23.3333C2 24.0406 2.28095 24.7189 2.78105 25.219C3.28115 25.719 3.95942 26 4.66667 26H23.3333C24.0406 26 24.7189 25.719 25.219 25.219C25.719 24.7189 26 24.0406 26 23.3333V16.776C25.9997 15.8186 25.8706 14.8656 25.616 13.9427L22.7333 3.48C22.5126 3.03572 22.1722 2.66183 21.7506 2.40037C21.329 2.13892 20.8428 2.00026 20.3467 2H7.65333C7.15722 2.00026 6.67102 2.13892 6.24939 2.40037C5.82777 2.66183 5.48744 3.03572 5.26667 3.48Z" stroke="#0F62FE" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M2.33325 15.3334H7.23992C7.67883 15.3333 8.11098 15.4416 8.49801 15.6486C8.88504 15.8556 9.21499 16.1549 9.45859 16.52L10.5413 18.1467C10.7848 18.5118 11.1148 18.8112 11.5018 19.0182C11.8889 19.2252 12.321 19.3334 12.7599 19.3334H15.2399C15.6788 19.3334 16.111 19.2252 16.498 19.0182C16.885 18.8112 17.215 18.5118 17.4586 18.1467L18.5413 16.52C18.7848 16.1549 19.1148 15.8556 19.5018 15.6486C19.8889 15.4416 20.321 15.3333 20.7599 15.3334H25.6666" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M10 10.6666H18M12 6.66663H16" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 28 28" fill="none">
                <path d="M2.33325 15.3334H7.23992C7.67883 15.3333 8.11098 15.4416 8.49801 15.6486C8.88504 15.8556 9.21499 16.1549 9.45859 16.52L10.5413 18.1467C10.7848 18.5118 11.1148 18.8112 11.5018 19.0182C11.8889 19.2252 12.321 19.3334 12.7599 19.3334H15.2399C15.6788 19.3334 16.111 19.2252 16.498 19.0182C16.885 18.8112 17.215 18.5118 17.4586 18.1467L18.5413 16.52C18.7848 16.1549 19.1148 15.8556 19.5018 15.6486C19.8889 15.4416 20.321 15.3333 20.7599 15.3334H25.6666" stroke="#B1B1B1" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M10 10.6667H18M12 6.66667H16M5.26667 3.48L2.384 13.9427C2.12943 14.8656 2.00027 15.8186 2 16.776V23.3333C2 24.0406 2.28095 24.7189 2.78105 25.219C3.28115 25.719 3.95942 26 4.66667 26H23.3333C24.0406 26 24.7189 25.719 25.219 25.219C25.719 24.7189 26 24.0406 26 23.3333V16.776C25.9997 15.8186 25.8706 14.8656 25.616 13.9427L22.7333 3.48C22.5126 3.03572 22.1722 2.66183 21.7506 2.40037C21.329 2.13892 20.8428 2.00026 20.3467 2H7.65333C7.15722 2.00026 6.67102 2.13892 6.24939 2.40037C5.82777 2.66183 5.48744 3.03572 5.26667 3.48Z" stroke="#B1B1B1" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            )}
          </ResourceIcon>
          <Text>자료실</Text>
        </Menu>
      </MenuContainer>
      <NoteAdd onClick={() => navigateTo('/noteeditor')}>
        <NoteAddIcon>
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path fillRule="evenodd" clipRule="evenodd" d="M0 8.00012C0 7.44784 0.255837 7.00012 0.571429 7.00012L15.4286 7.00012C15.7442 7.00012 16 7.44784 16 8.00012C16 8.55241 15.7442 9.00012 15.4286 9.00012L0.571429 9.00012C0.255837 9.00012 0 8.55241 0 8.00012Z" fill="white"/>
            <path fillRule="evenodd" clipRule="evenodd" d="M8 -0.000366255C8.55228 -0.000366231 9 0.255471 9 0.571062L9 15.4282C9 15.7438 8.55228 15.9996 8 15.9996C7.44772 15.9996 7 15.7438 7 15.4282L7 0.571062C7 0.255471 7.44772 -0.000366279 8 -0.000366255Z" fill="white"/>
          </svg>
        </NoteAddIcon>
        <NoteAddText>노트 추가</NoteAddText>
      </NoteAdd>
    </MenuBarContainer>
  );
};

export default MenuBar;
