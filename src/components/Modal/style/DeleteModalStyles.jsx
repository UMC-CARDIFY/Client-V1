import styled from 'styled-components';

export const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;
`;

export const ModalContent = styled.div`
  display: flex;
  width: 29.5rem;
  padding: 2rem 2rem 1.5rem 2rem;
  flex-direction: column;
  background: var(--Grays-White, #FFF);
  border-radius: 0.5rem;
  box-shadow: 0px 4px 26px 0px rgba(0, 0, 0, 0.02), 0px 10px 60px 0px rgba(0, 74, 162, 0.03);
  z-index: 1000;
`;

export const Title = styled.div`
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
  color: var(--Semantic-Alert, #EA1215);
  font-family: Pretendard;
  font-size: 1.25rem;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
  margin-bottom: 1rem;
`;

export const Description = styled.p`
  margin: 0;
  margin-bottom: 0.25rem;
  padding: 0;
  color: var(--Grays-Black, #1A1A1A);
  font-family: Pretendard;
  font-size: 1rem;
  font-style: normal;
  font-weight: 300;
  line-height: normal;
`;

export const ButtonGroup = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 1.25rem;
`;

export const Button = styled.button`
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 0.25rem;
  cursor: pointer;
  background: #fff;
  color: var(--Grays-Black, #1A1A1A);
  font-family: Pretendard;
  font-size: 1rem;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  &:hover {
    background: var(--Grays-Gray7, #F0F0F0);  
  }
`;