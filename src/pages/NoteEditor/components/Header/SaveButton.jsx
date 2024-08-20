import PropTypes from 'prop-types';
import styled from 'styled-components';

const SaveButtonWrapper = styled.button`
  display: inline-flex;
  padding: var(--UI-Component-xxxxxS, 0.25rem) 0.75rem;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
  border-radius: 0.5rem;
  background: var(--Main-BackGround, #F2F4F8);
  border: none;
  cursor: pointer;
  margin-left: 1rem;

  span {
    color: var(--Semantic-Acitve, #699BF7);
    text-align: right;
    font-family: Pretendard;
    font-size: 0.9375rem;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
  }
`;

const SaveButton = ({ onSave }) => {
    return (
      <SaveButtonWrapper onClick={onSave}>
        <span>저장하기</span>
      </SaveButtonWrapper>
    );
  };
  
  SaveButton.propTypes = {
    onSave: PropTypes.func.isRequired,
  };
  
  export default SaveButton;