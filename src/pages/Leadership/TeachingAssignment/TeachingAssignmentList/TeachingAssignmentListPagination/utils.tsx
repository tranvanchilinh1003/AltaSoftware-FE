export const getPageNumbers = (currentPage: number, totalPages: number, maxVisiblePages = 5) => {
    if (totalPages <= maxVisiblePages + 2) {
        return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    const pages: (number | "...")[] = [];

    // Luôn có số đầu tiên
    pages.push(1);

    if (currentPage <= 4) {
        // Trường hợp đầu tiên: 1 2 3 4 5 6 ... totalPages
        pages.push(...Array.from({ length: 5 }, (_, i) => i + 2));
        pages.push("...");
    } else if (currentPage >= totalPages - 3) {
        // Trường hợp cuối cùng: 1 ... totalPages-5 totalPages-4 totalPages-3 totalPages-2 totalPages-1 totalPages
        pages.push("...");
        pages.push(...Array.from({ length: 5 }, (_, i) => totalPages - 5 + i));
    } else {
        // Trường hợp giữa: 1 ... prev prev-1 current next next+1 ... totalPages
        pages.push("...");
        pages.push(currentPage - 2);
        pages.push(currentPage - 1);
        pages.push(currentPage);
        pages.push(currentPage + 1);
        pages.push(currentPage + 2);
        pages.push("...");
    }

    // Luôn có số cuối cùng
    pages.push(totalPages);

    return pages;
};
