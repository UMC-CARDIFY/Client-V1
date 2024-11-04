import styled from "styled-components";
import addFolderDefault from '../../../assets/addFolderDefault.png';
import addFolderHover from '../../../assets/addFolderHover.png';
import addFolderClick from '../../../assets/addFolderClick.png';

const DefaultFolder = () => {

    return (
        <Container>
            <Name>
                <p>name의 아카이브</p>
            </Name>
            <SortDiv>
                <p>정렬</p>
            </SortDiv>
            <FolderList>
                <AddFolder
                >
                    <img src={addFolderDefault} alt="Add Folder Icon" />
                </AddFolder>
                <Folder>
                    {/* 다른 폴더 콘텐츠 */}
                </Folder>
                {/* 추가 Folder 컴포넌트들 */}
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

const SortDiv = styled.div``;

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
    transition: all 0.3s ease;
  }

  /* hover 시 이미지를 addFolderHover로 변경 */
  &:hover img {
    content: url(${addFolderHover});
  }
`;

const Folder = styled.div`
  width: 14.4375rem;
  height: 14.375rem;
  flex-shrink: 0;
  border-radius: 0.676rem;
  border: 2px solid #F5F5F5;
`;
