  import { useState, useEffect, useRef } from 'react';
  import styled from 'styled-components'
  import DummyData from '../../../api/archive/dummyData';
  import ReactPaginate from 'react-paginate';
  import PropTypes from 'prop-types';
  
  import FolderModal from './FolderModal';
  import MoreDiv from './MoreDiv';
  import DeleteConfirmModal from './DeleteConfirmModal';

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
    align-items: center;
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
margin-bottom: 1.5rem;
`;

const SelectFilterDiv = styled.div`
display: flex;
gap: 0.5rem;
margin-bottom: 1rem;
`;
const SortDiv = styled.div`
display: flex;
width: 4.3125rem;
height: 1.875rem;
padding: 0.1875rem 0.4375rem;
justify-content: center;
align-items: center;
gap: 0.375rem;
background: #F3F3F3;
color: var(--Grays-Black, #1A1A1A);
font-family: Pretendard;
font-size: 0.875rem;
font-style: normal;
font-weight: 500;
line-height: normal;
cursor: pointer;
`;
const FiteringDiv = styled(SortDiv)`
width: 4.875rem;
height: 1.875rem;
padding: 0.1875rem 0.4375rem 0.1875rem 0.3125rem;
gap: 0.3125rem;
`;
const AddFolderDiv = styled(SortDiv)`
width: 5.875rem;
height: 1.875rem;
padding: 0.1875rem 0.4375rem 0.1875rem 0.375rem;
gap: 0.3125rem;
`;
const SortIcon = styled.div`
width: 1.5rem;
height: 1.5rem;
flex-shrink: 0;
background: url(<path-to-image>) lightgray 50% / cover no-repeat;
`;
const FilteringIcon = styled(SortIcon)`
background: url(<path-to-image>) lightgray 50% / cover no-repeat;
`;
const AddFolderIcon = styled(SortIcon)`
background: url(<path-to-image>) lightgray 50% / cover no-repeat;
`;

const Contour = styled.div`
width: 100%;
height: 0.0625rem;
background: #E9E9E9;
magin-bottom: 1rem;
`;



const Frame = ({ selectedTab }) => {
  const Data = DummyData();
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 6;
  const [isModalOpen, setModalOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [initialData, setInitialData] = useState(null);
  const [activeMoreDiv, setActiveMoreDiv] = useState(null);
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
  const [deleteItem, setDeleteItem] = useState(null);

  const moreDivRefs = useRef([]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (moreDivRefs.current.every(ref => ref && !ref.contains(event.target))) {
        setActiveMoreDiv(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const filteredData = Data.filter((item) => {
    if (selectedTab === '폴더') {
      return item.type === 'folder';
    } else if (selectedTab === '노트') {
      return item.type === 'note';
    }
    return false;
  });

  const currentData = filteredData.slice(currentPage * itemsPerPage, (currentPage + 1) * itemsPerPage);

  const handlePageChange = ({ selected }) => {
    setCurrentPage(selected);
  };

  const openAddModal = () => {
    setIsEditMode(false);
    setInitialData({ folderName: '', selectedColor: '#6698F5' });
    setModalOpen(true);
  };

  const openEditModal = (data) => {
    setIsEditMode(true);
    setInitialData(data);
    setModalOpen(true);
    setActiveMoreDiv(null);  // MoreDiv를 비활성화
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const handleFormSubmit = (formData) => {
    if (isEditMode) {
      console.log('폴더 수정:', formData);
    } else {
      console.log('폴더 추가:', formData);
    }
  };

  const openDeleteModal = (item) => {
    setDeleteItem(item);
    setDeleteModalOpen(true);
    setActiveMoreDiv(null);  // MoreDiv를 비활성화
  };

  const closeDeleteModal = () => {
    setDeleteModalOpen(false);
    setDeleteItem(null);
  };

  const handleDeleteConfirm = () => {
    console.log('삭제:', deleteItem);
    closeDeleteModal();
  };

  return (
    <FrameBackground>
      <FrameContainer>
        <TitleAll style={{ paddingTop: '3rem' }}>{selectedTab === '폴더' ? '모든 폴더' : '모든 노트'}</TitleAll>
        <SelectFilterDiv>
          <SortDiv>
            <SortIcon />
            <div>정렬</div>
          </SortDiv>
          <FiteringDiv>
            <FilteringIcon />
            <div>필터링 </div>
          </FiteringDiv>
          <AddFolderDiv onClick={openAddModal}>
            <AddFolderIcon />
            <div>폴더 추가</div>
          </AddFolderDiv>
        </SelectFilterDiv>
        <Contour />

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

                  <MoreDiv
                    ref={el => moreDivRefs.current[index] = el}
                    type="folder"
                    onEditClick={() => openEditModal(item)}
                    onDeleteClick={() => openDeleteModal({ ...item, type: 'folder' })}
                    isActive={activeMoreDiv === index}
                    onMoreClick={() => setActiveMoreDiv(activeMoreDiv === index ? null : index)}
                  />
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
                  <MoreDiv
                    ref={el => moreDivRefs.current[index] = el}
                    type="note"
                    onDeleteClick={() => openDeleteModal({ ...item, type: 'note' })}
                    isActive={activeMoreDiv === index}
                    onMoreClick={() => setActiveMoreDiv(activeMoreDiv === index ? null : index)}
                  />
                </RightData>
              </NoteData>
            )
          ))}
        </div>
        <PaginationContainer>
          <ReactPaginate
            previousLabel={
              <PreviousBtn>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path d="M14 8L10 12.5L14 17" stroke="#B1B1B1" strokeWidth="1.5" strokeLinecap="square" />
                </svg>
              </PreviousBtn>
            }
            nextLabel={
              <PreviousBtn>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path d="M10 8L14 12.5L10 17" stroke="#B1B1B1" strokeWidth="1.5" strokeLinecap="square" />
                </svg>
              </PreviousBtn>
            }
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
        <DeleteConfirmModal
          isOpen={isDeleteModalOpen}
          onClose={closeDeleteModal}
          onConfirm={handleDeleteConfirm}
          type={deleteItem ? deleteItem.type : ''}
          itemName={deleteItem ? deleteItem.folderName || deleteItem.noteTitle : ''}
        />
      </FrameContainer>
    </FrameBackground>
  );
};

Frame.propTypes = {
  selectedTab: PropTypes.string.isRequired,
};

export default Frame;