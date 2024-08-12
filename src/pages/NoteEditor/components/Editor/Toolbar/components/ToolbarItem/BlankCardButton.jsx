import PropTypes from 'prop-types';
import { ToolBarItem } from './style/ToolbarStyles';

const BlankCardButton = ({ onClick }) => {
  return (
    <ToolBarItem onClick={onClick}>
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="16" viewBox="0 0 20 16" fill="none">
        <mask id="path-1-inside-1_2534_6003" fill="white">
          <rect x="10" y="0.5" width="10" height="15" rx="0.625"/>
        </mask>
        <rect x="10" y="0.5" width="10" height="15" rx="0.625" stroke="#1A1A1A" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" mask="url(#path-1-inside-1_2534_6003)"/>
        <path d="M11.875 5.37793H11.25V6.62793H11.875V5.37793ZM15.9476 6.62793C16.2928 6.62793 16.5726 6.34811 16.5726 6.00293C16.5726 5.65775 16.2928 5.37793 15.9476 5.37793V6.62793ZM11.875 6.62793H15.9476V5.37793H11.875V6.62793Z" fill="#1A1A1A"/>
        <path d="M11.875 9.37012H11.25V10.6201H11.875V9.37012ZM14.4204 10.6201C14.7656 10.6201 15.0454 10.3403 15.0454 9.99512C15.0454 9.64994 14.7656 9.37012 14.4204 9.37012V10.6201ZM11.875 10.6201H14.4204V9.37012H11.875V10.6201Z" fill="#1A1A1A"/>
        <path fillRule="evenodd" clipRule="evenodd" d="M0 1.125C0 0.779822 0.279822 0.5 0.625 0.5H10.625C10.9702 0.5 11.25 0.779822 11.25 1.125V14.875C11.25 15.2202 10.9702 15.5 10.625 15.5H0.625C0.279822 15.5 0 15.2202 0 14.875V1.125ZM5.09115 9.7589H6.30642V11.0349H5.09115V9.7589ZM4.72873 6.82335C4.72873 6.35683 5.12005 5.80252 5.70095 5.80252C6.28623 5.80252 6.67318 6.33845 6.67318 6.82335C6.67318 7.08009 6.54776 7.198 6.14332 7.50884L6.14186 7.50986L6.14174 7.50995C5.7791 7.78813 5.21484 8.22097 5.21484 9.12022H6.18707C6.18707 8.77467 6.34991 8.6144 6.71693 8.33265L6.77332 8.28978C7.10679 8.03712 7.6454 7.62879 7.6454 6.82335C7.6454 5.875 6.91429 4.78168 5.70095 4.78168C4.48373 4.78168 3.75651 5.90358 3.75651 6.82335H4.72873Z" fill="#1A1A1A"/>
      </svg>
    </ToolBarItem>
  );
};

BlankCardButton.propTypes = {
  onClick: PropTypes.func.isRequired,
};

export default BlankCardButton;
