import ReactPaginate from 'react-paginate';
import styled from 'styled-components';
import PropTypes from 'prop-types';

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
      text-decoration: none;
      color: var(--Grays-Gray3, #B1B1B1);
      font-family: Pretendard;
      font-size: 0.9375rem;
      font-style: normal;
      font-weight: 600;
      line-height: normal;
      border-radius: 0.25rem;
      transition: background-color 0.3s ease, color 0.3s ease;

      &:hover {
        background-color:#F0F0F0;
        color: #767676;
      }
    }

    &.active .page-link {
      border-radius: 0.25rem;
      background: var(--Main-PrimaryLight4, #E7EFFF);
      color: #0F62FE;
    }
  }
`;

const PreviousBtn = styled.div`
  width: 1.5rem;
  height: 1.5rem;
  flex-shrink: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  border-radius: 0.25rem;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: var(--Main-PrimaryLight4, #E7EFFF);
  }
`;

const Pagination = ({ pageCount, handlePageChange }) => (
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
      pageCount={pageCount}
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
);

Pagination.propTypes = {
  pageCount: PropTypes.number.isRequired,
  handlePageChange: PropTypes.func.isRequired,
};

export default Pagination;
