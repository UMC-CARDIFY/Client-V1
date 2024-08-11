import { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import { ColorPaletteItem, ColorDropDownButton, ColorDropDownMenu } from './style/ToolbarStyles';
import HighlightColorPalette from './ColorPalette/HighlightColorPalette';

const HighlightColorButton = ({ onSelectColor }) => {
  const [isDropDownOpen, setIsDropDownOpen] = useState(false);
  const dropDownRef = useRef(null);

  const toggleDropDown = () => {
    setIsDropDownOpen(prevState => !prevState); // 드롭다운 상태를 토글
  };

  const handleClickOutside = (event) => {
    if (dropDownRef.current && !dropDownRef.current.contains(event.target)) {
      setIsDropDownOpen(false); // 외부 클릭 시 드롭다운 닫기
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <ColorPaletteItem ref={dropDownRef}>
      <svg 
        xmlns="http://www.w3.org/2000/svg" 
        width="32" 
        height="32" 
        viewBox="0 0 32 32" 
        fill="none" 
        onClick={toggleDropDown} 
      >
        <path d="M12.3906 22.5H10.334L14.9043 9.77344H17.1367L21.7246 22.5H19.668L18.5078 19.1426H13.5508L12.3906 22.5ZM14.1133 17.5254H17.9453L16.0645 12.0938H15.9766L14.1133 17.5254Z" fill="#1A1A1A"/>
        <rect x="4" y="6.5" width="24" height="19" rx="1.5" stroke="#CACACA"/>
      </svg>
      <ColorDropDownButton onClick={toggleDropDown} isActive={isDropDownOpen}>
        <svg xmlns="http://www.w3.org/2000/svg" width="12" height="32" viewBox="0 0 12 32" fill="none">
          <rect width="12" height="32" rx="4" fill={isDropDownOpen ? "#F2F4F8" : "transparent"}/>
          <path d="M2.79492 17.5L5.79492 14.5L8.79492 17.5" stroke={isDropDownOpen ? "#0F62FE" : "#CACACA"} strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </ColorDropDownButton>
      {isDropDownOpen && (
        <ColorDropDownMenu>
          <HighlightColorPalette onSelectColor={onSelectColor} />
        </ColorDropDownMenu>
      )}
    </ColorPaletteItem>
  );
};

HighlightColorButton.propTypes = {
  onSelectColor: PropTypes.func.isRequired,
};

export default HighlightColorButton;
