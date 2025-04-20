import React from 'react';
import {
  IconArrowRightDoubleLine,
  IconArrowLeftDoubleLine,
  IconOutlineArrowLeftSingle,
  IconOutlineArrowRightSingle,
} from '../../../../../../components/Icons';
import { PaginationProps } from './type';
import { getPageNumbers } from './utils';

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, onPageChange }) => {
  const maxVisiblePages = 5;
  const pageNumbers = getPageNumbers(currentPage, totalPages, maxVisiblePages);

  return (
    <nav className="flex items-center gap-x-1" aria-label="Pagination">
      {/* Nút Previous */}
      <button
        type="button"
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
        className="min-h-[38px] min-w-[38px] py-2 px-2.5 inline-flex justify-center items-center gap-x-2 text-sm rounded-full border border-transparent text-gray-800 hover:bg-background-orange-1 focus:outline-none focus:bg-background-orange-1 disabled:opacity-50 disabled:pointer-events-none"
        aria-label="Previous"
      >
        <IconOutlineArrowLeftSingle />
      </button>

      {/* Các số trang */}
      <div className="flex items-center gap-x-1">
        {pageNumbers.map((page, index) =>
          page === '...' ? (
            <button
              key={index}
              type="button"
              onClick={() => {
                const prevPages = pageNumbers[index - 1] as number;
                const nextPages = pageNumbers[index + 1] as number;
                if (prevPages && nextPages) {
                  onPageChange(Math.floor((prevPages + nextPages) / 2));
                }
              }}
              className="group min-h-[38px] min-w-[38px] flex justify-center items-center text-gray-400 hover:text-orange-text p-2 text-sm rounded-full focus:outline-none focus:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none"
            >
              {/* Mặc định hiển thị dấu `...`, hover thì hiển thị icon */}
              <span className="group-hover:hidden text-xs">•••</span>
              {index === 1 ? (
                <IconArrowLeftDoubleLine className="hidden group-hover:block" />
              ) : (
                <IconArrowRightDoubleLine className="hidden group-hover:block" />
              )}
            </button>
          ) : (
            <button
              key={index}
              type="button"
              onClick={() => onPageChange(page)}
              className={`min-h-[38px] min-w-[38px] flex justify-center items-center border text-base font-bold
                ${currentPage === page ? 'bg-background-orange-1 text-white' : 'border-transparent text-gray-800 hover:bg-gray-100'} 
                py-2 px-3 text-sm rounded-full focus:outline-none focus:bg-background-orange-1 disabled:opacity-50 disabled:pointer-events-none`}
              aria-current={currentPage === page ? 'page' : undefined}
            >
              {page}
            </button>
          ),
        )}
      </div>

      {/* Nút Next */}
      <button
        type="button"
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(currentPage + 1)}
        className="min-h-[38px] min-w-[38px] py-2 px-2.5 inline-flex justify-center items-center gap-x-2 text-sm rounded-full border border-transparent text-gray-800 hover:bg-background-orange-1 focus:outline-none focus:bg-background-orange-1 disabled:opacity-50 disabled:pointer-events-none"
        aria-label="Next"
      >
        <IconOutlineArrowRightSingle />
      </button>
    </nav>
  );
};

export default Pagination;
