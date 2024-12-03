import styled from "styled-components";

export const FolderListContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1.75rem 1.25rem;
`;

export const AddFolderButton = styled.div`
  display: flex;
  width: 18.5625rem;
  height: 5rem;
  justify-content: center;
  align-items: center;
  gap: 0.25rem;
  border: 2px dashed #d1d1d1;
  border-radius: 0.5rem;
  cursor: pointer;

  svg {
    width: 2.375rem;
    height: 2.375rem;
    transition: fill 0.3s ease;
  }

  &:hover {
    background-color: #f5f5f5;
  }
`;

export const FolderItem = styled.div`
  display: flex;
  justify-content: space-between;
  width: 18.5625rem;
  padding-top: 1rem;
  padding-bottom: 1rem;
  height: 100%;
  background-color: #fff;
  border-radius: 0.75rem;
  border: 2px solid #f5f5f5;
  cursor: pointer;
`;

export const FolderContent = styled.div`
  display: flex;
  align-items: center;
  gap: 1.13rem;
  margin-left: 1.12rem;

  svg {
    width: 3rem;
    height: 3rem;
  }
`;

export const FolderName = styled.div`
  color: #1a1a1a;
  font-family: Pretendard;
  font-size: 1.25rem;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
`;

export const KebabIcon = styled.div`
  display: flex;
  align-items: center;
  margin-right: 1.06rem;
  cursor: pointer;

  svg {
    width: 2rem;
    height: 2rem;
  }
`;

export const MoreButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
  background: #f7f7f7;
  border: none;
  cursor: pointer;

  color: #747474;
  font-family: Pretendard;
  font-size: 0.9375rem;
  font-style: normal;
  font-weight: 600;
  line-height: normal;

  svg {
    width: 1.125rem;
    height: 1.125rem;
    transform: ${({ isExpanded }) => (isExpanded ? "rotate(0deg)" : "rotate(180deg)")};
  }

  &:hover {
    background-color: #e3e3e3;
  }
`;

export const CenteredButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 2rem;
`;
