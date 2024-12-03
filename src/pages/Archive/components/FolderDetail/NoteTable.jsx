import PropTypes from "prop-types";
import {
  Table,
  TableHeadContainer,
  TableRowContainer,
  TableHeadRow,
  TableHead,
  TableRow,
  TableData,
  Divider,
  NoteIconContainer,
  FavoriteIconContainer,
  CheckboxContainer,
  FlashcardContainer,
} from "./NoteTable.style";
import { IcAchiveNote32, IcCommonStarGrey32, IcCommonFlashcard32 } from "@/assets/svg";

const NoteTable = ({ notes }) => {
  return (
    <Table>
      <TableHeadContainer>
        <TableHeadRow>
          <TableHead flex="1%">
            <FavoriteIconContainer>
              <IcCommonStarGrey32 style={{ visibility: "hidden" }} />
            </FavoriteIconContainer>
          </TableHead>
          <TableHead flex="1%">
            <CheckboxContainer>
              <input type="checkbox" />
            </CheckboxContainer>
          </TableHead>
          <TableHead flex="1%">
            <NoteIconContainer>
              <IcAchiveNote32 />
            </NoteIconContainer>
          </TableHead>
          <Divider />
          <TableHead flex="40%" align="left" withMargin>노트 이름</TableHead>
          <Divider />
          <TableHead flex="15%" align="left" withMargin>노트 생성일</TableHead>
          <Divider />
          <TableHead flex="15%" align="left" withMargin>최근 수정일</TableHead>
          <Divider />
          <TableHead flex="7%" align="left" withMargin>플래시 카드</TableHead>
        </TableHeadRow>
        <TableRow>
          <TableData colSpan="8">
            <div style={{ width: "100%", height: "0.0625rem", background: "#E8E8E8", marginTop: "1rem" }}></div>
          </TableData>
        </TableRow>
      </TableHeadContainer>

      {notes.map((note) => (
        <TableRowContainer key={note.noteId}>
          <TableRow>
            <TableData flex="1%">
              <FavoriteIconContainer>
                <IcCommonStarGrey32 />
              </FavoriteIconContainer>
            </TableData>
            <TableData flex="1%">
              <CheckboxContainer>
                <input type="checkbox" />
              </CheckboxContainer>
            </TableData>
            <TableData flex="1%">
              <NoteIconContainer>
                <IcAchiveNote32 />
              </NoteIconContainer>
            </TableData>
            <Divider />
            <TableData flex="40%" align="left" withMargin>{note.name}</TableData>
            <Divider />
            <TableData flex="15%" align="left" withMargin>{note.createdAt}</TableData>
            <Divider />
            <TableData flex="15%" align="left" withMargin>{note.updatedAt || "수정 없음"}</TableData>
            <Divider />
            <TableData flex="7%" align="left" withMargin>
            <FlashcardContainer>
                <IcCommonFlashcard32 style={{ width: "1.5rem", height: "1.5rem" }} />
                <span>{note.flashcardCount}</span>
                </FlashcardContainer>
            </TableData>
          </TableRow>
        </TableRowContainer>
      ))}
    </Table>
  );
};

NoteTable.propTypes = {
  notes: PropTypes.arrayOf(
    PropTypes.shape({
      noteId: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      createdAt: PropTypes.string.isRequired,
      updatedAt: PropTypes.string,
      flashcardCount: PropTypes.number.isRequired,
    })
  ).isRequired,
};

export default NoteTable;
