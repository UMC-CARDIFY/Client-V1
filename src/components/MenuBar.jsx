import { useState } from 'react';
import styled from 'styled-components';
import { useNavigate, useLocation } from 'react-router-dom';
import MainLogo from '../assets/logo.svg';

const MenuBarContainer = styled.div`
  width: 15.5rem;
  height: 100%; 
  flex-shrink: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  background: var(--Grays-White, #FFF);
  box-shadow: 4px 0px 26px 0px rgba(0, 0, 0, 0.02), 4px 0px 60px 0px rgba(0, 74, 162, 0.02);

  @media (min-width: 1440px) and (max-width: 1680px) {
    width: 14rem;
}

  @media(min-width: 1200px) and (max-width: 1440px) {
    width: 7rem;
  }

  @media(max-width: 1200px)  {
    width: 7rem;
  }
`;

const Logo = styled.img`
  margin-top: 4.5rem;

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
      <Logo src={MainLogo} alt='logo'/>
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
      <NoteAdd onClick={() => navigateTo('/note-editor')}>
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
