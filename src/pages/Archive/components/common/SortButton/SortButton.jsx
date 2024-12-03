import PropTypes from "prop-types";
import { SortIconArchive } from "@/assets/svg";
import { StyledSortButton } from "./SortButton.style";

const SortButton = ({ label = "정렬", onClick = () => {} }) => {
  return (
    <StyledSortButton onClick={onClick}>
      <SortIconArchive />
      {label}
    </StyledSortButton>
  );
};

SortButton.propTypes = {
  label: PropTypes.string,
  onClick: PropTypes.func,
};

export default SortButton;
