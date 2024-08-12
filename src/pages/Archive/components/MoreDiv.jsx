// src/components/MoreDiv.js
import { forwardRef } from 'react';
import styled from 'styled-components';
import KebabIcon from '../../../assets/kebab.svg'

const MoreDivContainer = styled.div`
  position: relative;
  display: inline-block;
  border-radius: 0.5rem;
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

const Icon = styled.img`  
`;

// eslint-disable-next-line react/display-name
const MoreDiv = forwardRef(({ type, onEditClick, onDeleteClick, isActive, onMoreClick }, ref) => {
  return (
    <MoreDivContainer ref={ref}>
      <MoreButton onClick={onMoreClick}>
        <Icon src={KebabIcon} />
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
