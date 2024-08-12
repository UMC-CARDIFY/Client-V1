import PropTypes from 'prop-types';
import { ToolBarItem } from './style/ToolbarStyles';

const MultiCardButton = ({ onClick }) => {
  return (
    <ToolBarItem onClick={onClick}>
      <svg xmlns="http://www.w3.org/2000/svg" width="22" height="18" viewBox="0 0 22 18" fill="none">
        <path fillRule="evenodd" clipRule="evenodd" d="M0.449219 6.16943C0.449219 5.89329 0.673076 5.66943 0.949219 5.66943H15.9601C16.2363 5.66943 16.4601 5.89329 16.4601 6.16943V16.9108C16.4601 17.1869 16.2363 17.4108 15.9601 17.4108H0.949218C0.673076 17.4108 0.449219 17.1869 0.449219 16.9108V6.16943ZM3.69727 9.94287C3.69727 9.66673 3.92112 9.44287 4.19727 9.44287H12.7132C12.9893 9.44287 13.2132 9.66673 13.2132 9.94287C13.2132 10.219 12.9893 10.4429 12.7132 10.4429H4.19727C3.92112 10.4429 3.69727 10.219 3.69727 9.94287ZM4.19727 12.6362C3.92112 12.6362 3.69727 12.86 3.69727 13.1362C3.69727 13.4123 3.92112 13.6362 4.19727 13.6362H9.51972C9.79586 13.6362 10.0197 13.4123 10.0197 13.1362C10.0197 12.86 9.79586 12.6362 9.51972 12.6362H4.19727Z" fill="#1A1A1A"/>
        <path fillRule="evenodd" clipRule="evenodd" d="M3.8129 5.66935L3.89559 4.09141L17.8873 4.82469L17.3775 14.5527L16.4602 14.5046V15.506L17.8245 15.5775C18.1002 15.5919 18.3355 15.3801 18.3499 15.1043L18.9121 4.37771C18.9265 4.10194 18.7147 3.86668 18.439 3.85223L3.44861 3.06662C3.17285 3.05216 2.93758 3.264 2.92313 3.53976L2.81152 5.66935H3.8129Z" fill="#1A1A1A"/>
        <path fillRule="evenodd" clipRule="evenodd" d="M6.40039 3.22621L6.56717 1.63941L20.5013 3.10395L19.4831 12.7919L18.4647 12.6849L18.4123 13.6849L19.8758 13.8387C20.1504 13.8676 20.3965 13.6683 20.4253 13.3937L21.5481 2.71122C21.577 2.43659 21.3777 2.19056 21.1031 2.16169L6.17444 0.592623C5.89981 0.563759 5.65378 0.76299 5.62491 1.03762L5.40039 3.1738L6.40039 3.22621Z" fill="#1A1A1A"/>
      </svg>
    </ToolBarItem>
  );
};

MultiCardButton.propTypes = {
  onClick: PropTypes.func.isRequired,
};

export default MultiCardButton;