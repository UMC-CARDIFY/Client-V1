import styled from 'styled-components';
import PropTypes from 'prop-types';

import WordCardButton from './components/ToolbarItem/WordCardButton';
import BlankCardButton from './components/ToolbarItem/BlankCardButton';
import MultiCardButton from './components/ToolbarItem/MultiCardButton';
import ImageCardButton from './components/ToolbarItem/ImageCardButton';
import HeadingButton from './components/ToolbarItem/HeadingButton';
import BoldButton from './components/ToolbarItem/BoldButton';
import TextColorButton from './components/ToolbarItem/TextColorButton';
import HighlightColorButton from './components/ToolbarItem/HighlightColorButton';
import MoreOptionsButton from './components/ToolbarItem/MoreOptionsButton';

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

const Divider = styled.div`
  width: 0.0625rem;
  height: 2rem;
  background: #E8E8E8;
`;

const ToolBar = ({ addCard, addHeading1, toggleBold, onSelectColor, viewRef, onSelectHighlightColor }) => {
  console.log("ToolBar received viewRef:", viewRef.current); // viewRef 로그 확인

  return (
    <ToolBarContainer>
      <WordCardButton onClick={() => addCard('word_card')} /> {/* 수정된 부분 */}
      <BlankCardButton onClick={() => addCard('blank')} />
      <MultiCardButton onClick={() => addCard('multi')} />
      <ImageCardButton onClick={() => addCard('image')} />
      <Divider />
      <HeadingButton onHeadingSelect={addHeading1} />
      <BoldButton onClick={toggleBold} />
      <Divider />
      <TextColorButton onSelectColor={onSelectColor} editorView={viewRef.current} />
      <HighlightColorButton onSelectColor={onSelectHighlightColor} />
      <Divider />
      <MoreOptionsButton />
    </ToolBarContainer>
  );
};

ToolBar.propTypes = {
  addCard: PropTypes.func.isRequired,
  addHeading1: PropTypes.func.isRequired,
  toggleBold: PropTypes.func.isRequired,
  onSelectColor: PropTypes.func.isRequired,
  onSelectHighlightColor: PropTypes.func.isRequired,
  viewRef: PropTypes.shape({
    current: PropTypes.object,
  }).isRequired,
};

export default ToolBar;
