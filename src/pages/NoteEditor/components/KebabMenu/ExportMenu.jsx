import { forwardRef } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const ExportMenuWrapper = styled.div`
  position: absolute;
  top: 4.25rem; // 위치 조정
  left: 1.06rem;
  width: 13.5625rem;
height: 12.9375rem;
flex-shrink: 0;
  background: white;
  border: 1px solid #ddd;
  box-shadow: 0px 4px 26px rgba(0, 0, 0, 0.1);
  border-radius: 0.5rem;
  z-index: 10;
`;

const ExportMenuItem = styled.div`
  padding: 0.75rem 1.5rem;
  cursor: pointer;

  &:hover {
    background: #f2f4f8;
  }
`;

// eslint-disable-next-line react/display-name
const ExportMenu = forwardRef(({ onExportPDF, onExportCSV }, ref) => {
  return (
    <ExportMenuWrapper ref={ref}>
      <ExportMenuItem onClick={onExportPDF}>PDF로 내보내기</ExportMenuItem>
      <ExportMenuItem onClick={onExportCSV}>CSV로 내보내기</ExportMenuItem>
    </ExportMenuWrapper>
  );
});

ExportMenu.propTypes = {
  onExportPDF: PropTypes.func.isRequired,
  onExportCSV: PropTypes.func.isRequired,
};

export default ExportMenu;
