import { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import MoreOptions from './MoreOptions'; // MoreOptions 컴포넌트 임포트
import ColorPalette from './Toolbar/ColorPalette'; // ColorPalette 컴포넌트 임포트
import PropTypes from 'prop-types';

const ToolBarContainer = styled.div`
  width: auto;
  display: inline-flex;
  padding: 0.625rem 1.25rem;
  justify-content: center;
  align-items: center;
  gap: 0.9375rem;
  border: 1.25px solid #D9D9D9;
  background: #FFF;
  box-shadow: 0px 5px 6px 0px rgba(0, 0, 0, 0.05);
  position: fixed;
  bottom: 1.5rem;
`;

const ToolBarItem = styled.div`
  width: var(--line-height-xl, 2.5rem);
  height: var(--line-height-xl, 2.5rem);
  background: #D9D9D9;
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
        <ToolBarItem onClick={() => addCard('word')}>단어</ToolBarItem>
        <ToolBarItem onClick={() => addCard('blank')}>빈칸</ToolBarItem>
        <ToolBarItem onClick={() => addCard('multi')}>멀티</ToolBarItem>
        <ToolBarItem onClick={() => addCard('image')}>가림판</ToolBarItem>
        <ToolBarItem onClick={addHeading1}>제목 1</ToolBarItem>
        <ToolBarItem onClick={toggleBold}>굵게</ToolBarItem>
        <ToolBarItem onClick={toggleColorPalette}>글씨 색</ToolBarItem>
        {showPalette && <ColorPalette onSelectColor={onSelectColor} />}
        <ToolBarItem>형광펜 색</ToolBarItem>
        <ToolBarItem onMouseDown={(e) => e.preventDefault()} onClick={toggleMoreOptions}>더보기</ToolBarItem>
            
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
