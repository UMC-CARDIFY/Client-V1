  import { useState } from 'react';
  import styled from 'styled-components'
  import DummyData from '../../../api/archive/dummyData';
  import ReactPaginate from 'react-paginate';
  import PropTypes from 'prop-types';
  
  import FolderModal from './FolderModal';

  const FrameBackground = styled.div`
    background: #F9F9F9;
    display: flex;
width: 105rem;
height: 55.75rem;
padding: var(--UI-Component-None, 5rem) var(--UI-Component-None, 8rem);
justify-content: center;
align-items: center;
flex-shrink: 0;
background: #F0F0F0;

@media (max-width: 1440px) {
width: 77.625rem;
height: 53.375rem;
padding: var(--UI-Component-None, 5.5rem) var(--UI-Component-None, 5rem);
}

@media (max-width: 1200px) {
width: 68rem;
height: 41.8125rem;
padding: var(--UI-Component-None, 3.5rem) var(--UI-Component-None, 4rem);
}
  `;

  const FrameContainer = styled.div`
    width: 89rem;
    height: 50.75rem;
    margin: 5rem auto;
    padding: 0 5.5rem;
    display: flex;
  flex-direction: column; 
  background: #FFF;
box-shadow: 0px 4px 26.7px 0px rgba(0, 0, 0, 0.02), 0px 10px 60px 0px rgba(0, 74, 162, 0.03);

  @media (max-width: 1440px) {
    width: 67.625rem;
  }

  @media (max-width: 1200px) {
    width: 60rem;
    height: 39.8125rem;
  }

  `

  const PaginationContainer = styled.div`
    display: flex;
    justify-content: center;
    margin-bottom: 1rem;
    margin-top: auto; 
    align-items: center;
    gap: 0.5rem;

    .pagination {
      display: flex;
      list-style: none;
      padding: 0;
    }

    .page-item {
      margin: 0 5px;

      .page-link {
        display: flex;
        width: 1.5rem;
        height: 1.5rem;
        justify-content: center;
        align-items: center;
        flex-shrink: 0;

        cursor: pointer;
        padding: 10px;
        text-decoration: none;

        color: var(--Grays-Gray3, #B1B1B1);
        font-family: Pretendard;
        font-size: 0.9375rem;
        font-style: normal;
        font-weight: 600;
        line-height: normal;
      }

      &.active .page-link {
      background: #EAEAEA;
      color: var(--Grays-Black, #1A1A1A);
      }
    }

  `;

  const PreviousBtn = styled.div`
  width: 1.5rem;
height: 1.5rem;
flex-shrink: 0;
`;

  const FolderData = styled.div`
    display: flex;
    flex-direction: row;
    min-width: 37.75rem;
    padding: 1.25rem 0.5rem;
    align-items: center;
    gap: 1.5rem;
    width: 100%;
  `;

  const LeftData = styled.div`
    display: flex;
    flex-direction: row;
    gap: 1.5rem;
    align-items:center;
  `;

  const Line= styled.div`
    width: 0.0625rem;
    height: 2.4375rem;
    background: #E9E9E9;
  `;

  const RightData = styled.div`
    display:flex;
    flex-direction: row;
    justify-content: flex-end;
    gap: 1.5rem;
  `;

  const FlexSpacer = styled.div`
    flex-grow: 1;
  `;

  const NoteData = styled.div`
  display: flex;
  flex-direction: row;
  min-width: 37.75rem;
  padding: 1.25rem 0.5rem;
  align-items: center;
  gap: 1.5rem;
  width: 100%;
`;

const TitleAll = styled.div`
color: var(--Grays-Black, #1A1A1A);
font-family: Pretendard;
font-size: 1.25rem;
font-style: normal;
font-weight: 600;
line-height: normal;
`;



  const Frame = ({ selectedTab }) => {

    const Data = DummyData();

   // 상태 관리
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 6;

  const [isModalOpen, setModalOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false); 
  const [initialData, setInitialData] = useState(null); 


  // 필터링된 데이터 계산
  const filteredData = Data.filter((item) => {
    if (selectedTab === '폴더') {
      return item.type === 'folder';
    } else if (selectedTab === '노트') {
      return item.type === 'note';
    }
    return false;
  });

  // 현재 페이지에 표시할 데이터 계산
  const currentData = filteredData.slice(currentPage * itemsPerPage, (currentPage + 1) * itemsPerPage);
  
    const handlePageChange = ({ selected }) => {
      setCurrentPage(selected);
    };

const openAddModal = () => {
  setIsEditMode(false);
  setInitialData({ folderName: '', selectedColor: '#6698F5'});
  setModalOpen(true);
};


console.log(selectedTab);

//Modal

const openEditModal = (data) => {
  setIsEditMode(true);
  setInitialData(data);
  setModalOpen(true);
};

const closeModal = () => {
  setModalOpen(false);
};


    const handleFormSubmit = (formData) => {
      if (isEditMode) {
        // 폴더 수정 로직
        console.log('폴더 수정:', formData);
      } else {
        // 폴더 추가 로직
        console.log('폴더 추가:', formData);
      }
    };



    return (
      <FrameBackground>
      <FrameContainer>
        <TitleAll style={{ paddingTop: '3rem' }}>{selectedTab === '폴더' ? '모든 폴더' : '모든 노트'}</TitleAll>
        <div>
          <div>정렬 드롭다운</div>
          <div>필터링 드롭다운</div>
          <button onClick={openAddModal}>폴더 추가</button>
        </div>
        <div>
        {currentData.map((item, index) => (
          selectedTab === '폴더' ? (
            <FolderData key={index}>
              <LeftData>
                <div>즐겨찾기</div>
                <div>아이콘</div>
                <Line />
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  <div>{item.folderName}</div>
                  <div>폴더 이름</div>
                </div>
              </LeftData>
              <FlexSpacer />
              <RightData>
                <Line />
                <div>
                  <div>{item.noteCount}</div>
                  <div>포함된 노트 개수</div>
                </div>
                <Line />
                <div>
                  <div>{item.modifiedDate}</div>
                  <div>최근 수정일</div>
                </div>
                <div>더보기</div>
                <button onClick={() => openEditModal(item)}>수정</button>
              </RightData>
            </FolderData>
          ) : (
            <NoteData key={index}>
              <LeftData>
                <div>즐겨찾기</div>
                <div>아이콘</div>
                <Line />
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  <div>{item.noteTitle}</div>
                  <div>노트 제목</div>
                </div>
              </LeftData>
              <FlexSpacer />
              <RightData>
                <Line />
                <div>
                  <div>{item.category}</div>
                  <div>카테고리</div>
                </div>
                <Line />
                <div>
                  <div>{item.modifiedDate}</div>
                  <div>최근 수정일</div>
                </div>
                <div>더보기</div>
              </RightData>
            </NoteData>
          )
        ))}
        </div>
        <PaginationContainer>
          <ReactPaginate
            previousLabel={<PreviousBtn>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
  <path d="M14 8L10 12.5L14 17" stroke="#B1B1B1" strokeWidth="1.5" strokeLinecap="square"/>
</svg>
            </PreviousBtn>}
            nextLabel={<PreviousBtn><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M10 8L14 12.5L10 17" stroke="#B1B1B1" strokeWidth="1.5" strokeLinecap="square"/>
            </svg></PreviousBtn>}
            breakLabel={'...'}
            breakClassName={'break-me'}
            pageCount={Math.ceil(filteredData.length / itemsPerPage)}
            marginPagesDisplayed={2}
            pageRangeDisplayed={5}
            onPageChange={handlePageChange}
            containerClassName={'pagination'}
            subContainerClassName={'pages pagination'}
            activeClassName={'active'}
            renderOnZeroPageCount={null}
            pageLinkClassName={'page-link'}
            previousLinkClassName={'page-link'}
            nextLinkClassName={'page-link'}
            breakLinkClassName={'page-link'}
            activeLinkClassName={'active-link'}
            previousClassName={'page-item'}
            nextClassName={'page-item'}
            pageClassName={'page-item'}
          />
        </PaginationContainer>
        <FolderModal
        isOpen={isModalOpen}
        onClose={closeModal}
        onSubmit={handleFormSubmit}
        initialData={initialData}
        isEditMode={isEditMode}
      />

      </FrameContainer>
      </FrameBackground>
    )
  }

  Frame.propTypes = {
    selectedTab: PropTypes.string.isRequired,
  };

  export default Frame