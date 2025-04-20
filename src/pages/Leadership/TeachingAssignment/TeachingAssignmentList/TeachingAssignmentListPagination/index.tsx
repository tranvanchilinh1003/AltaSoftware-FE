import React from 'react';
import {
    IconOutlineArrowLeftSingle,
    IconOutlineArrowRightSingle,
} from '../../../../../components/Icons';
import { PaginationProps } from './type';
import { getPageNumbers } from './utils';

const Pagination: React.FC<PaginationProps> = ({
    currentPage,
    totalPages,
    onPageChange,
}) => {
    const maxVisiblePages = 5;
    const pageNumbers = getPageNumbers(currentPage, totalPages, maxVisiblePages);

    return (
        <nav className="flex items-center gap-2" aria-label="Pagination">
            {/* Nút Previous */}
            <button
                type="button"
                disabled={currentPage === 1}
                onClick={() => onPageChange(currentPage - 1)}
                className={`min-h-[38px] min-w-[38px] flex items-center justify-center rounded-full ${
                    currentPage === 1
                        ? "cursor-not-allowed text-gray-400"
                        : "hover:bg-background-orange-1 focus:bg-background-orange-1"
                }`}
                aria-label="Previous"
            >
                <IconOutlineArrowLeftSingle />
            </button>

            {/* Các số trang */}
            <div className="flex items-center gap-1">
                {pageNumbers.map((page, index) =>
                    page === "..." ? (
                        <span
                            key={index}
                            className="min-h-[38px] min-w-[38px] flex items-center justify-center text-gray-400">
                            •••
                        </span>
                    ) : (
                        <button
                            key={index}
                            type="button"
                            onClick={() => onPageChange(page)}
                            className={`min-h-[38px] min-w-[38px] flex items-center justify-center rounded-full ${
                                currentPage === page
                                    ? "bg-background-orange-1 text-white"
                                    : "hover:bg-gray-100"
                            }`}
                            aria-current={currentPage === page ? "page" : undefined}>
                            {page}
                        </button>
                    )
                )}
            </div>

            {/* Nút Next */}
            <button
                type="button"
                disabled={currentPage === totalPages}
                onClick={() => onPageChange(currentPage + 1)}
                className={`min-h-[38px] min-w-[38px] flex items-center justify-center rounded-full ${
                    currentPage === totalPages
                        ? "cursor-not-allowed text-gray-400"
                        : "hover:bg-background-orange-1 focus:bg-background-orange-1"
                }`}
                aria-label="Next"
            >
                <IconOutlineArrowRightSingle />
            </button>
        </nav>
    );
};

export default Pagination;
