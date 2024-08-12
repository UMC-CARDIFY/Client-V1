import PropTypes from 'prop-types';
import { ToolBarItem } from './style/ToolbarStyles';

const BoldButton = ({ toggleBold }) => {
  return (
    <ToolBarItem onClick={toggleBold}>
      <svg xmlns="http://www.w3.org/2000/svg" width="10" height="14" viewBox="0 0 10 14" fill="none">
        <path d="M0.104492 13.3633V0.636719H5.16699C7.97949 0.636719 9.38574 1.99023 9.38574 3.90625C9.38574 5.40039 8.41895 6.33203 7.10059 6.63086V6.75391C8.54199 6.82422 9.89551 7.9668 9.89551 9.84766C9.89551 11.8691 8.38379 13.3633 5.50098 13.3633H0.104492ZM4.97363 11.1836C6.50293 11.1836 7.15332 10.5508 7.15332 9.60156C7.15332 8.5293 6.34473 7.77344 5.04395 7.77344H2.74121V11.1836H4.97363ZM4.78027 5.96289C5.8877 5.96289 6.71387 5.34766 6.71387 4.32812C6.71387 3.41406 6.0459 2.78125 4.83301 2.78125H2.74121V5.96289H4.78027Z" fill="#1A1A1A"/>
      </svg>
    </ToolBarItem>
  );
};

BoldButton.propTypes = {
  toggleBold: PropTypes.func.isRequired,
};

export default BoldButton;
