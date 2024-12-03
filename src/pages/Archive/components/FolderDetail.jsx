import { useParams, useNavigate } from "react-router-dom";
import {
  Divider,
  Container,
  FolderSection,
  SectionTitle,
  BtnWrapper,
  NoteSection,
} from "./FolderDetail.style";
import FolderDetailHeader from "../components/FolderDetail/FolderDetailHeader";
import dummyData from "../dummyData";
import noteDummyData from "../noteDummyData";
import SortButton from "../components/common/SortButton/SortButton";
import FilterButton from "../components/common/FilterButton/FilterButton";
import FolderList from "../components/FolderDetail/FolderList";
import NoteTable from "../components/FolderDetail/NoteTable";

const FolderDetail = () => {
  const { folderId } = useParams();
  const navigate = useNavigate();

  // 현재 폴더 데이터 찾기
  const folderData = dummyData.find((folder) => folder.folderId === Number(folderId));

  // 해당 parent_folderId를 기준으로 하위 폴더 필터링
  const childFolders = dummyData.filter((folder) => folder.parent_folderId === Number(folderId));

  // 노트 데이터 필터링
  const notes = noteDummyData.filter((note) => note.parent_folderId === Number(folderId));

  const handleBackClick = () => {
    navigate(-1);
  };

  return (
    <Container>
      <FolderDetailHeader
        folderName={folderData ? folderData.name : "폴더 없음"}
        onBackClick={handleBackClick}
        folderColor={folderData ? folderData.color : "#C4C4C4"}
        isStarred={folderData ? folderData.mark : false}
      />
      <Divider />
      <FolderSection>
        <SectionTitle>폴더</SectionTitle>
        <BtnWrapper>
          <SortButton label="최근 수정일 순" />
        </BtnWrapper>
        <FolderList childFolders={childFolders} />
      </FolderSection>
      <Divider />
      <NoteSection>
        <SectionTitle>노트</SectionTitle>
        <BtnWrapper>
          <SortButton label="최근 수정일 순" />
          <FilterButton label="필터링" />
        </BtnWrapper>
        <NoteTable notes={notes} />
      </NoteSection>
    </Container>
  );
};

export default FolderDetail;
