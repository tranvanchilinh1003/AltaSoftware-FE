import React from 'react';
import leftIcon from '../../assets/icons/arrow left.png';
import rightIcon from '../../assets/icons/chevron_big_right.png';
import { PaginationProps } from './type';

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, onPageChange }) => {
  const maxPagesToShow = 5;

  // Tính toán các trang cần hiển thị dựa vào trang hiện tại và tổng số trang
  const getPageNumbers = (): (number | string)[] => {
    const pages: (number | string)[] = [];

    if (totalPages <= maxPagesToShow) {
      // Nếu tổng số trang ít hơn hoặc bằng maxPagesToShow thì hiển thị tất cả
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // Luôn hiển thị trang đầu và trang cuối
      const startPage = Math.max(2, currentPage - 1);
      const endPage = Math.min(totalPages - 1, currentPage + 1);

      pages.push(1);
      if (startPage > 2) {
        pages.push('...');
      }

      for (let i = startPage; i <= endPage; i++) {
        pages.push(i);
      }

      if (endPage < totalPages - 1) {
        pages.push('...');
      }
      pages.push(totalPages);
    }

    return pages;
  };

  const pageNumbers = getPageNumbers();

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  return (
    <div className="mt-auto flex flex-wrap justify-center md:justify-between items-center px-2 md:px-10 p-4 mb-5 text-black-text font-sans italic text-sm gap-2">
      <div className="flex space-x-1 md:space-x-2 items-center text-black-text text-sm font-sans">
        <button onClick={handlePreviousPage} disabled={currentPage === 1} className="disabled:opacity-50">
          <img src={leftIcon} alt="Left" className="w-6 h-6 md:w-5 md:h-5" />
        </button>

        {pageNumbers.map((page, index) =>
          typeof page === 'number' ? (
            <button
              key={index}
              onClick={() => onPageChange(page)}
              className={`w-[26px] h-[26px] rounded-full flex items-center justify-center font-medium ${
                currentPage === page ? 'bg-background-orange-1 text-white' : 'text-black-text'
              }`}
            >
              {page}
            </button>
          ) : (
            // Nếu page là dấu "..."
            <button key={index} disabled className="w-[26px] h-[26px] rounded-full flex items-center justify-center font-medium text-black">
              {page}
            </button>
          ),
        )}

        <button onClick={handleNextPage} disabled={currentPage === totalPages} className="disabled:opacity-50">
          <img src={rightIcon} alt="Right" className="w-6 h-6 md:w-5 md:h-5" />
        </button>
      </div>
    </div>
  );
};

export default Pagination;
