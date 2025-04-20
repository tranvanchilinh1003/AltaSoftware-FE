export const getPageNumbers = (currentPage: number, totalPages: number, maxVisiblePages = 5) => {
  const pages: (number | '...')[] = [];
  const siblingCount = Math.floor((maxVisiblePages - 1) / 2);

  if (totalPages <= maxVisiblePages) {
    for (let i = 1; i <= totalPages; i++) {
      pages.push(i);
    }
  } else {
    const leftSibling = Math.max(currentPage - siblingCount, 2);
    const rightSibling = Math.min(currentPage + siblingCount, totalPages - 1);

    pages.push(1);
    if (leftSibling > 2) {
      pages.push('...');
    }

    for (let i = leftSibling; i <= rightSibling; i++) {
      pages.push(i);
    }

    if (rightSibling < totalPages - 1) {
      pages.push('...');
    }
    pages.push(totalPages);
  }

  return pages;
};
