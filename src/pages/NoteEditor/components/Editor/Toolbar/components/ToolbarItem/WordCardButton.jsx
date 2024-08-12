import PropTypes from 'prop-types';
import { ToolBarItem } from './style/ToolbarStyles';

const WordCardButton = ({ onClick }) => {
  return (
    <ToolBarItem onClick={onClick}>
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="16" viewBox="0 0 20 16" fill="none">
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M0.21875 4.2251C0.21875 3.94896 0.442608 3.7251 0.71875 3.7251H15.7597C16.0358 3.7251 16.2597 3.94896 16.2597 4.2251V15.2551C16.2597 15.5312 16.0358 15.7551 15.7597 15.7551H0.71875C0.442608 15.7551 0.21875 15.5312 0.21875 15.2551V4.2251ZM1.21875 4.7251V14.7551H15.2597V4.7251H1.21875Z"
          fill="#1A1A1A"
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M0.71875 4.22559H15.7597V15.2556H0.71875V4.22559ZM3.5 8.5C3.5 8.22386 3.72386 8 4 8H12.5159C12.7921 8 13.0159 8.22386 13.0159 8.5C13.0159 8.77614 12.7921 9 12.5159 9H4C3.72386 9 3.5 8.77614 3.5 8.5ZM4 11.1933C3.72386 11.1933 3.5 11.4172 3.5 11.6933C3.5 11.9695 3.72386 12.1933 4 12.1933H9.32245C9.5986 12.1933 9.82245 11.9695 9.82245 11.6933C9.82245 11.4172 9.5986 11.1933 9.32245 11.1933H4Z"
          fill="#1A1A1A"
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M3.08001 0.247897C2.80538 0.219032 2.55935 0.418264 2.53048 0.692893L2.15918 4.22563H3.16469L3.47274 1.29468L18.7326 2.89856L17.6839 12.8763L15.7601 12.6741V13.6796L18.0766 13.9231C18.3512 13.952 18.5973 13.7527 18.6261 13.4781L19.7794 2.50582C19.8082 2.23119 19.609 1.98516 19.3344 1.9563L3.08001 0.247897Z"
          fill="#1A1A1A"
        />
      </svg>
    </ToolBarItem>
  );
};

WordCardButton.propTypes = {
  onClick: PropTypes.func.isRequired,
};

export default WordCardButton;
