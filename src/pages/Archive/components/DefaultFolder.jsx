import styled from "styled-components";
import addFolderDefault from '../../../assets/addFolderDefault.png';
import addFolderHover from '../../../assets/addFolderHover.png';
import addFolderClick from '../../../assets/addFolderClick.png';
import folderStar from "../../../assets/folderStar.svg";
import kebab from "../../../assets/kebab.svg";
import folder from "../../../assets/folderBig.svg";

const DefaultFolder = () => {

    return (
        <Container>
            <Name>
                <p>name의 아카이브</p>
            </Name>
            <SortAndFilterDiv>
                <Sort>
                최근 수정일 순
                </Sort>
                <Filtering>
                필터링
                </Filtering>
            </SortAndFilterDiv>
            <FolderList>
                <AddFolder
                >
                    <img src={addFolderDefault} alt="Add Folder Icon" />
                </AddFolder>
                <Folder>
                    <Star>
                        <img src={folderStar}/>
                    </Star>
                    <FolderOptionBtn>
                    <img src={kebab}/>
                    </FolderOptionBtn>
                    <FolderIcon>
                    <img src={folder} />
                    </FolderIcon>
                    <FolderName>
                        한국사
                    </FolderName>
                </Folder>
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


const Folder = styled.div`
  width: 14.4375rem;
  height: 14.375rem;
  flex-shrink: 0;
  border-radius: 0.676rem;
  border: 2px solid #F5F5F5;
  position: relative;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.94rem; /* FolderIcon과 FolderName 사이의 간격 */
`;

const Star = styled.div`
position: absolute;
left:1rem;
top:1rem;
width: 1.5rem;
height: 1.5rem;
flex-shrink: 0;
`;

const FolderOptionBtn = styled.div`
position: absolute;
right:1rem;
top:1rem;
width: 1.5rem;
height: 1.5rem;
flex-shrink: 0;
`;

const FolderIcon = styled.div`
  width: 4.5rem;
  height: 4.5rem;
  flex-shrink: 0;

  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
`;

const FolderName = styled.div`
  overflow: hidden;
  color: #1A1A1A;
  text-align: center;
  text-overflow: ellipsis;
  font-size: 1.25rem;
  font-weight: 600;
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
`

const Filtering  = styled(Sort)`
gap: 0.5rem;
`