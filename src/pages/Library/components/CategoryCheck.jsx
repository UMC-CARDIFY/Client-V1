const CategoryCheck = ({ isSelected = false, onClick }) => (
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg"
          onClick={onClick}
          style={{ cursor: 'pointer' }}
          >
          <rect width="18" height="18" rx="4" fill="#E3EAF6"/>
      {isSelected && (
        <path d="M8.42707 11.9394C7.84128 12.5252 6.89153 12.5252 6.30575 11.9394L4.04141 9.67507C3.77907 9.41273 3.77907 8.9874 4.04141 8.72507C4.30374 8.46273 4.72907 8.46273 4.99141 8.72507L6.6593 10.393C7.04982 10.7835 7.68299 10.7835 8.07351 10.393L13.0081 5.4584C13.2704 5.19606 13.6957 5.19606 13.9581 5.4584C14.2204 5.72073 14.2204 6.14606 13.9581 6.4084L8.42707 11.9394Z" fill="#72A3FF"
        />
      )}
    </svg>
  );
  
  export default CategoryCheck;