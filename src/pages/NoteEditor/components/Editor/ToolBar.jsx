import { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import MoreOptions from './MoreOptions';
import ColorPalette from './Toolbar/ColorPalette';
import PropTypes from 'prop-types';

const ToolBarContainer = styled.div`
  width: auto;
  display: inline-flex;
  padding: 0.5rem 1rem;
  justify-content: center;
  align-items: center;
  gap: 0.75rem;
  border-radius: 0.625rem;
  border: 1px solid var(--Grays-Gray8, #F4F4F4);
  background: var(--Grays-White, #FFF);
  box-shadow: 0px 4px 16px 0px rgba(0, 0, 0, 0.02), 0px 10px 24px 0px rgba(0, 74, 162, 0.03);
  position: fixed;
  bottom: 1.5rem;
`;

const ToolBarItem = styled.div`
  display: flex;
  width: 2rem;
  height: 2rem;
  padding: var(--UI-Component-xxxxxS, 0.25rem) var(--UI-Component-None, 0rem);
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
`;

const DropDownButton = styled.div`
  width: 0.75rem;
  height: 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  border-radius: 0.375rem;
  background-color: ${({ isActive }) =>
    isActive ? 'var(--Main-BackGround, #F2F4F8)' : 'transparent'};

  &:hover {
    background-color: ${({ isActive }) =>
      isActive ? 'var(--Main-BackGround, #F2F4F8)' : 'var(--Grays-Gray7, #F0F0F0)'};

    svg {
      rect {
        fill: ${({ isActive }) => (isActive ? '#F2F4F8' : '#F0F0F0')};
      }
      path {
        stroke: ${({ isActive }) => (isActive ? '#0F62FE' : '#B1B1B1')};
      }
    }
  }

  svg {
    rect {
      fill: ${({ isActive }) => (isActive ? '#F2F4F8' : 'transparent')};
    }
    path {
      stroke: ${({ isActive }) => (isActive ? '#0F62FE' : '#CACACA')};
    }
  }
`;

const DropDownMenu = styled.div`
  position: absolute;
  margin-top: -13.5rem;
  left: 39%;
  transform: translateX(-50%);
  z-index: 10;
  border-radius: 0.375rem;
  display: flex;  
  flex-direction: column;

  display: flex;
  width: 8.5rem;
  padding: var(--UI-Component-None, 0.5rem) var(--UI-Component-None, 0.4375rem);
  justify-content: center;
  align-items: flex-start;
  gap: var(--UI-Component-None, 0.25rem);
  border-radius: 0.25rem;
  background: var(--Grays-White, #FFF);

  /* default */
  box-shadow: 0px 4px 26px 0px rgba(0, 0, 0, 0.02), 0px 10px 60px 0px rgba(0, 74, 162, 0.03);
`;

const DropDownItem = styled.div`
  display: flex;
  padding: var(--UI-Component-None, 0rem) 0.5rem;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
  border-radius: 0.25rem; /* 프레임 모서리 둥글게 */
  
  &:hover {
    background: var(--Grays-Gray7, #F0F0F0); /* 호버 시 배경색 변경 */
  }
`;


const IconWrapper = styled.div`
  display: flex;
  width: 2rem;
  height: 2rem;
  padding: var(--UI-Component-xxxxxS, 0.25rem) var(--UI-Component-None, 0rem);
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
`;

const Text = styled.span`
  color: var(--Grays-Black, #1A1A1A);
  font-family: Pretendard;
  font-size: 0.875rem;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
`;

const Divider = styled.div`
  width: 0.0625rem;
  height: 2rem;
  background: #E8E8E8;
`;

const ColorPaletteItem = styled.div`
  display: flex;
  height: 2rem;
  padding: var(--UI-Component-xxxxxS, 0.25rem) var(--UI-Component-None, 0rem) var(--UI-Component-xxxxxS, 0.25rem) 0.375rem;
  justify-content: center;
  align-items: center;
  gap: 0.375rem;
  cursor: pointer;
`;

const ToolBar = ({ addCard, addHeading1, toggleBold, onSelectColor }) => {
  const [showMoreOptions, setShowMoreOptions] = useState(false);
  const [showPalette, setShowPalette] = useState(false);
  const [isDropDownOpen, setIsDropDownOpen] = useState(false);
  const moreOptionsRef = useRef(null);

  const toggleMoreOptions = () => {
    setShowMoreOptions(!showMoreOptions);
  };

  const toggleColorPalette = () => {
    setShowPalette(!showPalette);
  };

  const toggleDropDown = () => {
    setIsDropDownOpen(!isDropDownOpen);
  };

  const handleClickOutside = (event) => {
    if (moreOptionsRef.current && !moreOptionsRef.current.contains(event.target)) {
      setShowMoreOptions(false);
      setIsDropDownOpen(false); // 클릭 외부 시 드롭다운을 닫고 버튼 스타일 초기화
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);



  return (
    <>
      <ToolBarContainer>
      <ToolBarItem onClick={() => addCard('word')}>
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="16" viewBox="0 0 20 16" fill="none">
          <path fillRule="evenodd" clipRule="evenodd" d="M0.21875 4.2251C0.21875 3.94896 0.442608 3.7251 0.71875 3.7251H15.7597C16.0358 3.7251 16.2597 3.94896 16.2597 4.2251V15.2551C16.2597 15.5312 16.0358 15.7551 15.7597 15.7551H0.71875C0.442608 15.7551 0.21875 15.5312 0.21875 15.2551V4.2251ZM1.21875 4.7251V14.7551H15.2597V4.7251H1.21875Z" fill="#1A1A1A"/>
          <path fillRule="evenodd" clipRule="evenodd" d="M0.71875 4.22559H15.7597V15.2556H0.71875V4.22559ZM3.5 8.5C3.5 8.22386 3.72386 8 4 8H12.5159C12.7921 8 13.0159 8.22386 13.0159 8.5C13.0159 8.77614 12.7921 9 12.5159 9H4C3.72386 9 3.5 8.77614 3.5 8.5ZM4 11.1933C3.72386 11.1933 3.5 11.4172 3.5 11.6933C3.5 11.9695 3.72386 12.1933 4 12.1933H9.32245C9.5986 12.1933 9.82245 11.9695 9.82245 11.6933C9.82245 11.4172 9.5986 11.1933 9.32245 11.1933H4Z" fill="#1A1A1A"/>
          <path fillRule="evenodd" clipRule="evenodd" d="M3.08001 0.247897C2.80538 0.219032 2.55935 0.418264 2.53048 0.692893L2.15918 4.22563H3.16469L3.47274 1.29468L18.7326 2.89856L17.6839 12.8763L15.7601 12.6741V13.6796L18.0766 13.9231C18.3512 13.952 18.5973 13.7527 18.6261 13.4781L19.7794 2.50582C19.8082 2.23119 19.609 1.98516 19.3344 1.9563L3.08001 0.247897Z" fill="#1A1A1A"/>
        </svg>
        </ToolBarItem>
        <ToolBarItem onClick={() => addCard('blank')}>
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="16" viewBox="0 0 20 16" fill="none">
            <mask id="path-1-inside-1_2534_6003" fill="white">
              <rect x="10" y="0.5" width="10" height="15" rx="0.625"/>
            </mask>
            <rect x="10" y="0.5" width="10" height="15" rx="0.625" stroke="#1A1A1A" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" mask="url(#path-1-inside-1_2534_6003)"/>
            <path d="M11.875 5.37793H11.25V6.62793H11.875V5.37793ZM15.9476 6.62793C16.2928 6.62793 16.5726 6.34811 16.5726 6.00293C16.5726 5.65775 16.2928 5.37793 15.9476 5.37793V6.62793ZM11.875 6.62793H15.9476V5.37793H11.875V6.62793Z" fill="#1A1A1A"/>
            <path d="M11.875 9.37012H11.25V10.6201H11.875V9.37012ZM14.4204 10.6201C14.7656 10.6201 15.0454 10.3403 15.0454 9.99512C15.0454 9.64994 14.7656 9.37012 14.4204 9.37012V10.6201ZM11.875 10.6201H14.4204V9.37012H11.875V10.6201Z" fill="#1A1A1A"/>
            <path fillRule="evenodd" clipRule="evenodd" d="M0 1.125C0 0.779822 0.279822 0.5 0.625 0.5H10.625C10.9702 0.5 11.25 0.779822 11.25 1.125V14.875C11.25 15.2202 10.9702 15.5 10.625 15.5H0.625C0.279822 15.5 0 15.2202 0 14.875V1.125ZM5.09115 9.7589H6.30642V11.0349H5.09115V9.7589ZM4.72873 6.82335C4.72873 6.35683 5.12005 5.80252 5.70095 5.80252C6.28623 5.80252 6.67318 6.33845 6.67318 6.82335C6.67318 7.08009 6.54776 7.198 6.14332 7.50884L6.14186 7.50986L6.14174 7.50995C5.7791 7.78813 5.21484 8.22097 5.21484 9.12022H6.18707C6.18707 8.77467 6.34991 8.6144 6.71693 8.33265L6.77332 8.28978C7.10679 8.03712 7.6454 7.62879 7.6454 6.82335C7.6454 5.875 6.91429 4.78168 5.70095 4.78168C4.48373 4.78168 3.75651 5.90358 3.75651 6.82335H4.72873Z" fill="#1A1A1A"/>
          </svg>
        </ToolBarItem>
        <ToolBarItem onClick={() => addCard('multi')}>
          <svg xmlns="http://www.w3.org/2000/svg" width="22" height="18" viewBox="0 0 22 18" fill="none">
            <path fillRule="evenodd" clipRule="evenodd" d="M0.449219 6.16943C0.449219 5.89329 0.673076 5.66943 0.949219 5.66943H15.9601C16.2363 5.66943 16.4601 5.89329 16.4601 6.16943V16.9108C16.4601 17.1869 16.2363 17.4108 15.9601 17.4108H0.949218C0.673076 17.4108 0.449219 17.1869 0.449219 16.9108V6.16943ZM3.69727 9.94287C3.69727 9.66673 3.92112 9.44287 4.19727 9.44287H12.7132C12.9893 9.44287 13.2132 9.66673 13.2132 9.94287C13.2132 10.219 12.9893 10.4429 12.7132 10.4429H4.19727C3.92112 10.4429 3.69727 10.219 3.69727 9.94287ZM4.19727 12.6362C3.92112 12.6362 3.69727 12.86 3.69727 13.1362C3.69727 13.4123 3.92112 13.6362 4.19727 13.6362H9.51972C9.79586 13.6362 10.0197 13.4123 10.0197 13.1362C10.0197 12.86 9.79586 12.6362 9.51972 12.6362H4.19727Z" fill="#1A1A1A"/>
            <path fillRule="evenodd" clipRule="evenodd" d="M3.8129 5.66935L3.89559 4.09141L17.8873 4.82469L17.3775 14.5527L16.4602 14.5046V15.506L17.8245 15.5775C18.1002 15.5919 18.3355 15.3801 18.3499 15.1043L18.9121 4.37771C18.9265 4.10194 18.7147 3.86668 18.439 3.85223L3.44861 3.06662C3.17285 3.05216 2.93758 3.264 2.92313 3.53976L2.81152 5.66935H3.8129Z" fill="#1A1A1A"/>
            <path fillRule="evenodd" clipRule="evenodd" d="M6.40039 3.22621L6.56717 1.63941L20.5013 3.10395L19.4831 12.7919L18.4647 12.6849L18.4123 13.6849L19.8758 13.8387C20.1504 13.8676 20.3965 13.6683 20.4253 13.3937L21.5481 2.71122C21.577 2.43659 21.3777 2.19056 21.1031 2.16169L6.17444 0.592623C5.89981 0.563759 5.65378 0.76299 5.62491 1.03762L5.40039 3.1738L6.40039 3.22621Z" fill="#1A1A1A"/>
          </svg>
        </ToolBarItem>
        <ToolBarItem onClick={() => addCard('image')}>
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="16" viewBox="0 0 20 16" fill="none">
            <mask id="path-1-inside-1_2534_31742" fill="white">
              <rect y="0.666504" width="20.0008" height="14.6673" rx="0.624599"/>
            </mask>
            <rect y="0.666504" width="20.0008" height="14.6673" rx="0.624599" stroke="#1A1A1A" strokeWidth="2.4984" strokeLinecap="round" strokeLinejoin="round" mask="url(#path-1-inside-1_2534_31742)"/>
            <path fillRule="evenodd" clipRule="evenodd" d="M1.2492 1.9157V14.0846H18.7516V1.9157H1.2492ZM0.624599 0.666504C0.279643 0.666504 0 0.946147 0 1.2911L0 14.7092C0 15.0541 0.279643 15.3338 0.6246 15.3338H19.3762C19.7212 15.3338 20.0008 15.0541 20.0008 14.7092V1.2911C20.0008 0.946147 19.7212 0.666504 19.3762 0.666504H0.624599Z" fill="#1A1A1A"/>
            <path d="M5.6218 10.0353L0.625 14.4075H19.363V5.66309L9.36939 13.1583L5.6218 10.0353Z" fill="#1A1A1A"/>
            <path d="M2.49805 4.16504C2.49805 3.61275 2.94576 3.16504 3.49805 3.16504H11.498C12.0503 3.16504 12.498 3.61275 12.498 4.16504V7.16504C12.498 7.71732 12.0503 8.16504 11.498 8.16504H3.49805C2.94576 8.16504 2.49805 7.71732 2.49805 7.16504V4.16504Z" fill="#646464"/>
            <path fillRule="evenodd" clipRule="evenodd" d="M2.49805 5.28308V7.05079L6.3838 3.16504H4.61609L2.49805 5.28308ZM3.55543 3.16504L2.49805 4.22242V4.16504C2.49805 3.61275 2.94576 3.16504 3.49805 3.16504H3.55543ZM7.44446 3.16504L2.76465 7.84485C2.94729 8.04179 3.20827 8.16504 3.49805 8.16504H4.21188L9.21188 3.16504H7.44446ZM10.2725 3.16504L5.27254 8.16504H7.04L11.9382 3.26686C11.8054 3.20165 11.656 3.16504 11.498 3.16504H10.2725ZM12.4393 3.82644L8.10066 8.16504H9.86813L12.498 5.53512V4.16504C12.498 4.04619 12.4773 3.93218 12.4393 3.82644ZM12.498 6.59578L10.9288 8.16504H11.498C12.0503 8.16504 12.498 7.71732 12.498 7.16504V6.59578Z" fill="#1A1A1A"/>
          </svg>
        </ToolBarItem>
        <Divider />
        <ToolBarItem onClick={addHeading1}>
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="14" viewBox="0 0 18 14" fill="none">
          <path d="M17.7275 0.636719V13.3633H15.7764V2.57031H15.7061L12.665 4.55664V2.71094L15.8291 0.636719H17.7275Z" fill="#1A1A1A"/>
          <path d="M0.272461 13.3633V0.636719H2.20605V6.15625H8.53418V0.636719H10.4678V13.3633H8.53418V7.80859H2.20605V13.3633H0.272461Z" fill="#1A1A1A"/>
        </svg>
      </ToolBarItem>
      <DropDownButton onClick={toggleDropDown} isActive={isDropDownOpen}>
          <svg xmlns="http://www.w3.org/2000/svg" width="12" height="32" viewBox="0 0 12 32" fill="none">
            <rect width="12" height="32" rx="4" fill={isDropDownOpen ? "#F2F4F8" : "transparent"}/>
            <path d="M2.79492 17.5L5.79492 14.5L8.79492 17.5" stroke={isDropDownOpen ? "#0F62FE" : "#CACACA"} strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </DropDownButton>
        {isDropDownOpen && (
          <DropDownMenu>
            <DropDownItem>
              <IconWrapper>
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="14" viewBox="0 0 18 14" fill="none">
                  <path d="M17.7285 0.636719V13.3633H15.7773V2.57031H15.707L12.666 4.55664V2.71094L15.8301 0.636719H17.7285Z" fill="#1A1A1A"/>
                  <path d="M0.273438 13.3633V0.636719H2.20703V6.15625H8.53516V0.636719H10.4688V13.3633H8.53516V7.80859H2.20703V13.3633H0.273438Z" fill="#1A1A1A"/>
                </svg>
              </IconWrapper>
              <Text>Heading 1</Text>
            </DropDownItem>
            <DropDownItem>
              <IconWrapper>
                <svg xmlns="http://www.w3.org/2000/svg" width="22" height="14" viewBox="0 0 22 14" fill="none">
                  <path d="M13.004 13.3648V11.9773L17.3572 7.58944C18.7273 6.14994 19.4211 5.35215 19.4211 4.25952C19.4211 3.02814 18.4151 2.23035 17.0971 2.23035C15.7096 2.23035 14.8077 3.11486 14.8077 4.4503H13.004C12.9867 2.16098 14.7384 0.634766 17.1317 0.634766C19.5598 0.634766 21.2248 2.16098 21.2421 4.20749C21.2248 5.6123 20.5657 6.72227 18.207 9.04627L15.6576 11.6304V11.7345H21.4502V13.3648H13.004Z" fill="#1A1A1A"/>
                  <path d="M0.550781 13.3642V0.807617H2.45855V6.25342H8.70214V0.807617H10.6099V13.3642H8.70214V7.88369H2.45855V13.3642H0.550781Z" fill="#1A1A1A"/>
                </svg>
              </IconWrapper>
              <Text>Heading 2</Text>
            </DropDownItem>
            <DropDownItem>
              <IconWrapper>
                <svg xmlns="http://www.w3.org/2000/svg" width="22" height="14" viewBox="0 0 22 14" fill="none">
                  <path d="M17.1083 13.3648C14.5418 13.3648 12.711 11.9788 12.6426 9.95983H14.5589C14.6274 11.0549 15.7053 11.7393 17.0912 11.7393C18.5798 11.7393 19.6749 10.918 19.6749 9.72029C19.6749 8.50546 18.6483 7.61573 16.8859 7.61573H15.8251V6.07581H16.8859C18.2889 6.07581 19.2813 5.28874 19.2813 4.10814C19.2813 2.97887 18.4429 2.20891 17.1255 2.20891C15.8764 2.20891 14.7814 2.89331 14.73 4.02259H12.9163C12.9677 2.00358 14.8327 0.634766 17.1426 0.634766C19.5722 0.634766 21.1121 2.17469 21.095 4.00548C21.1121 5.40852 20.2395 6.43513 18.9049 6.76022V6.84577C20.5988 7.08532 21.5741 8.21459 21.5741 9.78873C21.5741 11.8591 19.6749 13.3648 17.1083 13.3648Z" fill="#1A1A1A"/>
                  <path d="M0.425781 13.1935V0.805664H2.30791V6.17827H8.46758V0.805664H10.3497V13.1935H8.46758V7.78663H2.30791V13.1935H0.425781Z" fill="#1A1A1A"/>
                </svg>
              </IconWrapper>
              <Text>Heading 3</Text>
            </DropDownItem>
          </DropDownMenu>
        )}




        <ToolBarItem onClick={toggleBold}>
          <svg xmlns="http://www.w3.org/2000/svg" width="10" height="14" viewBox="0 0 10 14" fill="none">
            <path d="M0.104492 13.3633V0.636719H5.16699C7.97949 0.636719 9.38574 1.99023 9.38574 3.90625C9.38574 5.40039 8.41895 6.33203 7.10059 6.63086V6.75391C8.54199 6.82422 9.89551 7.9668 9.89551 9.84766C9.89551 11.8691 8.38379 13.3633 5.50098 13.3633H0.104492ZM4.97363 11.1836C6.50293 11.1836 7.15332 10.5508 7.15332 9.60156C7.15332 8.5293 6.34473 7.77344 5.04395 7.77344H2.74121V11.1836H4.97363ZM4.78027 5.96289C5.8877 5.96289 6.71387 5.34766 6.71387 4.32812C6.71387 3.41406 6.0459 2.78125 4.83301 2.78125H2.74121V5.96289H4.78027Z" fill="#1A1A1A"/>
          </svg>
        </ToolBarItem>

        <Divider />
        <ColorPaletteItem onClick={toggleColorPalette}>
          <svg xmlns="http://www.w3.org/2000/svg" width="25" height="14" viewBox="0 0 25 14" fill="none">
            <path d="M7.44336 13.3633H5L9.48242 0.636719H12.2949L16.7949 13.3633H14.3516L13.2969 10.2168H8.49805L7.44336 13.3633ZM9.11328 8.37109H12.6816L10.9414 3.23828H10.8359L9.11328 8.37109Z" fill="#1A1A1A"/>
            <rect x="18.7949" y="9.36328" width="4" height="4" rx="1" fill="#1A1A1A"/>
          </svg>
        </ColorPaletteItem>
        {showPalette && <ColorPalette onSelectColor={onSelectColor} />}
        <ColorPaletteItem>
          <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" fill="none">
            <path d="M12.3906 22.5H10.334L14.9043 9.77344H17.1367L21.7246 22.5H19.668L18.5078 19.1426H13.5508L12.3906 22.5ZM14.1133 17.5254H17.9453L16.0645 12.0938H15.9766L14.1133 17.5254Z" fill="#1A1A1A"/>
            <rect x="4" y="6.5" width="24" height="19" rx="1.5" stroke="#CACACA"/>
          </svg>
        </ColorPaletteItem>

        <Divider />
        <ToolBarItem onMouseDown={(e) => e.preventDefault()} onClick={toggleMoreOptions}>
          <svg xmlns="http://www.w3.org/2000/svg" width="29" height="28" viewBox="0 0 29 28" fill="none">
            <path fillRule="evenodd" clipRule="evenodd" d="M20.1217 12.7747C20.4466 12.7747 20.7582 12.9037 20.9879 13.1335C21.2176 13.3632 21.3467 13.6748 21.3467 13.9997L21.3467 14.0078C21.3467 14.3327 21.2176 14.6443 20.9879 14.874C20.7582 15.1038 20.4466 15.2328 20.1217 15.2328L20.1135 15.2328C19.7886 15.2328 19.477 15.1038 19.2473 14.874C19.0176 14.6443 18.8885 14.3327 18.8885 14.0078L18.8885 13.9997C18.8885 13.6748 19.0176 13.3632 19.2473 13.1335C19.477 12.9037 19.7886 12.7747 20.1135 12.7747L20.1217 12.7747ZM14.405 12.7747C14.7299 12.7747 15.0415 12.9037 15.2712 13.1335C15.501 13.3632 15.63 13.6748 15.63 13.9997L15.63 14.0078C15.63 14.3327 15.501 14.6443 15.2712 14.874C15.0415 15.1038 14.7299 15.2328 14.405 15.2328L14.3968 15.2328C14.072 15.2328 13.7604 15.1038 13.5306 14.874C13.3009 14.6443 13.1718 14.3327 13.1718 14.0078L13.1718 13.9997C13.1718 13.6748 13.3009 13.3632 13.5306 13.1335C13.7604 12.9037 14.072 12.7747 14.3968 12.7747L14.405 12.7747ZM9.91334 13.9997C9.91334 13.6748 9.78428 13.3632 9.55455 13.1335C9.32482 12.9037 9.01324 12.7747 8.68834 12.7747L8.68018 12.7747C8.35529 12.7747 8.0437 12.9037 7.81397 13.1335C7.58424 13.3632 7.45518 13.6748 7.45518 13.9997L7.45518 14.0078C7.45518 14.3327 7.58424 14.6443 7.81397 14.874C8.0437 15.1038 8.35529 15.2328 8.68018 15.2328L8.68834 15.2328C9.01323 15.2328 9.32482 15.1038 9.55455 14.874C9.78428 14.6443 9.91334 14.3327 9.91334 14.0078L9.91334 13.9997Z" fill="#646464" />
          </svg>
        </ToolBarItem>
      </ToolBarContainer>
      {showMoreOptions && <MoreOptions ref={moreOptionsRef} />}
    </>
  );
};

ToolBar.propTypes = {
  addCard: PropTypes.func.isRequired,
  addHeading1: PropTypes.func.isRequired,
  toggleBold: PropTypes.func.isRequired,
  onSelectColor: PropTypes.func.isRequired,
};

export default ToolBar;
