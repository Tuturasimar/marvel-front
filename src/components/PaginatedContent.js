import React, { useState } from "react";
import Pagination from "react-paginate";

const PaginatedContent = ({ number, setSkip }) => {
  // Data to be rendered using pagination.

  const [activePage, setCurrentPage] = useState(1);
  // Logic for displaying current todos

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    if (pageNumber.selected + 1 === 1) {
      setSkip(0);
    } else {
      setSkip((pageNumber.selected + 1) * 100 - 100);
    }
  };

  return (
    <div className="container">
      <div className="test_pagination">
        <Pagination
          className="test"
          pageCount={Math.ceil(number / 100)}
          activePage={activePage}
          pageRangeDisplayed={3}
          marginPagesDisplayed={3}
          onPageChange={handlePageChange}
        />
      </div>
    </div>
  );
};

export default PaginatedContent;
