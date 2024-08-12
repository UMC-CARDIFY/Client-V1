import { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import { ToolBarItem } from './style/ToolbarStyles';
import MoreOptions from '../ToolbarItem/MoreOptions/MoreOptions';

const MoreOptionsButton = ({ options }) => {
  const [isDropDownOpen, setIsDropDownOpen] = useState(false);
  const moreOptionsRef = useRef(null);
  const buttonRef = useRef(null);

  const toggleDropDown = () => {
    setIsDropDownOpen(!isDropDownOpen);
  };

  const handleClickOutside = (event) => {
    if (moreOptionsRef.current && !moreOptionsRef.current.contains(event.target)) {
      setIsDropDownOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <>
      <ToolBarItem onMouseDown={(e) => e.preventDefault()} onClick={toggleDropDown} ref={buttonRef}>
      <svg xmlns="http://www.w3.org/2000/svg" width="29" height="28" viewBox="0 0 29 28" fill="none">
          <path fillRule="evenodd" clipRule="evenodd" d="M20.1217 12.7747C20.4466 12.7747 20.7582 12.9037 20.9879 13.1335C21.2176 13.3632 21.3467 13.6748 21.3467 13.9997L21.3467 14.0078C21.3467 14.3327 21.2176 14.6443 20.9879 14.874C20.7582 15.1038 20.4466 15.2328 20.1217 15.2328L20.1135 15.2328C19.7886 15.2328 19.477 15.1038 19.2473 14.874C19.0176 14.6443 18.8885 14.3327 18.8885 14.0078L18.8885 13.9997C18.8885 13.6748 19.0176 13.3632 19.2473 13.1335C19.477 12.9037 19.7886 12.7747 20.1135 12.7747L20.1217 12.7747ZM14.405 12.7747C14.7299 12.7747 15.0415 12.9037 15.2712 13.1335C15.501 13.3632 15.63 13.6748 15.63 13.9997L15.63 14.0078C15.63 14.3327 15.501 14.6443 15.2712 14.874C15.0415 15.1038 14.7299 15.2328 14.405 15.2328L14.3968 15.2328C14.072 15.2328 13.7604 15.1038 13.5306 14.874C13.3009 14.6443 13.1718 14.3327 13.1718 14.0078L13.1718 13.9997C13.1718 13.6748 13.3009 13.3632 13.5306 13.1335C13.7604 12.9037 14.072 12.7747 14.3968 12.7747L14.405 12.7747ZM9.91334 13.9997C9.91334 13.6748 9.78428 13.3632 9.55455 13.1335C9.32482 12.9037 9.01324 12.7747 8.68834 12.7747L8.68018 12.7747C8.35529 12.7747 8.0437 12.9037 7.81397 13.1335C7.58424 13.3632 7.45518 13.6748 7.45518 13.9997L7.45518 14.0078C7.45518 14.3327 7.58424 14.6443 7.81397 14.874C8.0437 15.1038 8.35529 15.2328 8.68018 15.2328L8.68834 15.2328C9.01323 15.2328 9.32482 15.1038 9.55455 14.874C9.78428 14.6443 9.91334 14.3327 9.91334 14.0078L9.91334 13.9997Z" fill="#646464" />
        </svg>
      </ToolBarItem>
      {isDropDownOpen && (
        <MoreOptions 
          ref={moreOptionsRef} 
          options={options} 
          buttonRef={buttonRef}  // 버튼의 위치 정보를 전달
        />
      )}
    </>
  );
};

MoreOptionsButton.propTypes = {
  options: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      onClick: PropTypes.func.isRequired,
      icon: PropTypes.node.isRequired,
    })
  ).isRequired,
};

export default MoreOptionsButton;
