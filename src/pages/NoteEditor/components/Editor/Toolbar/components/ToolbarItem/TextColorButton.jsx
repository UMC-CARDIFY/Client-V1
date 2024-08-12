import { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import { ColorPaletteItem, ColorDropDownButton, ColorDropDownMenu } from './style/ToolbarStyles';
import ColorPalette from './ColorPalette/TextColorPalette';
import { applyTextColor } from '../../../setup/commands';

const TextColorButton = ({ onSelectColor, editorView }) => {
  const [isColorPaletteOpen, setIsColorPaletteOpen] = useState(false);
  const buttonRef = useRef(null);

  const toggleColorPalette = (event) => {
    event.stopPropagation();
    event.preventDefault();

    console.log("toggleColorPalette called. editorView:", editorView);
    console.log("Current isColorPaletteOpen:", isColorPaletteOpen);

    if (editorView && editorView.focus) {
      console.log("Editor view is valid, focusing.");
      editorView.focus();
      setIsColorPaletteOpen(prevState => !prevState);
    } else {
      console.log("Editor view is not defined or invalid.");
    }
  };

  const handleClickOutside = (event) => {
    if (buttonRef.current && !buttonRef.current.contains(event.target)) {
      setIsColorPaletteOpen(false);
    }
  };

  const handleColorSelect = (color) => {
    console.log("handleColorSelect called with color:", color);
    setIsColorPaletteOpen(false);
    onSelectColor(color);

    if (editorView) {
      const { state, dispatch } = editorView;
      console.log("Applying color to editor:", color);
      const result = applyTextColor(color)(state, dispatch);
      console.log("applyTextColor result:", result);  // 색상 적용 결과 출력
    } else {
      console.log("Editor view is not defined or invalid."); 
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const handleMouseDown = (event) => {
      event.preventDefault();
    };

    const buttonElement = buttonRef.current;
    if (buttonElement) {
      buttonElement.addEventListener('mousedown', handleMouseDown);
    }

    return () => {
      if (buttonElement) {
        buttonElement.removeEventListener('mousedown', handleMouseDown);
      }
    };
  }, []);

  return (
    <>
      <ColorPaletteItem ref={buttonRef}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="25"
          height="14"
          viewBox="0 0 25 14"
          fill="none"
          onClick={toggleColorPalette}
        >
          <path d="M7.44336 13.3633H5L9.48242 0.636719H12.2949L16.7949 13.3633H14.3516L13.2969 10.2168H8.49805L7.44336 13.3633ZM9.11328 8.37109H12.6816L10.9414 3.23828H10.8359L9.11328 8.37109Z" fill="#1A1A1A"/>
          <rect x="18.7949" y="9.36328" width="4" height="4" rx="1" fill="#1A1A1A"/>
        </svg>
        <ColorDropDownButton onClick={toggleColorPalette} isActive={isColorPaletteOpen}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="12"
            height="32"
            viewBox="0 0 12 32"
            fill="none"
          >
            <rect width="12" height="32" rx="4" fill={isColorPaletteOpen ? "#F2F4F8" : "transparent"}/>
            <path d="M2.79492 17.5L5.79492 14.5L8.79492 17.5" stroke={isColorPaletteOpen ? "#0F62FE" : "#CACACA"} strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </ColorDropDownButton>
      </ColorPaletteItem>

      {isColorPaletteOpen && 
        <ColorDropDownMenu>
          <ColorPalette onSelectColor={handleColorSelect} />
        </ColorDropDownMenu>
      }
    </>
  );
};

TextColorButton.propTypes = {
  onSelectColor: PropTypes.func.isRequired,
  editorView: PropTypes.object.isRequired,
};

export default TextColorButton;
