import PropTypes from "prop-types";
import { FilterIconArchive } from "@/assets/svg";
import { StyledFilterButton } from "./FilterButton.style";

const FilterButton = ({ label = "필터링", onClick = () => {} }) => {
  return (
    <StyledFilterButton onClick={onClick}>
      <FilterIconArchive />
      {label}
    </StyledFilterButton>
  );
};

FilterButton.propTypes = {
  label: PropTypes.string,
  onClick: PropTypes.func,
};

export default FilterButton;
