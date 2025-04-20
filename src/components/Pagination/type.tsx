export interface PaginationControlsProps {
  itemsPerPage: number;
  setItemsPerPage: (value: number) => void;
  onPageChange: (page: number) => void;
  currentPage: number;
  totalPages: number;
}
