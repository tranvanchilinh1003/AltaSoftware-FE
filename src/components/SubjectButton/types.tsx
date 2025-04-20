export interface SubjectButtonProps {
  title: string; // Tiêu đề của nút
  backgroundColor: 'blue' | 'gray'; // Màu nền của nút, chỉ có thể là 'blue' hoặc 'gray'
  textColor: 'white' | 'black'; // Màu chữ của nút, chỉ có thể là 'white' hoặc 'black'
  iconName?: keyof typeof import('./icons').default; // Tên biểu tượng (icon) từ file icons, có thể không có
  disabled?: boolean; // Trạng thái vô hiệu hóa của nút, tùy chọn, mặc định là false
  size?: 'small' | 'medium' | 'large' | 'extra-large'; // Kích thước của nút, tùy chọn, có thể là 'small', 'medium', 'large' hoặc 'extra-large'
  iconPosition?: 'left' | 'right'; // Vị trí của biểu tượng (icon), tùy chọn, có thể là 'left' hoặc 'right'
  onClose?: () => void; // Hàm được gọi khi biểu tượng (icon) nhấp vòa icon xẽ đóng lại
}
