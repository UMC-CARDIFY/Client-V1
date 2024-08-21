import { useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import { ColorPaletteItem, ColorDropDownButton, TextColorDropDownMenu } from './style/ToolbarStyles';
import ColorPalette from './ColorPalette/TextColorPalette';

const TextColorButton = ({ onSelectColor, isOpen, onToggle }) => {
  const colorPaletteRef = useRef(null);
  const buttonRef = useRef(null);

  const handleClickOutside = (event) => {
    if (
      colorPaletteRef.current && !colorPaletteRef.current.contains(event.target) &&
      buttonRef.current && !buttonRef.current.contains(event.target)
    ) {
      onToggle();
    }
  };

  useEffect(() => {
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  return (
    <>
      <ColorPaletteItem ref={buttonRef}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="25"
          height="14"
          viewBox="0 0 25 14"
          fill="none"
          onClick={onToggle}
        >
          <path d="M7.44336 13.3633H5L9.48242 0.636719H12.2949L16.7949 13.3633H14.3516L13.2969 10.2168H8.49805L7.44336 13.3633ZM9.11328 8.37109H12.6816L10.9414 3.23828H10.8359L9.11328 8.37109Z" fill="#1A1A1A"/>
          <rect x="18.7949" y="9.36328" width="4" height="4" rx="1" fill="#1A1A1A"/>
        </svg>
        <ColorDropDownButton onClick={onToggle} isActive={isOpen}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="12"
            height="32"
            viewBox="0 0 12 32"
            fill="none"
          >
            <rect width="12" height="32" rx="4" fill={isOpen ? "#F2F4F8" : "transparent"}/>
            <path d="M2.79492 17.5L5.79492 14.5L8.79492 17.5" stroke={isOpen ? "#0F62FE" : "#CACACA"} strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </ColorDropDownButton>
      </ColorPaletteItem>

      {isOpen && 
        <TextColorDropDownMenu>
          <ColorPalette onSelectColor={onSelectColor} />
        </TextColorDropDownMenu>
      }
    </>
  );
};

TextColorButton.propTypes = {
  onSelectColor: PropTypes.func.isRequired,
  isOpen: PropTypes.bool.isRequired,
  onToggle: PropTypes.func.isRequired,
};

export default TextColorButton;
