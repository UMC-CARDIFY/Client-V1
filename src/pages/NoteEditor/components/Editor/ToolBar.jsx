import { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import MoreOptions from './MoreOptions'; // MoreOptions 컴포넌트 임포트
import ColorPalette from './Toolbar/ColorPalette'; // ColorPalette 컴포넌트 임포트
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

// eslint-disable-next-line react/prop-types
const ToolBar = ({ addCard, addHeading1, toggleBold, onSelectColor }) => {
  const [showMoreOptions, setShowMoreOptions] = useState(false);
  const [showPalette, setShowPalette] = useState(false);
  const moreOptionsRef = useRef(null);

  const toggleMoreOptions = () => {
    setShowMoreOptions(!showMoreOptions);
  };

  const toggleColorPalette = () => {
    setShowPalette(!showPalette);
  };

  const handleClickOutside = (event) => {
    if (moreOptionsRef.current && !moreOptionsRef.current.contains(event.target)) {
      setShowMoreOptions(false);
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
        <ToolBarItem onClick={() => addCard('word')}><svg xmlns="http://www.w3.org/2000/svg" width="21" height="16" viewBox="0 0 21 16" fill="none">
  <rect x="3.62988" y="0.745117" width="16.3439" height="11.0327" transform="rotate(6 3.62988 0.745117)" stroke="#646464" strokeLinecap="round" strokeLinejoin="round"/>
  <rect x="1.32129" y="4.22534" width="15.0409" height="11.03" fill="#646464" stroke="#646464" strokeLinecap="round" strokeLinejoin="round"/>
</svg></ToolBarItem>
        <ToolBarItem onClick={() => addCard('blank')}><svg xmlns="http://www.w3.org/2000/svg" width="21" height="16" viewBox="0 0 21 16" fill="none">
  <rect x="3.62988" y="0.744873" width="16.3439" height="11.0327" transform="rotate(6 3.62988 0.744873)" stroke="#646464" strokeLinecap="round" strokeLinejoin="round"/>
  <rect x="1.32129" y="4.2251" width="15.0409" height="11.03" fill="#646464" stroke="#646464" strokeLinecap="round" strokeLinejoin="round"/>
</svg></ToolBarItem>
        <ToolBarItem onClick={() => addCard('multi')}><svg xmlns="http://www.w3.org/2000/svg" width="22" height="18" viewBox="0 0 22 18" fill="none">
  <mask id="path-1-inside-1_2037_6179" fill="white">
    <rect x="5.25488" y="0.564941" width="16.0109" height="11.7413" rx="0.5" transform="rotate(6 5.25488 0.564941)"/>
  </mask>
  <rect x="5.25488" y="0.564941" width="16.0109" height="11.7413" rx="0.5" transform="rotate(6 5.25488 0.564941)" stroke="#646464" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" mask="url(#path-1-inside-1_2037_6179)"/>
  <mask id="path-2-inside-2_2037_6179" fill="white">
    <rect x="2.52734" y="3.06494" width="16.0109" height="11.7413" rx="0.5" transform="rotate(3 2.52734 3.06494)"/>
  </mask>
  <rect x="2.52734" y="3.06494" width="16.0109" height="11.7413" rx="0.5" transform="rotate(3 2.52734 3.06494)" fill="white" stroke="#646464" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" mask="url(#path-2-inside-2_2037_6179)"/>
  <rect x="0.0273438" y="5.69385" width="16.0109" height="11.7413" rx="0.5" fill="#646464"/>
  <path d="M3.77539 9.96729H12.2913" stroke="white" strokeLinecap="round"/>
  <path d="M3.77539 13.1606H9.09784" stroke="white" strokeLinecap="round"/>
</svg>
</ToolBarItem>
        <ToolBarItem onClick={() => addCard('image')}><svg width="21" height="16" viewBox="0 0 21 16" fill="none" xmlns="http://www.w3.org/2000/svg">
<mask id="path-1-inside-1_2037_6188" fill="white">
<rect x="0.602539" y="0.66626" width="20.0008" height="14.6673" rx="0.624599"/>
</mask>
<rect x="0.602539" y="0.66626" width="20.0008" height="14.6673" rx="0.624599" fill="white" stroke="#646464" strokeWidth="2.4984" strokeLinecap="round" strokeLinejoin="round" mask="url(#path-1-inside-1_2037_6188)"/>
<circle cx="6.22438" cy="6.28762" r="1.8738" fill="#646464"/>
<mask id="path-3-inside-2_2037_6188" fill="white">
<rect x="0.602539" y="0.66626" width="20.0008" height="14.6673" rx="0.624599"/>
</mask>
<rect x="0.602539" y="0.66626" width="20.0008" height="14.6673" rx="0.624599" fill="white" stroke="#646464" strokeWidth="2.4984" strokeLinecap="round" strokeLinejoin="round" mask="url(#path-3-inside-2_2037_6188)"/>
<g clipPath="url(#clip0_2037_6188)" filter="url(#filter0_b_2037_6188)">
<rect x="3.10156" y="3.16504" width="2.4984" height="2.4984" fill="#CACACA"/>
<rect x="3.10156" y="5.66333" width="2.4984" height="2.4984" fill="#EDEDED"/>
<rect x="5.59961" y="5.66333" width="2.4984" height="2.4984" fill="#CACACA"/>
<rect x="8.09766" y="5.66333" width="2.4984" height="2.4984" fill="#DBDBDB"/>
<rect x="10.5967" y="5.66333" width="2.4984" height="2.4984" fill="#E8E8E8"/>
<rect x="5.59961" y="3.16479" width="2.4984" height="2.4984" fill="#B1B1B1"/>
<rect x="8.09766" y="3.16479" width="2.4984" height="2.4984" fill="#CACACA"/>
<rect x="10.5967" y="3.16479" width="2.4984" height="2.4984" fill="#EDEDED"/>
</g>
<path d="M6.22433 10.0353L1.22754 14.4075H19.9655V5.66309L9.97193 13.1583L6.22433 10.0353Z" fill="#646464"/>
<defs>
<filter id="filter0_b_2037_6188" x="-6.89203" y="-6.82904" width="29.9803" height="24.984" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
<feFlood floodOpacity="0" result="BackgroundImageFix"/>
<feGaussianBlur in="BackgroundImageFix" stdDeviation="4.9968"/>
<feComposite in2="SourceAlpha" operator="in" result="effect1_backgroundBlur_2037_6188"/>
<feBlend mode="normal" in="SourceGraphic" in2="effect1_backgroundBlur_2037_6188" result="shape"/>
</filter>
<clipPath id="clip0_2037_6188">
<rect width="9.99359" height="4.9968" fill="white" transform="translate(3.10156 3.16455)"/>
</clipPath>
</defs>
</svg>
</ToolBarItem>
        <Divider />
        <ToolBarItem onClick={addHeading1}><svg xmlns="http://www.w3.org/2000/svg" width="19" height="14" viewBox="0 0 19 14" fill="none">
  <path d="M18.3301 0.636719V13.3633H16.3789V2.57031H16.3086L13.2676 4.55664V2.71094L16.4316 0.636719H18.3301Z" fill="#646464"/>
  <path d="M0.875 13.3633V0.636719H2.80859V6.15625H9.13672V0.636719H11.0703V13.3633H9.13672V7.80859H2.80859V13.3633H0.875Z" fill="#646464"/>
</svg></ToolBarItem>
        <ToolBarItem onClick={toggleBold}><svg xmlns="http://www.w3.org/2000/svg" width="11" height="14" viewBox="0 0 11 14" fill="none">
  <path d="M0.707031 13.3633V0.636719H5.76953C8.58203 0.636719 9.98828 1.99023 9.98828 3.90625C9.98828 5.40039 9.02148 6.33203 7.70312 6.63086V6.75391C9.14453 6.82422 10.498 7.9668 10.498 9.84766C10.498 11.8691 8.98633 13.3633 6.10352 13.3633H0.707031ZM5.57617 11.1836C7.10547 11.1836 7.75586 10.5508 7.75586 9.60156C7.75586 8.5293 6.94727 7.77344 5.64648 7.77344H3.34375V11.1836H5.57617ZM5.38281 5.96289C6.49023 5.96289 7.31641 5.34766 7.31641 4.32812C7.31641 3.41406 6.64844 2.78125 5.43555 2.78125H3.34375V5.96289H5.38281Z" fill="#646464"/>
</svg></ToolBarItem>
        <Divider />
        <ColorPaletteItem onClick={toggleColorPalette}><svg xmlns="http://www.w3.org/2000/svg" width="13" height="14" viewBox="0 0 13 14" fill="none">
  <path d="M3.0459 13.3633H0.602539L5.08496 0.636719H7.89746L12.3975 13.3633H9.9541L8.89941 10.2168H4.10059L3.0459 13.3633ZM4.71582 8.37109H8.28418L6.54395 3.23828H6.43848L4.71582 8.37109Z" fill="#6698F5"/>
</svg><svg xmlns="http://www.w3.org/2000/svg" width="19" height="32" viewBox="0 0 19 32" fill="none">
  <path d="M6.39746 17.5L9.39746 14.5L12.3975 17.5" stroke="#CACACA" strokeLinecap="round" strokeLinejoin="round"/>
</svg></ColorPaletteItem>
        {showPalette && <ColorPalette onSelectColor={onSelectColor} />}
        <ColorPaletteItem><svg xmlns="http://www.w3.org/2000/svg" width="26" height="22" viewBox="0 0 26 22" fill="none">
  <rect x="0.397461" y="0.5" width="25" height="21" rx="2" fill="#FFFB9D"/>
  <path d="M8.78809 17.5H6.73145L11.3018 4.77344H13.5342L18.1221 17.5H16.0654L14.9053 14.1426H9.94824L8.78809 17.5ZM10.5107 12.5254H14.3428L12.4619 7.09375H12.374L10.5107 12.5254Z" fill="#646464"/>
</svg><svg xmlns="http://www.w3.org/2000/svg" width="13" height="32" viewBox="0 0 13 32" fill="none">
  <path d="M3.39746 17.5L6.39746 14.5L9.39746 17.5" stroke="#CACACA" strokeLinecap="round" strokeLinejoin="round"/>
</svg></ColorPaletteItem>
        <Divider />
        <ToolBarItem onMouseDown={(e) => e.preventDefault()} onClick={toggleMoreOptions}><svg xmlns="http://www.w3.org/2000/svg" width="29" height="28" viewBox="0 0 29 28" fill="none">
  <path fillRule="evenodd" clipRule="evenodd" d="M20.1217 12.7747C20.4466 12.7747 20.7582 12.9037 20.9879 13.1335C21.2176 13.3632 21.3467 13.6748 21.3467 13.9997L21.3467 14.0078C21.3467 14.3327 21.2176 14.6443 20.9879 14.874C20.7582 15.1038 20.4466 15.2328 20.1217 15.2328L20.1135 15.2328C19.7886 15.2328 19.477 15.1038 19.2473 14.874C19.0176 14.6443 18.8885 14.3327 18.8885 14.0078L18.8885 13.9997C18.8885 13.6748 19.0176 13.3632 19.2473 13.1335C19.477 12.9037 19.7886 12.7747 20.1135 12.7747L20.1217 12.7747ZM14.405 12.7747C14.7299 12.7747 15.0415 12.9037 15.2712 13.1335C15.501 13.3632 15.63 13.6748 15.63 13.9997L15.63 14.0078C15.63 14.3327 15.501 14.6443 15.2712 14.874C15.0415 15.1038 14.7299 15.2328 14.405 15.2328L14.3968 15.2328C14.072 15.2328 13.7604 15.1038 13.5306 14.874C13.3009 14.6443 13.1718 14.3327 13.1718 14.0078L13.1718 13.9997C13.1718 13.6748 13.3009 13.3632 13.5306 13.1335C13.7604 12.9037 14.072 12.7747 14.3968 12.7747L14.405 12.7747ZM9.91334 13.9997C9.91334 13.6748 9.78428 13.3632 9.55455 13.1335C9.32482 12.9037 9.01324 12.7747 8.68834 12.7747L8.68018 12.7747C8.35529 12.7747 8.0437 12.9037 7.81397 13.1335C7.58424 13.3632 7.45518 13.6748 7.45518 13.9997L7.45518 14.0078C7.45518 14.3327 7.58424 14.6443 7.81397 14.874C8.0437 15.1038 8.35529 15.2328 8.68018 15.2328L8.68834 15.2328C9.01323 15.2328 9.32482 15.1038 9.55455 14.874C9.78428 14.6443 9.91334 14.3327 9.91334 14.0078L9.91334 13.9997Z" fill="#646464"/>
</svg></ToolBarItem>
            
        </ToolBarContainer>
        {showMoreOptions && <MoreOptions ref={moreOptionsRef} />}
    </>
  );
};

ToolBar.propTypes = {
  addCard: PropTypes.func.isRequired,
  addHeading1: PropTypes.func.isRequired,
  toggleBold: PropTypes.func.isRequired,
  onSelectColor: PropTypes.func.isRequired, // onSelectColor propTypes 추가
};

export default ToolBar;
