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
`

const PaginationContainer = styled.div`
  display: flex;
  justify-content: center;
  padding: 10px;

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
        <div>로고</div>
        <div>정렬</div>
        <div>로고</div>
        <div>필터링</div>
        <div>로고</div>
        <div>폴더 추가</div>
      </div>
      <div>
        {currentData.map((item, index) => (
          <div key={index} style={{ marginBottom: '1rem' }}>
            <div>폴더 이름: {item.folderName}</div>
            <div>노트 생성일: {item.createdDate}</div>
            <div>최근 수정일: {item.modifiedDate}</div>
          </div>
        ))}
      </div>
      <PaginationContainer>
        <ReactPaginate
          previousLabel={'이전'}
          nextLabel={'다음'}
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