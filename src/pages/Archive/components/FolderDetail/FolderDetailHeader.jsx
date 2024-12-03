import PropTypes from "prop-types";
import {
  HeaderContainer,
  HeaderRow,
  BackButton,
  Title,
  FolderInfoContainer,
  FolderIcon,
  StarIcon,
  FolderName,
} from "./FolderDetailHeader.style";
import { IcArchiveBackHeader, IcCommonStarGrey32 } from "@/assets/svg";

const FolderDetailHeader = ({
  folderName = "폴더 없음",
  onBackClick,
  isStarred = false,
  folderColor = "#C4C4C4",
}) => {
  return (
    <HeaderContainer>
      <HeaderRow>
        <BackButton onClick={onBackClick}>
          <IcArchiveBackHeader />
        </BackButton>
        <Title>사용자의 아카이브</Title>
      </HeaderRow>
      <FolderInfoContainer>
        <StarIcon>
          <IcCommonStarGrey32
            fill={isStarred ? "#FFD700" : "none"}
            stroke={isStarred ? "#FFD700" : "#B1B1B1"}
          />
        </StarIcon>
        <FolderIcon folderColor={folderColor} />
        <FolderName>{folderName}</FolderName>
      </FolderInfoContainer>
    </HeaderContainer>
  );
};

FolderDetailHeader.propTypes = {
  folderName: PropTypes.string,
  onBackClick: PropTypes.func.isRequired,
  isStarred: PropTypes.bool,
  folderColor: PropTypes.string,
};

export default FolderDetailHeader;
