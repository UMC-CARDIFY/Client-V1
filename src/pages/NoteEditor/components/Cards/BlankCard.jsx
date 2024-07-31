import { useState, useRef, useEffect, useCallback } from 'react';
import styled from 'styled-components';
import PreviewModal from './PreviewModal';

const BlankCardContainer = styled.div`
  position: relative;
  padding: 0.5rem;
  padding-left: 3rem;
  margin: 0.5rem 0;
  display: flex;
  align-items: center;
  border-radius: 0.5rem;
  border: none;

  &:hover, &:active {
    border: 1px solid var(--Grays-Gray4, #CACACA);
  }
`;

const ContentContainer = styled.div`
  display: flex;
  align-items: center;
  flex: 1;
`;

const EditableDiv = styled.div`
  border: none;
  background: transparent;
  outline: none;
  color: var(--Grays-Black, #1A1A1A);
  font-family: Pretendard;
  font-size: 1rem;
  font-style: normal;
  font-weight: 300;
  line-height: normal;
  resize: none;
  overflow: hidden;
  min-height: 1rem;
  line-height: 1.5rem;
  width: 100%;
  white-space: pre-wrap;
`;

const BulletIcon = styled.div`
  position: absolute;
  top: 1rem;
  left: 1rem;
  width: 0.5rem;
  height: 0.5rem;
  margin: 0 1rem 0 0.75rem;
  background-color: black;
  border-radius: 50%;
`;

const PreviewIcon = styled.div`
  position: absolute;
  top: 0.5rem;
  right: 0.5rem;
  display: ${({ active }) => (active ? 'flex' : 'none')};
  width: 1rem;
  height: 1rem;
  padding: 0.25rem;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
  flex-shrink: 0;
  cursor: pointer;
`;

const BlankCard = () => {
  const [blankCard, setBlankCard] = useState({ front: '빈칸 카드', back: '빈칸' });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const editableDivRef = useRef(null);

  const handleContentChange = (e) => {
    const value = e.target.innerText;
    const regex = /{{(.*?)}}/g;
    const match = regex.exec(value);

    if (match) {
      setBlankCard({
        front: value.replace(regex, '').trim(),
        back: match[1].trim(),
      });
    } else {
      setBlankCard({
        front: value,
        back: '',
      });
    }
  };

  const updateContent = useCallback(() => {
    const content = `${blankCard.front} ${blankCard.back ? `{{${blankCard.back}}}` : ''}`;
    const parts = content.split(/({{.*?}})/g);

    const formattedContent = parts.map((part, index) => {
      if (part.match(/{{.*?}}/)) {
        return `<span style="background-color: #DCE8FF; text-decoration: underline; text-decoration-color: #0F62FE;">${part.replace(/{{|}}/g, '')}</span>`;
      }
      return part;
    }).join('');

    if (editableDivRef.current) {
      const range = document.createRange();
      const sel = window.getSelection();
      const pos = sel.rangeCount > 0 ? sel.getRangeAt(0).startOffset : 0;

      editableDivRef.current.innerHTML = formattedContent;

      range.setStart(editableDivRef.current.childNodes[0], Math.min(pos, editableDivRef.current.childNodes[0].length));
      range.collapse(true);

      sel.removeAllRanges();
      sel.addRange(range);
    }
  }, [blankCard]);

  const handleInput = (e) => {
    handleContentChange(e);
    updateContent();
  };

  useEffect(() => {
    updateContent();
  }, [updateContent]);

  const handlePreviewClick = () => { setIsModalOpen(true); };
  const handleCloseModal = () => { setIsModalOpen(false); };

  return (
    <BlankCardContainer
      onMouseEnter={() => setIsActive(true)}
      onMouseLeave={() => setIsActive(false)}
      onFocus={() => setIsActive(true)}
      onBlur={() => setIsActive(false)}
    >
      <ContentContainer>
        <BulletIcon />
        <EditableDiv
          contentEditable
          ref={editableDivRef}
          onInput={handleInput}
          suppressContentEditableWarning={true} // React 경고 억제
        />
      </ContentContainer>
      <PreviewIcon active={isActive} onClick={handlePreviewClick}>
        <svg xmlns="http://www.w3.org/2000/svg" width="23" height="17" viewBox="0 0 23 17" fill="none">
          <path d="M11.2841 3.6369L10.842 3.1948L9.07361 1.42639L2 8.5L9.07361 15.5736L10.842 13.8052L11.2841 13.3631" stroke="#6A9CFC" strokeWidth="1.5"/>
          <rect x="6.85352" y="8.5" width="10.0036" height="10.0036" transform="rotate(-45 6.85352 8.5)" stroke="#0F62FE" strokeWidth="1.5"/>
        </svg>
      </PreviewIcon>
      {isModalOpen && <PreviewModal onClose={handleCloseModal} cardContent={blankCard} />}
    </BlankCardContainer>
  );
};

export default BlankCard;
