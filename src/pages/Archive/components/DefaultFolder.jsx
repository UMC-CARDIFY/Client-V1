import styled from "styled-components";
import addFolderDefault from '../../../assets/addFolderDefault.png';
import addFolderHover from '../../../assets/addFolderHover.png';
import addFolderClick from '../../../assets/addFolderClick.png';
import sortIconArchive from "../../../assets/sortIconArchive.svg";
import filterIconArchive from "../../../assets/filterIconArchive.svg";
import Folder from "./Folder/Folder";
import dummyData from "../dummyData";

const DefaultFolder = () => {

    return (
        <Container>
            <Name>
                <p>name의 아카이브</p>
            </Name>
            <SortAndFilterDiv>
                <Sort>
                <img src={sortIconArchive} />
                최근 수정일 순
                </Sort>
                <Filtering>
                <img src={filterIconArchive} />
                필터링
                </Filtering>
            </SortAndFilterDiv>
            <FolderList>
                <AddFolder>
                    <img src={addFolderDefault} alt="Add Folder Icon" />
                </AddFolder>

                {dummyData.map((folder) => (
                    <Folder 
                        key={folder.folderId}
                        name={folder.name}
                        color={folder.color}
                        createdAt={folder.createdAt}
                        mark={folder.mark}
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
  background: #fff;
  padding: 0rem 5rem 8rem 5rem;
  margin: 0;
  box-sizing: border-box;
`;

const Name = styled.div`
  p {
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

  & > div {
    flex: 1 1 calc(20% - 2rem);
    max-width: calc(20% - 2rem);
  }
`;

const AddFolder = styled.div`
  width: 14.375rem;
  height: 14.375rem;
  cursor: pointer;

  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }

  &:hover img {
    content: url(${addFolderHover});
  }
  &:active img {
    content: url(${addFolderClick});
  }
`;

const SortAndFilterDiv = styled.div`
  display:flex;
  gap:1rem;
  color: #1A1A1A;
  font-size: 1.125rem;
  font-weight: 600;
  margin-bottom:2rem;
`

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
  img {
    width: 1.25rem;
    height: 1.25rem;
  }
`

const Filtering  = styled(Sort)`
  gap: 0.5rem;
`