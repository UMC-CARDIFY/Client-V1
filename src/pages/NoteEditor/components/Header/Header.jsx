import { useState, useRef, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import KebabMenu from './KebabMenu/KebabMenu';
import ShareMenu from './KebabMenu/ShareMenu';
//import { useSaveContext } from './SaveContext';
import { saveNote } from '../../../../api/noteeditor/saveNote'
import StarButton from './StarButton';
import SaveButton from './SaveButton';
import SearchInput from './SearchInput';
import CloseButton from './CloseButton';
import { NoteContext } from '../../../../api/NoteContext';
import { shareLib } from '../../../../api/noteeditor/shareLib';
import { NoteStatusContext } from '../../../../api/NoteStatus';

const HeaderWrapper = styled.header`
  background: var(--Grays-White, #FFF);
  box-shadow: 0px 4px 26px 0px rgba(0, 0, 0, 0.02), 0px 10px 60px 0px rgba(0, 74, 162, 0.03);
  padding-left: 1rem;
  padding-right: 1rem; 
  padding-top: 0.75rem;
  padding-bottom: 0.75rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  z-index: 999;
  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
  }
`;

const KebabIcon = styled.button`
  width: var(--line-height-xl, 2.7rem);
  height: var(--line-height-xl, 2.7rem);
  flex-shrink: 0;
  background: none;
  border: none;
  cursor: pointer;

  svg {
    width: 100%;
    height: 100%;
  }
`;

const NotificationText = styled.span`
  color: var(--Grays-Gray3, #B1B1B1);
  margin-left: 1rem;
  font-family: Pretendard;
  font-size: 0.9375rem;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  opacity: ${({ isVisible }) => (isVisible ? 1 : 0)};
  transition: opacity 0.3s ease-in-out;

  @media screen and (max-width: 1440px) {
    font-size: 0.85rem;
  }

  @media screen and (max-width: 1200px) {
    font-size: 0.8rem;
  }
`;

const RightSection = styled.div`
  display: flex;
  align-items: center;
  position: relative;
`;

const LeftSection = styled.div`
  display: flex;
  align-items: center;
  position: relative;
`;

const ToggleMenuButton = styled.button`
  width: 3rem;
  height: 3rem;
  flex-shrink: 0;
  background: none;
  border: none;
  cursor: pointer;
  margin-right: -0.5rem;

  svg {
    width: 100%;
    height: 100%;
  }
`;

const Header = ({ isMenuCollapsed, toggleMenuBar, editorView = null, selectedForderId, currentNoteId }) => {
  const { noteData, setNoteData } = useContext(NoteContext);
  const { isNameChanged, isContentChanged, setIsNameChanged, setIsContentChanged } = useContext(NoteStatusContext);
  const [isKebabMenuOpen, setIsKebabMenuOpen] = useState(false);
  const [isShareMenuOpen, setIsShareMenuOpen] = useState(false);
  const kebabMenuRef = useRef(null);
  const shareMenuRef = useRef(null);
  const { isUpload } = noteData; // isUpload 상태 가져오기

  const handleKebabClick = () => {
    setIsKebabMenuOpen(!isKebabMenuOpen);
    setIsShareMenuOpen(false);
  };

  const handleShareClick = () => {
    setIsKebabMenuOpen(false);
    setIsShareMenuOpen(true);
  };

  const handleClickOutside = (event) => {
    if (shareMenuRef.current && !shareMenuRef.current.contains(event.target)) {
      setIsShareMenuOpen(false);
    }
  };

  useEffect(() => {
    if (isKebabMenuOpen || isShareMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isKebabMenuOpen, isShareMenuOpen]);

  const handleShareToLibrary = async (selectedCategories) => {
    try {
      const response = await shareLib(currentNoteId, selectedCategories);
      console.log('자료실에 공유 성공:', response);
      setNoteData((prevData) => ({ ...prevData, isUpload: true }));
    } catch (error) {
      console.error('노트 자료실 업로드 중 오류 발생:', error);
    }
  };

  /*이미지 카드 저장
  const { saveImageCard } = useSaveContext(); // Context에서 saveImageCard 함수 가져오기

  const handleSave = () => {
    if (saveImageCard) { // 가림판카드가 저장되어야 하는 경우
      saveImageCard(); // ImageCard의 saveImageCard 함수 호출
    } else {
      //alert('저장할 데이터가 없습니다.');
    }
  };
  */

  // 노트 저장
  const handleSave = async () => {
    if (!editorView || !editorView.state) {
      alert('Editor is not ready');
      console.log("EditorView or its state is not set in viewRef");
      return;
    }
    const noteDataToSave = {
      title: document.querySelector('div[contentEditable=true]').innerText || '제목없음',
      content: noteData.noteContent,  // 최신 상태의 noteContent를 가져옴
    };
    //console.log(noteData.noteContent);

    // ProseMirror의 상태를 JSON으로 직렬화하여 로그로 출력
    //console.log("Document JSON:", JSON.stringify(editorView.state.doc.toJSON(), null, 2));
    console.log("Note Data to Save:", noteDataToSave);

    const token = localStorage.getItem('accessToken');
    if (!token) {
        alert('토큰이 존재하지 않습니다. 다시 로그인해주세요.');
        return;
          }

    try {
        const response = await saveNote(
            currentNoteId,
            noteDataToSave.title,
            noteDataToSave.content,
            token
        );
        if (response.isSuccess) {
          alert('저장이 완료되었습니다.');
          setIsNameChanged(false);
          setIsContentChanged(false);          
        } else {
          alert('저장에 실패했습니다.');
        }
      } catch (error) {
        console.error("API Error Response:", error.response);
        alert(`저장에 실패했습니다: ${error.message}`);
      }
};

  return (
    <HeaderWrapper>
      <LeftSection>
        {isMenuCollapsed && (
          <ToggleMenuButton onClick={toggleMenuBar}>
            <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 40 40" fill="none">
              <path d="M21 14L26 19.5L21 25" stroke="#B1B1B1" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M14 14L19 19.5L14 25" stroke="#B1B1B1" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </ToggleMenuButton>
        )}
        <KebabIcon onClick={handleKebabClick}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40" fill="none">
            <path fillRule="evenodd" clipRule="evenodd" d="M18.25 11.8333C18.25 11.3691 18.4344 10.924 18.7626 10.5958C19.0908 10.2676 19.5359 10.0833 20 10.0833H20.0117C20.4758 10.0833 20.9209 10.2676 21.2491 10.5958C21.5773 10.924 21.7617 11.3691 21.7617 11.8333V11.8449C21.7617 12.309 21.5773 12.7542 21.2491 13.0824C20.9209 13.4105 20.4758 13.5949 20.0117 13.5949H20C19.5359 13.5949 19.0908 13.4105 18.7626 13.0824C18.4344 12.7542 18.25 12.309 18.25 11.8449V11.8333ZM18.25 19.9999C18.25 19.5358 18.4344 19.0907 18.7626 18.7625C19.0908 18.4343 19.5359 18.2499 20 18.2499H20.0117C20.4758 18.2499 20.9209 18.4343 21.2491 18.7625C21.5773 19.0907 21.7617 19.5358 21.7617 19.9999V20.0116C21.7617 20.4757 21.5773 20.9208 21.2491 21.249C20.9209 21.5772 20.4758 21.7616 20.0117 21.7616H20C19.5359 21.7616 19.0908 21.5772 18.7626 21.249C18.4344 20.9208 18.25 20.4757 18.25 20.0116V19.9999ZM20 26.4166C19.5359 26.4166 19.0908 26.601 18.7626 26.9291C18.4344 27.2573 18.25 27.7025 18.25 28.1666V28.1783C18.25 28.6424 18.4344 29.0875 18.7626 29.4157C19.0908 29.7439 19.5359 29.9283 20 29.9283H20.0117C20.4758 29.9283 20.9209 29.7439 21.2491 29.4157C21.5773 29.0875 21.7617 28.6424 21.7617 28.1783V28.1666C21.7617 27.7025 21.5773 27.2573 21.2491 26.9291C20.9209 26.601 20.4758 26.4166 20.0117 26.4166H20Z" fill="#B1B1B1"/>
          </svg>
        </KebabIcon>
        {isKebabMenuOpen && (
          <KebabMenu
            ref={kebabMenuRef}
            onShare={handleShareClick}
            noteId={currentNoteId}
          />
        )}
        {isShareMenuOpen && (
          <ShareMenu
            ref={shareMenuRef}
            onShareToLibrary={handleShareToLibrary}
          />
        )}
        <StarButton />
        <NotificationText isVisible={isNameChanged || isContentChanged}>
          저장되지 않은 변경 사항이 있습니다.
        </NotificationText>
        <SaveButton isVisible={isNameChanged || isContentChanged} onSave={handleSave} />
      </LeftSection>
      <RightSection>
        <SearchInput ForderId={selectedForderId}/>
        <CloseButton />
      </RightSection>
    </HeaderWrapper>
  );
};

Header.propTypes = {
  isMenuCollapsed: PropTypes.bool.isRequired,
  toggleMenuBar: PropTypes.func.isRequired,
  editorView: PropTypes.object,
  selectedForderId: PropTypes.number.isRequired,
  currentNoteId: PropTypes.number.isRequired,
};

export default Header;