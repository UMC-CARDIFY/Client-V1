// src/components/MoreDiv.js
import React, { forwardRef } from 'react';
import styled from 'styled-components';

const MoreDivContainer = styled.div`
  position: relative;
  display: inline-block;
`;

const Options = styled.div`
  display: flex;
  width: 8.8125rem;
  flex-direction: column;
  align-items: center;
  position: absolute;
  top: 30px;
  left: 0;
  z-index: 1;
  box-shadow: 0px 4px 12px 0px rgba(0, 0, 0, 0.04), 0px 4px 20px 0px rgba(0, 0, 0, 0.06);
`;

const OptionButton = styled.button`
  display: flex;
  padding: 1.0625rem 2rem;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
  align-self: stretch;
  cursor: pointer;
  border: 1px solid #dedede;
  background: var(--Grays-White, #fff);
  color: var(--Grays-Black, #1a1a1a);
  font-family: Pretendard;
  font-size: 0.875rem;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
`;

const MoreButton = styled.div`
  width: var(--font-size-2xl, 1.75rem);
  height: var(--font-size-2xl, 1.75rem);
  flex-shrink: 0;
  cursor: pointer;
`;

// eslint-disable-next-line react/display-name
const MoreDiv = forwardRef(({ type, onEditClick, onDeleteClick, isActive, onMoreClick }, ref) => {
  return (
    <MoreDivContainer ref={ref}>
      <MoreButton onClick={onMoreClick}>
        <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 28 28" fill="none">
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M12.25 5.83331C12.25 5.36918 12.4344 4.92406 12.7626 4.59588C13.0908 4.26769 13.5359 4.08331 14 4.08331H14.0117C14.4758 4.08331 14.9209 4.26769 15.2491 4.59588C15.5773 4.92406 15.7617 5.36918 15.7617 5.83331V5.84498C15.7617 6.30911 15.5773 6.75423 15.2491 7.08242C14.9209 7.41061 14.4758 7.59498 14.0117 7.59498H14C13.5359 7.59498 13.0908 7.41061 12.7626 7.08242C12.4344 6.75423 12.25 6.30911 12.25 5.84498V5.83331ZM12.25 14C12.25 13.5359 12.4344 13.0907 12.7626 12.7625C13.0908 12.4344 13.5359 12.25 14 12.25H14.0117C14.4758 12.25 14.9209 12.4344 15.2491 12.7625C15.5773 13.0907 15.7617 13.5359 15.7617 14V14.0116C15.7617 14.4758 15.5773 14.9209 15.2491 15.2491C14.9209 15.5773 14.4758 15.7616 14.0117 15.7616H14C13.5359 15.7616 13.0908 15.5773 12.7626 15.2491C12.4344 14.9209 12.25 14.4758 12.25 14.0116V14ZM14 20.4166C13.5359 20.4166 13.0908 20.601 12.7626 20.9292C12.4344 21.2574 12.25 21.7025 12.25 22.1666V22.1783C12.25 22.6424 12.4344 23.0876 12.7626 23.4158C13.0908 23.7439 13.5359 23.9283 14 23.9283H14.0117C14.4758 23.9283 14.9209 23.7439 15.2491 23.4158C15.5773 23.0876 15.7617 22.6424 15.7617 22.1783V22.1666C15.7617 21.7025 15.5773 21.2574 15.2491 20.9292C14.9209 20.601 14.4758 20.4166 14.0117 20.4166H14Z"
            fill="#BBBBBB"
          />
        </svg>
      </MoreButton>
      {isActive && (
        <Options>
          {type === 'folder' && <OptionButton onClick={onEditClick}>폴더 수정</OptionButton>}
          <OptionButton onClick={onDeleteClick}>{type === 'folder' ? '폴더 삭제' : '노트 삭제'}</OptionButton>
        </Options>
      )}
    </MoreDivContainer>
  );
});

export default MoreDiv;
