import PropTypes from 'prop-types';

const FolderIcon = ({ color }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="25"
    viewBox="0 0 24 25"
    fill="none"
  >
    <path
      d="M4.8 19.7C4.305 19.7 3.8814 19.5239 3.5292 19.1717C3.177 18.8195 3.0006 18.3956 3 17.9V7.10005C3 6.60505 3.1764 6.18145 3.5292 5.82925C3.882 5.47705 4.3056 5.30065 4.8 5.30005H10.2L12 7.10005H19.2C19.695 7.10005 20.1189 7.27645 20.4717 7.62925C20.8245 7.98205 21.0006 8.40565 21 8.90005V17.9C21 18.395 20.8239 18.8189 20.4717 19.1717C20.1195 19.5245 19.6956 19.7006 19.2 19.7H4.8Z"
      fill={color} // Dynamic color fill based on prop
    />
  </svg>
);

FolderIcon.propTypes = {
  color: PropTypes.string.isRequired,
};

export default FolderIcon;
