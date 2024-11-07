import styled from "styled-components";
import folderStar from "../../../../assets/folderStar.svg";
import folderNotStar from "../../../../assets/folderNotStar.svg";
import kebab from "../../../../assets/kebab.svg";
import FolderIcon from './FolderIcon';

const Folder = ({ name, color, mark }) => {
    return (
        <FolderDiv color={color}>
            <Star>
            <img src={mark ? folderStar : folderNotStar} alt="Star Icon" />
            </Star>
            <FolderOptionBtn>
                <img src={kebab} alt="Options Icon" />
            </FolderOptionBtn>
            <FolderIcon fill={color} />
            <FolderName>{name}</FolderName>
        </FolderDiv>
    );
};

export default Folder;

const FolderDiv = styled.div`
  width: 14.4375rem;
  max-width: 14.375rem;
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

const FolderName = styled.div`
  overflow: hidden;
  color: #1A1A1A;
  text-align: center;
  text-overflow: ellipsis;
  font-size: 1.25rem;
  font-weight: 600;
`;
