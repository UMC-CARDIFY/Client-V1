import PropTypes from 'prop-types';

const FolderIcon = ({ width = "72", height = "72", fill = "#6698F5" }) => (
  <svg
    width={width}
    height={height}
    viewBox="0 0 72 72"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M14.4 57.6C12.915 57.6 11.6442 57.0717 10.5876 56.0151C9.531 54.9585 9.0018 53.6868 9 52.2V19.8C9 18.315 9.5292 17.0442 10.5876 15.9876C11.646 14.931 12.9168 14.4018 14.4 14.4H30.6L36 19.8H57.6C59.085 19.8 60.3567 20.3292 61.4151 21.3876C62.4735 22.446 63.0018 23.7168 63 25.2V52.2C63 53.685 62.4717 54.9567 61.4151 56.0151C60.3585 57.0735 59.0868 57.6018 57.6 57.6H14.4Z" 
      fill={fill}/>
  </svg>
);

FolderIcon.propTypes = {
  width: PropTypes.string,
  height: PropTypes.string,
  fill: PropTypes.string
};

export default FolderIcon;
