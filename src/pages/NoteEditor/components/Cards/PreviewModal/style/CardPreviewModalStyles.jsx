import styled from 'styled-components';

export const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: var(--Main-Overlay, rgba(0, 0, 0, 0.30));
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 999;
`;

export const ModalContainer = styled.div`
  width: 55.625rem;
  height: 34.25rem;
  flex-shrink: 0;
  border-radius: 0.75rem;
  background: var(--Grays-White, #FFF);
  box-shadow: 0px 4px 26px 0px rgba(0, 0, 0, 0.02), 0px 10px 60px 0px rgba(0, 74, 162, 0.03);
  display: flex;
  flex-direction: column;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 1000;
  padding: 2rem 3rem;
`;

export const ModalHeader = styled.div`
  flex: 0 0 auto;
  font-weight: bold;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const ModalContent = styled.div`
  flex: 1 1 auto;
  overflow-y: auto;
  font-family: Pretendard;
  font-size: 1.25rem;
  font-style: normal;
  font-weight: 300;
  line-height: normal;
  padding: 2.75rem 2rem;
`;

export const PreviewTitle = styled.p`
  color: var(--Main-Primary, #0F62FE);
  font-family: Pretendard;
  font-size: 0.9375rem;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
`;

export const CloseButton = styled.button`
  width: 2.5rem;
  height: 2.5rem;
  flex-shrink: 0;
  padding: 0;
  background: none;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;

  svg {
    width: 100%;
    height: 100%;
  }
`;

export const PreviewIcon = styled.div`
  display: flex;
  width: 1.6875rem;
  height: 1.6875rem;
  justify-content: center;
  align-items: center;
  margin-right: 0.5rem;

  svg {
    width: 100%;
    height: 100%;
  }
`;

export const CardContent = styled.div`
  display: flex;
  align-items: center;
`;

export const CardFront = styled.div`
  text-align: center;
`;

export const CardBack = styled(CardFront)`
  position: relative;
  padding: 0 1rem;
`;

export const HighlightedAnswer = styled.span`
  background-color: #CDDDFF;
  color: #CDDDFF;
  border-radius: 0.125rem;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  opacity: ${(props) => (props.isClicked || props.isHovered ? 0 : 1)};
  cursor: pointer;
  transition: opacity 0.3s ease;
`;

export const ArrowIcon = styled.div`
  display: flex;
  width: 1.1875rem;
  height: 1.1875rem;
  margin: 0.25rem 0.75rem;
  align-items: center;
  justify-content: center;

  svg {
    width: 100%;
    height: 100%;
  }
`;
