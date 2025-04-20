export interface TableHeaderCellProps {
    label: string;              // Tiêu đề hiển thị cho cột
    width?: string;             // Định nghĩa chiều rộng của cột (sử dụng class Tailwind như "w-32", "flex-grow")
    sortable?: boolean;         // Nếu `true`, hiển thị icon sắp xếp; nếu `false`, ẩn icon
    children?: React.ReactNode; // Nội dung tùy chỉnh, có thể là icon hoặc nút khác
    className?: React.ReactNode;
}
