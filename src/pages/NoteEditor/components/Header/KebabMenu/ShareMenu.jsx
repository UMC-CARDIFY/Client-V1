import { forwardRef, useState } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const ShareMenuWrapper = styled.div`
  position: absolute;
  top: 4.25rem; // 위치 조정
  left: 1.06rem;
  flex-shrink: 0;
  border-radius: 0.25rem;
  border: 1px solid var(--grays-gray-5-divider, #E8E8E8);
  background: var(--Grays-White, #FFF);
  box-shadow: 0px 4px 26px 0px rgba(0, 0, 0, 0.02), 0px 10px 60px 0px rgba(0, 74, 162, 0.03);
  z-index: 10;
  padding: 1rem 1.5rem;
  box-sizing: border-box;
`;

const Title = styled.div`
  color: var(--Grays-Black, #1A1A1A);
  font-family: Pretendard;
  font-size: 0.875rem;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
  margin-bottom: 1.44rem;
`;

const ToggleRow = styled.div`
  display: flex;
  width: 10.8125rem;
  padding: var(--UI-Component-xxxxxS, 0.25rem) var(--UI-Component-None, 0rem);
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.25rem;
`;

const ToggleLabel = styled.label`
  color: var(--Grays-Gray2, #767676);
  font-family: Pretendard;
  font-size: 0.75rem;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`;

const ToggleSwitchWrapper = styled.div`
  position: relative;
  width: 1.8125rem;
  height: var(--font-size-md, 1rem);
  flex-shrink: 0;
`;

const ToggleSwitchSVG = styled.svg`
  position: absolute;
  top: 0;
  left: 0;
  cursor: pointer;
`;

const ButtonWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-top: 1.25rem;
`;

const ShareMenuButton = styled.button`
  display: flex;
  width: 10.8125rem;
  padding: 0.5rem 0.375rem;
  justify-content: center;
  align-items: center;
  gap: 0.38rem;
  border-radius: 0.25rem;
  background: var(--Main-BackGround, #F2F4F8);
  border: none;
  cursor: pointer;

  color: ${({ copied }) => (copied ? '#0F62FE' : 'var(--Grays-Gray1, #646464)')};
  font-family: Pretendard;
  font-size: 0.75rem;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
`;

// eslint-disable-next-line react/display-name
const ShareMenu = forwardRef(({ onCopyLink, onShareToLibrary }, ref) => {
  const [isEditable, setIsEditable] = useState(false);
  const [includeFlashcard, setIncludeFlashcard] = useState(true);
  const [isCopied, setIsCopied] = useState(false);

  const handleToggleEditable = () => {
    setIsEditable(!isEditable);
  };

  const handleToggleFlashcard = () => {
    setIncludeFlashcard(!includeFlashcard);
  };

  const handleCopyLink = () => {
    onCopyLink();
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000); // 2초 후에 원래 상태로 돌아옴
  };

  return (
    <ShareMenuWrapper ref={ref}>
      <Title>공유하기</Title>
      <ToggleRow>
        <ToggleLabel>편집 허용</ToggleLabel>
        <ToggleSwitchWrapper onClick={handleToggleEditable}>
          {isEditable ? (
            <ToggleSwitchSVG xmlns="http://www.w3.org/2000/svg" width="30" height="18" viewBox="0 0 30 18" fill="none">
              <g filter="url(#filter0_d_1696_35510)">
                <rect x="1" y="1" width="29" height="16" rx="8" fill="#0F62FE" />
              </g>
              <g filter="url(#filter1_d_1696_35510)">
                <ellipse cx="21.9453" cy="9.00005" rx="7.25" ry="7.2" fill="white" />
              </g>
              <defs>
                <filter id="filter0_d_1696_35510" x="0" y="0" width="31" height="18" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                  <feFlood floodOpacity="0" result="BackgroundImageFix" />
                  <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                  <feOffset />
                  <feGaussianBlur stdDeviation="0.5" />
                  <feComposite in2="hardAlpha" operator="out" />
                  <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.15 0" />
                  <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_1696_35510" />
                  <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_1696_35510" result="shape" />
                </filter>
                <filter id="filter1_d_1696_35510" x="13.6953" y="0.800049" width="16.5" height="16.3999" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                  <feFlood floodOpacity="0" result="BackgroundImageFix" />
                  <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                  <feOffset />
                  <feGaussianBlur stdDeviation="0.5" />
                  <feComposite in2="hardAlpha" operator="out" />
                  <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.15 0" />
                  <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_1696_35510" />
                  <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_1696_35510" result="shape" />
                </filter>
              </defs>
            </ToggleSwitchSVG>
          ) : (
            <ToggleSwitchSVG xmlns="http://www.w3.org/2000/svg" width="30" height="18" viewBox="0 0 30 18" fill="none">
              <g filter="url(#filter0_d_1696_35507)">
                <rect x="1" y="1" width="29" height="16" rx="8" fill="#C8C8C8" />
                <g filter="url(#filter1_d_1696_35507)">
                  <ellipse cx="9.05469" cy="9.00005" rx="7.25" ry="7.2" fill="white" />
                </g>
              </g>
              <defs>
                <filter id="filter0_d_1696_35507" x="0" y="0" width="31" height="18" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                  <feFlood floodOpacity="0" result="BackgroundImageFix" />
                  <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                  <feOffset />
                  <feGaussianBlur stdDeviation="0.5" />
                  <feComposite in2="hardAlpha" operator="out" />
                  <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.15 0" />
                  <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_1696_35507" />
                  <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_1696_35507" result="shape" />
                </filter>
                <filter id="filter1_d_1696_35507" x="0.804688" y="0.800049" width="16.5" height="16.4" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                  <feFlood floodOpacity="0" result="BackgroundImageFix" />
                  <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                  <feOffset />
                  <feGaussianBlur stdDeviation="0.5" />
                  <feComposite in2="hardAlpha" operator="out" />
                  <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.15 0" />
                  <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_1696_35507" />
                  <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_1696_35507" result="shape" />
                </filter>
              </defs>
            </ToggleSwitchSVG>
          )}
        </ToggleSwitchWrapper>
      </ToggleRow>
      <ToggleRow>
        <ToggleLabel>플래시 카드 포함</ToggleLabel>
        <ToggleSwitchWrapper onClick={handleToggleFlashcard}>
          {includeFlashcard ? (
            <ToggleSwitchSVG xmlns="http://www.w3.org/2000/svg" width="30" height="18" viewBox="0 0 30 18" fill="none">
              <g filter="url(#filter0_d_1696_35510)">
                <rect x="1" y="1" width="29" height="16" rx="8" fill="#0F62FE" />
              </g>
              <g filter="url(#filter1_d_1696_35510)">
                <ellipse cx="21.9453" cy="9.00005" rx="7.25" ry="7.2" fill="white" />
              </g>
              <defs>
                <filter id="filter0_d_1696_35510" x="0" y="0" width="31" height="18" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                  <feFlood floodOpacity="0" result="BackgroundImageFix" />
                  <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                  <feOffset />
                  <feGaussianBlur stdDeviation="0.5" />
                  <feComposite in2="hardAlpha" operator="out" />
                  <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.15 0" />
                  <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_1696_35510" />
                  <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_1696_35510" result="shape" />
                </filter>
                <filter id="filter1_d_1696_35510" x="13.6953" y="0.800049" width="16.5" height="16.3999" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                  <feFlood floodOpacity="0" result="BackgroundImageFix" />
                  <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                  <feOffset />
                  <feGaussianBlur stdDeviation="0.5" />
                  <feComposite in2="hardAlpha" operator="out" />
                  <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.15 0" />
                  <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_1696_35510" />
                  <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_1696_35510" result="shape" />
                </filter>
              </defs>
            </ToggleSwitchSVG>
          ) : (
            <ToggleSwitchSVG xmlns="http://www.w3.org/2000/svg" width="30" height="18" viewBox="0 0 30 18" fill="none">
              <g filter="url(#filter0_d_1696_35507)">
                <rect x="1" y="1" width="29" height="16" rx="8" fill="#C8C8C8" />
                <g filter="url(#filter1_d_1696_35507)">
                  <ellipse cx="9.05469" cy="9.00005" rx="7.25" ry="7.2" fill="white" />
                </g>
              </g>
              <defs>
                <filter id="filter0_d_1696_35507" x="0" y="0" width="31" height="18" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                  <feFlood floodOpacity="0" result="BackgroundImageFix" />
                  <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                  <feOffset />
                  <feGaussianBlur stdDeviation="0.5" />
                  <feComposite in2="hardAlpha" operator="out" />
                  <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.15 0" />
                  <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_1696_35507" />
                  <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_1696_35507" result="shape" />
                </filter>
                <filter id="filter1_d_1696_35507" x="0.804688" y="0.800049" width="16.5" height="16.4" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                  <feFlood floodOpacity="0" result="BackgroundImageFix" />
                  <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                  <feOffset />
                  <feGaussianBlur stdDeviation="0.5" />
                  <feComposite in2="hardAlpha" operator="out" />
                  <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.15 0" />
                  <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_1696_35507" />
                  <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_1696_35507" result="shape" />
                </filter>
              </defs>
            </ToggleSwitchSVG>
          )}
        </ToggleSwitchWrapper>
      </ToggleRow>
      <ButtonWrapper>
        <ShareMenuButton copied={isCopied} onClick={handleCopyLink}>
          {isCopied? <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 14 14" fill="none">
  <path d="M5.49675 10.6811L2 7.18437L2.87419 6.31018L5.49675 8.93274L11.1253 3.3042L11.9995 4.17839L5.49675 10.6811Z" fill="#0F62FE"/>
</svg> :
<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M13.0153 4.82235C12.9947 5.55627 12.6932 6.25429 12.1731 6.77251L10.2727 8.6729C10.006 8.94107 9.68867 9.15364 9.33918 9.29829C8.98969 9.44295 8.61496 9.51683 8.23672 9.51563H8.23398C7.84943 9.51534 7.46883 9.438 7.11467 9.28816C6.7605 9.13832 6.43996 8.91902 6.17197 8.64323C5.90397 8.36744 5.69396 8.04073 5.55434 7.68242C5.41472 7.32411 5.34832 6.94145 5.35906 6.55704C5.36134 6.47154 5.39692 6.39031 5.45821 6.33066C5.5195 6.271 5.60166 6.23763 5.68719 6.23766H5.69648C5.78342 6.2401 5.86584 6.27695 5.92562 6.34011C5.9854 6.40328 6.01766 6.4876 6.01531 6.57454C6.00683 6.87137 6.05795 7.16689 6.16565 7.44362C6.27334 7.72035 6.43543 7.97269 6.64232 8.1857C6.84922 8.39871 7.09672 8.56808 7.3702 8.68379C7.64368 8.79951 7.93758 8.85921 8.23453 8.85938C8.52642 8.86008 8.81556 8.80292 9.08524 8.69122C9.35492 8.57952 9.59979 8.41549 9.8057 8.2086L11.7061 6.30876C12.1075 5.88916 12.3286 5.32911 12.3223 4.74849C12.3159 4.16787 12.0825 3.61281 11.672 3.20212C11.2615 2.79143 10.7066 2.55773 10.126 2.55106C9.54536 2.54439 8.9852 2.76526 8.56539 3.16641L7.96383 3.76798C7.90226 3.82955 7.81875 3.86414 7.73168 3.86414C7.64461 3.86414 7.5611 3.82955 7.49953 3.76798C7.43796 3.70641 7.40337 3.6229 7.40337 3.53583C7.40337 3.44876 7.43796 3.36525 7.49953 3.30368L8.10109 2.70212C8.36832 2.43479 8.6856 2.22272 9.03481 2.07804C9.38401 1.93336 9.7583 1.85889 10.1363 1.85889C10.5143 1.85889 10.8886 1.93336 11.2378 2.07804C11.587 2.22272 11.9043 2.43479 12.1715 2.70212C12.4487 2.97972 12.6665 3.31087 12.8116 3.67539C12.9567 4.03992 13.026 4.43017 13.0153 4.82235ZM6.03609 10.2309L5.43453 10.8325C5.22845 11.04 4.98319 11.2045 4.713 11.3164C4.44281 11.4283 4.15307 11.4854 3.86062 11.4844C3.4213 11.4841 2.99193 11.3535 2.62678 11.1092C2.26162 10.865 1.97708 10.5179 1.80911 10.112C1.64113 9.70604 1.59727 9.25941 1.68306 8.82854C1.76885 8.39767 1.98044 8.00191 2.29109 7.69126L4.18984 5.79141C4.50423 5.47621 4.90606 5.26271 5.34324 5.17859C5.78041 5.09448 6.23278 5.14363 6.64168 5.31968C7.05059 5.49573 7.39719 5.79055 7.63654 6.16592C7.87589 6.5413 7.99697 6.97992 7.98406 7.42493C7.98171 7.51187 8.01397 7.59619 8.07375 7.65936C8.13353 7.72252 8.21595 7.75937 8.30289 7.7618H8.31219C8.39772 7.76184 8.47988 7.72847 8.54117 7.66881C8.60246 7.60916 8.63803 7.52793 8.64031 7.44243C8.65664 6.86622 8.49958 6.29838 8.18947 5.81247C7.87935 5.32655 7.43048 4.94495 6.90098 4.71709C6.37149 4.48923 5.78578 4.42561 5.21971 4.53447C4.65364 4.64334 4.1333 4.91966 3.72609 5.32766L1.82516 7.22751C1.42284 7.62993 1.14884 8.14258 1.03778 8.70067C0.926714 9.25876 0.983573 9.83725 1.20117 10.363C1.41876 10.8888 1.78733 11.3383 2.2603 11.6547C2.73326 11.9711 3.2894 12.1402 3.85844 12.1406C4.23664 12.1417 4.6113 12.0678 4.9607 11.923C5.3101 11.7783 5.6273 11.5656 5.8939 11.2974L6.49547 10.6958C6.52632 10.6654 6.55086 10.6292 6.56766 10.5893C6.58445 10.5493 6.59318 10.5065 6.59333 10.4632C6.59348 10.4199 6.58505 10.3769 6.56853 10.3369C6.55201 10.2969 6.52773 10.2605 6.49709 10.2299C6.46644 10.1993 6.43004 10.175 6.38998 10.1586C6.34992 10.1421 6.30699 10.1337 6.26368 10.1339C6.22036 10.1341 6.17752 10.1429 6.13761 10.1597C6.09771 10.1766 6.06153 10.2011 6.03117 10.232L6.03609 10.2309Z" fill="#646464" stroke="#646464" strokeWidth="0.2"/>
          </svg>}
          {isCopied ? '링크 복사 완료' : '링크 복사'}
        </ShareMenuButton>
        <ShareMenuButton onClick={onShareToLibrary}>
          <svg xmlns="http://www.w3.org/2000/svg" width="15" height="14" viewBox="0 0 15 14" fill="none">
            <path d="M2.64062 7.55566H4.68507C4.86795 7.55564 5.04801 7.60075 5.20927 7.687C5.37054 7.77326 5.50802 7.89798 5.60951 8.05011L6.06063 8.72789C6.16212 8.88002 6.2996 9.00474 6.46087 9.09099C6.62213 9.17724 6.80219 9.22236 6.98507 9.22233H8.0184C8.20128 9.22236 8.38134 9.17724 8.54261 9.09099C8.70387 9.00474 8.84135 8.88002 8.94285 8.72789L9.39396 8.05011C9.49546 7.89798 9.63294 7.77326 9.7942 7.687C9.95546 7.60075 10.1355 7.55564 10.3184 7.55566H12.3628" stroke="#646464" strokeWidth="0.8" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M5.83333 5.61111H9.16667M6.66667 3.94444H8.33333M3.86111 2.61667L2.66 6.97611C2.55393 7.36067 2.50011 7.75775 2.5 8.15667V10.8889C2.5 11.1836 2.61706 11.4662 2.82544 11.6746C3.03381 11.8829 3.31643 12 3.61111 12H11.3889C11.6836 12 11.9662 11.8829 12.1746 11.6746C12.3829 11.4662 12.5 11.1836 12.5 10.8889V8.15667C12.4999 7.75775 12.4461 7.36067 12.34 6.97611L11.1389 2.61667C11.0469 2.43155 10.9051 2.27576 10.7294 2.16682C10.5537 2.05788 10.3512 2.00011 10.1444 2H4.85556C4.64884 2.00011 4.44626 2.05788 4.27058 2.16682C4.0949 2.27576 3.9531 2.43155 3.86111 2.61667Z" stroke="#646464" strokeWidth="0.8" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          자료실에 공유
        </ShareMenuButton>
      </ButtonWrapper>
    </ShareMenuWrapper>
  );
});

ShareMenu.propTypes = {
  onCopyLink: PropTypes.func.isRequired,
  onShareToLibrary: PropTypes.func.isRequired,
};

export default ShareMenu;
