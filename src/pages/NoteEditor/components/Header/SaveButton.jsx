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
  opacity: ${({ isVisible }) => (isVisible ? 1 : 0)};
  transition: opacity 0.3s ease-in-out;

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

const SaveButton = ({ isVisible, onSave }) => {
    return (
      <SaveButtonWrapper isVisible={isVisible} onClick={onSave}>
        <span>저장하기</span>
      </SaveButtonWrapper>
    );
  };
  
  SaveButton.propTypes = {
    isVisible: PropTypes.bool.isRequired,
    onSave: PropTypes.func.isRequired,
  };
  
  export default SaveButton;