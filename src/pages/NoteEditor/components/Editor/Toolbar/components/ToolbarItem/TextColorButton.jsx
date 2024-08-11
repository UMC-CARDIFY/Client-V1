import { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import { ColorPaletteItem, ColorDropDownButton, DropDownMenu } from './style/ToolbarStyles';
import ColorPalette from './ColorPalette/TextColorPalette'; // Assuming you have a ColorPalette component

const TextColorButton = ({ onSelectColor }) => {
  const [isColorDropDownOpen, setIsColorDropDownOpen] = useState(false);
  const colorDropDownRef = useRef(null);

  const toggleColorPalette = () => {
    setIsColorDropDownOpen(!isColorDropDownOpen);
  };

  const handleClickOutside = (event) => {
    if (colorDropDownRef.current && !colorDropDownRef.current.contains(event.target)) {
      setIsColorDropDownOpen(false);
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
      <ColorPaletteItem onClick={toggleColorPalette}>
        <svg xmlns="http://www.w3.org/2000/svg" width="25" height="14" viewBox="0 0 25 14" fill="none">
          <path d="M7.44336 13.3633H5L9.48242 0.636719H12.2949L16.7949 13.3633H14.3516L13.2969 10.2168H8.49805L7.44336 13.3633ZM9.11328 8.37109H12.6816L10.9414 3.23828H10.8359L9.11328 8.37109Z" fill="#1A1A1A"/>
          <rect x="18.7949" y="9.36328" width="4" height="4" rx="1" fill="#1A1A1A"/>
        </svg>
        <ColorDropDownButton onClick={toggleColorPalette} isActive={isColorDropDownOpen}>
        <svg xmlns="http://www.w3.org/2000/svg" width="12" height="32" viewBox="0 0 12 32" fill="none">
          <rect width="12" height="32" rx="4" fill={isColorDropDownOpen ? "#F2F4F8" : "transparent"}/>
          <path d="M2.79492 17.5L5.79492 14.5L8.79492 17.5" stroke={isColorDropDownOpen ? "#0F62FE" : "#CACACA"} strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </ColorDropDownButton>
      {isColorDropDownOpen && (
        <DropDownMenu ref={colorDropDownRef}>
          <ColorPalette onSelectColor={onSelectColor} />
        </DropDownMenu>
      )}
      </ColorPaletteItem>
      
    </>
  );
};

TextColorButton.propTypes = {
  onSelectColor: PropTypes.func.isRequired,
};

export default TextColorButton;
