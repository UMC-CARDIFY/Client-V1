import styled from "styled-components";
import { FolderIcon, FolderStar, Kebab } from "@/assets/svg";

const Folder = ({ name, color, mark, onClick }) => {
    return (
        <FolderDiv color={color} onClick={onClick}> {/* onClick 추가 */}
            <Star>
              {!mark ? <FolderStar stroke='#B1B1B1'/> : <FolderStar fill='#FFD338' />}
            </Star>
            <FolderOptionBtn>
                <Kebab />
            </FolderOptionBtn>
            <StyledFolderIcon width='72' height='72' color={color} />
            <FolderName>{name}</FolderName>
        </FolderDiv>
    );
};

export default Folder;

const StyledFolderIcon = styled(FolderIcon)`
  path {
    fill: ${({ color }) => color};
  }
`;

const FolderDiv = styled.div`
  width: 14.375rem;
  max-width: 14.375rem;
  height: 14.375rem;
  flex-shrink: 0;
  border-radius: 0.676rem;
  border: 2px solid #F5F5F5;
  box-sizing: border-box;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.94rem;
  cursor: pointer; /* 클릭 가능하도록 설정 */
  &:hover {
    background-color: #f9f9f9; /* 시각적 피드백 추가 */
  }
`;

const Star = styled.div`
  position: absolute;
  left: 1rem;
  top: 1rem;
  width: 1.5rem;
  height: 1.5rem;
  flex-shrink: 0;
`;

const FolderOptionBtn = styled.div`
  position: absolute;
  right: 1rem;
  top: 1rem;
  width: 2rem;
  height: 2rem;
  flex-shrink: 0;
`;

const FolderName = styled.div`
  overflow: hidden;
  color: #1A1A1A;
  text-align: center;
  text-overflow: ellipsis;
  font-size: 1.25rem;
  font-weight: 400;
`;
