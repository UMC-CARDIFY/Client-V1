import styled from "styled-components";
import { IcArchiveFolder64 } from "@/assets/svg";

export const HeaderContainer = styled.header`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

export const HeaderRow = styled.div`
  display: flex;
  align-items: center;
  gap: 2rem;
`;

export const BackButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;

  svg {
    width: 2.75rem;
    height: 2.75rem;
  }
`;

export const Title = styled.h1`
  color: #787878;
  font-family: Pretendard;
  font-size: 1.5rem;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
`;

export const FolderInfoContainer = styled.div`
  display: flex;
  align-items: center;
`;

export const FolderIcon = styled(IcArchiveFolder64)`
  width: 4rem;
  height: 4rem;
  margin-right: 1.5rem;
`;

export const StarIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 0.5rem;

  svg {
    width: 2rem;
    height: 2rem;
  }
`;

export const FolderName = styled.h2`
  color: #1A1A1A;
  font-family: Pretendard;
  font-size: 2rem;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
`;
