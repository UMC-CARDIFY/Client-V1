import PropTypes from "prop-types";
import { useState } from "react";
import {
  FolderListContainer,
  AddFolderButton,
  FolderItem,
  FolderContent,
  FolderName,
  KebabIcon,
  MoreButton,
  CenteredButtonWrapper, 
} from "./FolderList.style";
import { IcArchiveInnerfolder48, IcCommonKebab32, IcArchiveAddFolder38, IcArchiveMoreButtonArrow } from "@/assets/svg";

const FolderList = ({ childFolders, maxVisible }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  // 현재 표시할 폴더들
  const visibleFolders = isExpanded ? childFolders : childFolders.slice(0, maxVisible);

  return (
    <>
      <FolderListContainer>
        {/* 폴더 추가 버튼 */}
        <AddFolderButton>
          <IcArchiveAddFolder38 />
        </AddFolderButton>

        {/* 하위 폴더 렌더링 */}
        {visibleFolders.map((folder) => (
          <FolderItem key={folder.folderId}>
            <FolderContent>
              <IcArchiveInnerfolder48 fill={folder.color} />
              <FolderName>{folder.name}</FolderName>
            </FolderContent>
            <KebabIcon>
              <IcCommonKebab32 />
            </KebabIcon>
          </FolderItem>
        ))}
      </FolderListContainer>

      {/* 더보기/접기 버튼 */}
      {childFolders.length > maxVisible && (
        <CenteredButtonWrapper>
          <MoreButton isExpanded={isExpanded} onClick={() => setIsExpanded(!isExpanded)}>
            <IcArchiveMoreButtonArrow
              style={{ transform: isExpanded ? "rotate(0deg)" : "rotate(180deg)" }}
            />
            {isExpanded ? "접기" : "더보기"}
          </MoreButton>
        </CenteredButtonWrapper>
      )}
    </>
  );
};

FolderList.propTypes = {
  childFolders: PropTypes.arrayOf(
    PropTypes.shape({
      folderId: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      color: PropTypes.string.isRequired,
    })
  ).isRequired,
  maxVisible: PropTypes.number,
};

FolderList.defaultProps = {
  maxVisible: 4,
};

export default FolderList;
