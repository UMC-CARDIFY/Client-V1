import { forwardRef, useState } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const ExportMenuWrapper = styled.div`
  position: absolute;
  top: 4.25rem; // 위치 조정
  left: 1.06rem;
  flex-shrink: 0;
  border-radius: 0.25rem;
  border: 1px solid var(--grays-gray-5-divider, #E8E8E8);
  background: var(--Grays-White, #FFF);
  box-shadow: 0px 4px 26px 0px rgba(0, 0, 0, 0.02), 0px 10px 60px 0px rgba(0, 74, 162, 0.03);
  z-index: 10;
  padding: 1rem 1.5rem;
  box-sizing: border-box;
`;

const Title = styled.div`
  color: var(--Grays-Black, #1A1A1A);
  font-family: Pretendard;
  font-size: 0.875rem;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
  margin-bottom: 1.5rem;
`;

const ExportMenuItem = styled.div`
  cursor: pointer;
  display: flex;
  flex-direction: column;
  margin-bottom: 0.5rem;
`;

const HiddenRadioButton = styled.input.attrs({ type: 'radio' })`
  opacity: 0;
  position: absolute;
  pointer-events: none;
`;

const CustomRadioButton = styled.div`
  display: inline-block;
  width: 1rem;
  height: 1rem;
  margin-right: 0.5rem;
`;

const ExportMenuLabel = styled.label`
  display: flex;
  align-items: center;
  cursor: pointer;

  color: var(--Grays-Gray1, #646464);
  font-family: Pretendard;
  font-size: 0.75rem;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  margin-bottom: 0.31rem;
`;

const ExportMenuSubLabel = styled.span`
  color: var(--Grays-Gray3, #B1B1B1);
  font-family: Pretendard;
  font-size: 0.625rem;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  cursor: pointer;
  margin-left: 1.6rem; /* 라디오 버튼과의 간격 조정 */
`;

const ExportButton = styled.button`
  display: flex;
  width: 100%;
  padding: 0.5rem 0.375rem;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
  border-radius: 0.25rem;
  background: var(--Main-BackGround, #F2F4F8);
  border: none;
  cursor: pointer;
  text-align: center;
  margin-top: 1.5rem;

  color: var(--Grays-Gray1, #646464);
  font-family: Pretendard;
  font-size: 0.75rem;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
`;

const ExportIcon = styled.div`
  width: var(--font-size-sm, 0.875rem);
  height: var(--font-size-sm, 0.875rem);
  flex-shrink: 0;
`;

// eslint-disable-next-line react/display-name
const ExportMenu = forwardRef(({ onExportPDF, onExportCSV }, ref) => {
  const [selectedOption, setSelectedOption] = useState(null);

  const handleExportClick = () => {
    if (selectedOption === 'pdf') {
      onExportPDF();
    } else if (selectedOption === 'csv') {
      onExportCSV();
    }
  };

  return (
    <ExportMenuWrapper ref={ref}>
      <Title>내보내기</Title>
      <ExportMenuItem>
        <ExportMenuLabel htmlFor="pdf">
          <HiddenRadioButton
            id="pdf"
            name="exportOption"
            value="pdf"
            checked={selectedOption === 'pdf'}
            onChange={(e) => setSelectedOption(e.target.value)}
          />
          <CustomRadioButton checked={selectedOption === 'pdf'}>
            {selectedOption === 'pdf' ? (
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                <circle cx="8" cy="8" r="7.5" stroke="#CDDDFF"/>
                <circle cx="8" cy="8" r="4" fill="#699BF7"/>
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                <circle cx="8" cy="8" r="7.5" stroke="#DBDBDB"/>
              </svg>
            )}
          </CustomRadioButton>
          PDF
        </ExportMenuLabel>
        <ExportMenuSubLabel onClick={() => setSelectedOption('pdf')}>노트 전체를 PDF로 내보냅니다.</ExportMenuSubLabel>
      </ExportMenuItem>
      <ExportMenuItem>
        <ExportMenuLabel htmlFor="csv">
          <HiddenRadioButton
            id="csv"
            name="exportOption"
            value="csv"
            checked={selectedOption === 'csv'}
            onChange={(e) => setSelectedOption(e.target.value)}
          />
          <CustomRadioButton checked={selectedOption === 'csv'}>
            {selectedOption === 'csv' ? (
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                <circle cx="8" cy="8" r="7.5" stroke="#CDDDFF"/>
                <circle cx="8" cy="8" r="4" fill="#699BF7"/>
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                <circle cx="8" cy="8" r="7.5" stroke="#DBDBDB"/>
              </svg>
            )}
          </CustomRadioButton>
          CSV
        </ExportMenuLabel>
        <ExportMenuSubLabel onClick={() => setSelectedOption('csv')}>단어 카드를 CSV 파일로 내보냅니다.</ExportMenuSubLabel>
      </ExportMenuItem>
      <ExportButton onClick={handleExportClick}><ExportIcon><svg xmlns="http://www.w3.org/2000/svg" width="15" height="14" viewBox="0 0 15 14" fill="none">
        <path d="M9.6875 5.25H10.7812C11.0713 5.25 11.3495 5.36523 11.5546 5.57035C11.7598 5.77547 11.875 6.05367 11.875 6.34375V11.5938C11.875 11.8838 11.7598 12.162 11.5546 12.3671C11.3495 12.5723 11.0713 12.6875 10.7812 12.6875H4.21875C3.92867 12.6875 3.65047 12.5723 3.44535 12.3671C3.24023 12.162 3.125 11.8838 3.125 11.5938V6.34375C3.125 6.05367 3.24023 5.77547 3.44535 5.57035C3.65047 5.36523 3.92867 5.25 4.21875 5.25H5.3125M9.6875 3.5L7.5 1.3125M7.5 1.3125L5.3125 3.5M7.5 1.3125V8.77734" stroke="#646464" strokeLinecap="round" strokeLinejoin="round"/>
      </svg></ExportIcon>
      {selectedOption === 'pdf' ? 'PDF로 내보내기' : 'CSV로 내보내기'}</ExportButton>
    </ExportMenuWrapper>
  );
});

ExportMenu.propTypes = {
  onExportPDF: PropTypes.func.isRequired,
  onExportCSV: PropTypes.func.isRequired,
};

export default ExportMenu;
