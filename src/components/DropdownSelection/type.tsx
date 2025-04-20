export interface CustomDropdownProps {
  label?: string;                 // Nhãn cho dropdown (tùy chọn)
  placeholder?: string;           // Văn bản hiển thị khi không có giá trị nào được chọn (tùy chọn)
  width?: string | number;        // Chiều rộng của dropdown (tùy chọn)
  options?: string[];
  value?: string | number;         // Danh sách các tùy chọn trong dropdown (tùy chọn)
  onSelect?: (value: string) => void; // Hàm gọi lại khi một tùy chọn được chọn (tùy chọn)
  className?: string;             // Tên lớp CSS tùy chỉnh cho dropdown (tùy chọn)
}
