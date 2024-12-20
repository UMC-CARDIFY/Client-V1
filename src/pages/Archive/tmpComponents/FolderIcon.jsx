import PropTypes from 'prop-types';

const FolderIcon = ({ width = "40", height = "40", fill = "#6698F5" }) => (
  <svg
    width={width}
    height={height}
    viewBox="0 0 40 40"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M8 32C7.175 32 6.469 31.7065 5.882 31.1195C5.295 30.5325 5.001 29.826 5 29V11C5 10.175 5.294 9.469 5.882 8.882C6.47 8.295 7.176 8.001 8 8H17L20 11H32C32.825 11 33.5315 11.294 34.1195 11.882C34.7075 12.47 35.001 13.176 35 14V29C35 29.825 34.7065 30.5315 34.1195 31.1195C33.5325 31.7075 32.826 32.001 32 32H8Z"
      fill={fill}
    />
  </svg>
);

FolderIcon.propTypes = {
  width: PropTypes.string,
  height: PropTypes.string,
  fill: PropTypes.string
};

export default FolderIcon;
