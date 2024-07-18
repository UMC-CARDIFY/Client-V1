  import { useState } from 'react';
  import styled from 'styled-components'
  import DummyData from '../../../api/archive/dummyData';
  import ReactPaginate from 'react-paginate'; 


  const FrameContainer = styled.div`
    width: 89rem;
    height: 45.75rem;
    background: gray;
    margin: 5rem auto;
    padding: 0 5.5rem;
    display: flex;
  flex-direction: column; 
  `

  const PaginationContainer = styled.div`
    display: flex;
    justify-content: center;
    margin-bottom: 1rem;
    margin-top: auto; 
    align-self: flex-end; /* 하단에 정렬 */
    width: 100%;

    .pagination {
      display: flex;
      list-style: none;
      padding: 0;
    }

    .page-item {
      margin: 0 5px;

      .page-link {
        cursor: pointer;
        padding: 10px;
        border: 1px solid #ddd;
        border-radius: 5px;
        color: #007bff;
        text-decoration: none;
      }

      &.active .page-link {
        background-color: #007bff;
        color: white;
        border-color: #007bff;
      }
    }
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



  const Frame = () => {

    const Data = DummyData();

    // 상태 관리
    const [currentPage, setCurrentPage] = useState(0);
    const itemsPerPage = 6;
    
    // 현재 페이지에 표시할 데이터 계산
    const currentData = Data.slice(currentPage * itemsPerPage, (currentPage + 1) * itemsPerPage);
    
    // 페이지 변경 핸들러
    const handlePageChange = ({ selected }) => {
      setCurrentPage(selected);
    };



    return (
      <FrameContainer>
        <div style={{ paddingTop: '3rem' }}>모든 폴더</div>
        <div>
          <div>정렬 드롭다운</div>
          <div>필터링 드롭다운</div>
          <div>폴더 추가 드롭다운</div>
        </div>
        <div>
          {currentData.map((item, index) => (
              <FolderData key={index}>
                <LeftData>
                  <div>즐겨찾기</div>
                  <div>아이콘</div>
                  <Line></Line>
                  <div style={{display:'flex',flexDirection:'column'}}>
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
                </RightData>

              
            </FolderData>
          ))}
        </div>
        <PaginationContainer>
          <ReactPaginate
            previousLabel={'<'}
            nextLabel={'>'}
            breakLabel={'...'}
            breakClassName={'break-me'}
            pageCount={Math.ceil(Data.length / itemsPerPage)}
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

      </FrameContainer>
    )
  }

  export default Frame