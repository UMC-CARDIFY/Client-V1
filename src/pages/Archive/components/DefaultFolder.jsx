import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { SortIconArchive, FilterIconArchive, AddFolderDefault } from "@/assets/svg";
import Folder from "./Folder/Folder";
import dummyData from "../dummyData";
import { useState } from "react";

const DefaultFolder = () => {
    const [addFolderState, setAddFolderState] = useState("default");
    const navigate = useNavigate();
  
    const handleFolderClick = (folderId) => {
        navigate(`/archive/folder/${folderId}`);
    };

    return (
        <Container>
            <Name>
                <p>name의 아카이브</p>
            </Name>
            <SortAndFilterDiv>
                <Sort>
                    <SortIconArchive />
                    최근 수정일 순
                </Sort>
                <Filtering>
                    <FilterIconArchive />
                    필터링
                </Filtering>
            </SortAndFilterDiv>
            <FolderList>
                <AddFolder
                    onMouseEnter={() => setAddFolderState("hover")}
                    onMouseLeave={() => setAddFolderState("default")}
                    onMouseDown={() => setAddFolderState("click")}
                    onMouseUp={() => setAddFolderState("hover")}
                >
                    <StyledIcon addFolderState={addFolderState}>
                        <AddFolderDefault />
                    </StyledIcon>
                </AddFolder>

                {dummyData.map((folder) => (
                    <Folder
                        key={folder.folderId}
                        {...folder}
                        onClick={() => handleFolderClick(folder.folderId)}
                    />
                ))}
            </FolderList>
        </Container>
    );
};

export default DefaultFolder;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin: 4.5rem 5rem 8rem 5rem; 
  padding: 0;
  box-sizing: border-box;
`;

const Name = styled.div`
  p {
    height: 100%;
    padding: 0;
    margin: 0;
    margin-bottom: 3rem;
    color: #1A1A1A;
    font-size: 2rem;
    font-weight: 600;
  }
`;

const FolderList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 2rem;
  width: 100%;
  box-sizing: border-box;
`;

const AddFolder = styled.div`
  width: 14.375rem;
  height: 14.375rem;
  cursor: pointer;
`;

const StyledIcon = styled.div`
  transition: opacity 0.5s ease;
  opacity: ${({ addFolderState }) => 
    addFolderState === "default" ? "1" : 
    addFolderState === "hover" ? "0.7" : "0.4"};

  svg {
    fill-opacity: ${({ addFolderState }) => 
      addFolderState === "default" ? "1" : 
      addFolderState === "hover" ? "0.03" : "0.06"};
    fill: ${({ addFolderState }) => 
      addFolderState === "default" ? "none" : "black"};
  }
`;

const SortAndFilterDiv = styled.div`
  display: flex;
  gap: 1rem;
  color: #1A1A1A;
  font-size: 1.125rem;
  font-weight: 600;
  margin-bottom: 2rem;
`;

const Sort = styled.div`
  display: inline-flex;
  padding: 0.75rem 1.25rem;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  border-radius: 0.75rem;
  background: #F5F5F5;
  cursor: pointer;
  &:hover {
    color: #1062FE;
  }
  &:active {
    background: #E3E3E3;
  }
`;

const Filtering = styled(Sort)`
  gap: 0.5rem;
`;
