import PropTypes from "prop-types";

const SvgIcArchiveFolder64 = ({ folderColor = "#C4C4C4", ...props }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 64 64"
      {...props}
    >
      <path
        d="M12.8 51.2q-1.98 0-3.389-1.409T8 46.4V17.6q0-1.98 1.411-3.389 1.411-1.41 3.389-1.411h14.4l4.8 4.8h19.2q1.98 0 3.391 1.411Q56.002 20.421 56 22.4v24q0 1.98-1.409 3.391-1.409 1.41-3.391 1.409z"
        fill={folderColor}
      />
    </svg>
  );
};

SvgIcArchiveFolder64.propTypes = {
  folderColor: PropTypes.string,
};

export default SvgIcArchiveFolder64;
