import { useState } from 'react';
import PropTypes from 'prop-types';
import { ToolBarItem2, DropDownButton, DropDownMenu, DropDownItem, IconWrapper } from './style/ToolbarStyles';

const HeadingButton = ({ addHeading }) => {
  const [isDropDownOpen, setIsDropDownOpen] = useState(false);

  const toggleDropDown = () => {
    setIsDropDownOpen(!isDropDownOpen);
  };

  return (
    <ToolBarItem2>
      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="14" viewBox="0 0 18 14" fill="none">
        <path d="M17.7275 0.636719V13.3633H15.7764V2.57031H15.7061L12.665 4.55664V2.71094L15.8291 0.636719H17.7275Z" fill="#1A1A1A"/>
        <path d="M0.272461 13.3633V0.636719H2.20605V6.15625H8.53418V0.636719H10.4678V13.3633H8.53418V7.80859H2.20605V13.3633H0.272461Z" fill="#1A1A1A"/>
      </svg>
      <DropDownButton onClick={toggleDropDown} isActive={isDropDownOpen}>
        <svg xmlns="http://www.w3.org/2000/svg" width="12" height="32" viewBox="0 0 12 32" fill="none">
          <rect width="12" height="32" rx="4" fill={isDropDownOpen ? "#F2F4F8" : "transparent"}/>
          <path d="M2.79492 17.5L5.79492 14.5L8.79492 17.5" stroke={isDropDownOpen ? "#0F62FE" : "#CACACA"} strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </DropDownButton>
      {isDropDownOpen && (
        <DropDownMenu>
          <DropDownItem onClick={() => addHeading(1)}>
            <IconWrapper>
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="14" viewBox="0 0 18 14" fill="none">
                <path d="M17.7285 0.636719V13.3633H15.7773V2.57031H15.707L12.666 4.55664V2.71094L15.8301 0.636719H17.7285Z" fill="#1A1A1A"/>
                <path d="M0.273438 13.3633V0.636719H2.20703V6.15625H8.53516V0.636719H10.4688V13.3633H8.53516V7.80859H2.20703V13.3633H0.273438Z" fill="#1A1A1A"/>
              </svg>
            </IconWrapper>
            <span>Heading 1</span>
          </DropDownItem>
          <DropDownItem onClick={() => addHeading(2)}>
            <IconWrapper>
              <svg xmlns="http://www.w3.org/2000/svg" width="22" height="14" viewBox="0 0 22 14" fill="none">
                <path d="M13.004 13.3648V11.9773L17.3572 7.58944C18.7273 6.14994 19.4211 5.35215 19.4211 4.25952C19.4211 3.02814 18.4151 2.23035 17.0971 2.23035C15.7096 2.23035 14.8077 3.11486 14.8077 4.4503H13.004C12.9867 2.16098 14.7384 0.634766 17.1317 0.634766C19.5598 0.634766 21.2248 2.16098 21.2421 4.20749C21.2248 5.6123 20.5657 6.72227 18.207 9.04627L15.6576 11.6304V11.7345H21.4502V13.3648H13.004Z" fill="#1A1A1A"/>
                <path d="M0.550781 13.3642V0.807617H2.45855V6.25342H8.70214V0.807617H10.6099V13.3642H8.70214V7.88369H2.45855V13.3642H0.550781Z" fill="#1A1A1A"/>
              </svg>
            </IconWrapper>
            <span>Heading 2</span>
          </DropDownItem>
          <DropDownItem onClick={() => addHeading(3)}>
            <IconWrapper>
              <svg xmlns="http://www.w3.org/2000/svg" width="22" height="14" viewBox="0 0 22 14" fill="none">
                <path d="M17.1083 13.3648C14.5418 13.3648 12.711 11.9788 12.6426 9.95983H14.5589C14.6274 11.0549 15.7053 11.7393 17.0912 11.7393C18.5798 11.7393 19.6749 10.918 19.6749 9.72029C19.6749 8.50546 18.6483 7.61573 16.8859 7.61573H15.8251V6.07581H16.8859C18.2889 6.07581 19.2813 5.28874 19.2813 4.10814C19.2813 2.97887 18.4429 2.20891 17.1255 2.20891C15.8764 2.20891 14.7814 2.89331 14.73 4.02259H12.9163C12.9677 2.00358 14.8327 0.634766 17.1426 0.634766C19.5722 0.634766 21.1121 2.17469 21.095 4.00548C21.1121 5.40852 20.2395 6.43513 18.9049 6.76022V6.84577C20.5988 7.08532 21.5741 8.21459 21.5741 9.78873C21.5741 11.8591 19.6749 13.3648 17.1083 13.3648Z" fill="#1A1A1A"/>
                <path d="M0.425781 13.1935V0.805664H2.30791V6.17827H8.46758V0.805664H10.3497V13.1935H8.46758V7.78663H2.30791V13.1935H0.425781Z" fill="#1A1A1A"/>
              </svg>
            </IconWrapper>
            <span>Heading 3</span>
          </DropDownItem>
        </DropDownMenu>
      )}
    </ToolBarItem2>
  );
};

HeadingButton.propTypes = {
  addHeading: PropTypes.func.isRequired,
};

export default HeadingButton;
