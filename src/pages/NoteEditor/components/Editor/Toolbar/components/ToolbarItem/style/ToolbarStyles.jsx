import styled from 'styled-components';

export const ToolBarContainer = styled.div`
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

export const ToolBarItem = styled.div`
  display: flex;
  width: 2rem;
  height: 2rem;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;

export const ToolBarItem2 = styled.div`
  display: flex;
  width: auto;
  height: 2rem;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;

export const DropDownButton = styled.div`
  margin-left: 0.58rem;
  width: 0.75rem;
  height: 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  border-radius: 0.25rem;
  background-color: ${({ isActive }) =>
    isActive ? 'var(--Main-BackGround, #F2F4F8)' : 'transparent'};

  &:hover {
    background-color: ${({ isActive }) =>
      isActive ? 'var(--Main-BackGround, #F2F4F8)' : 'var(--Grays-Gray7, #F0F0F0)'};

    svg {
      rect {
        fill: ${({ isActive }) => (isActive ? '#F2F4F8' : '#F0F0F0')};
      }
      path {
        stroke: ${({ isActive }) => (isActive ? '#0F62FE' : '#B1B1B1')};
      }
    }
  }

  svg {
    rect {
      fill: ${({ isActive }) => (isActive ? '#F2F4F8' : 'transparent')};
    }
    path {
      stroke: ${({ isActive }) => (isActive ? '#0F62FE' : '#CACACA')};
    }
  }
`;

export const DropDownMenu = styled.div`
  position: absolute;
  margin-top: -13.5rem;
  left: 39%;
  transform: translateX(-50%);
  z-index: 10;
  border-radius: 0.375rem;
  display: flex;  
  flex-direction: column;

  display: flex;
  width: 8.5rem;
  padding: var(--UI-Component-None, 0.5rem) var(--UI-Component-None, 0.4375rem);
  justify-content: center;
  align-items: flex-start;
  gap: var(--UI-Component-None, 0.25rem);
  border-radius: 0.25rem;
  background: var(--Grays-White, #FFF);

  box-shadow: 0px 4px 26px 0px rgba(0, 0, 0, 0.02), 0px 10px 60px 0px rgba(0, 74, 162, 0.03);
`;

export const DropDownItem = styled.div`
  display: flex;
  padding: var(--UI-Component-None, 0rem) 0.5rem;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
  border-radius: 0.25rem;

  &:hover {
    background: var(--Grays-Gray7, #F0F0F0);
  }
`;

export const IconWrapper = styled.div`
  display: flex;
  width: 2rem;
  height: 2rem;
  padding: var(--UI-Component-xxxxxS, 0.25rem) var(--UI-Component-None, 0rem);
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
`;

export const Divider = styled.div`
  width: 0.0625rem;
  height: 2rem;
  background: #E8E8E8;
`;

export const ColorPaletteItem = styled.div`
  display: flex;
  width: auto;
  height: 2rem;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;

export const ColorDropDownButton = styled(DropDownButton)`
  margin-left: 0.38rem;
`;