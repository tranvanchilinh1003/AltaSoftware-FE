export type DropdownOption = {
  label: string; // Nhãn hiển thị của option
  value: string; // Giá trị duy nhất của option
};

export type DropdownStatus = 'normal' | 'error' | 'disabled'; // Trạng thái của dropdown
export type DropdownSize = 'medium' | 'long' | 'short'; // Kích thước dropdown
export type DropdownBorder = 'visible' | 'hidden'; // Kiểu viền dropdown

export interface DropdownProps {
  options: DropdownOption[]; // Danh sách các option hiển thị trong dropdown

  onSelect?: (option: DropdownOption) => void; // Hàm callback khi chọn một option

  placeholder?: string; // Văn bản hiển thị khi chưa chọn option nào (mặc định: "Lựa chọn")

  border?: DropdownBorder; // Kiểu viền dropdown ('visible' hoặc 'hidden')
  borderColor?: string; // Màu sắc của viền dropdown (mặc định: #ccc)

  size?: DropdownSize; // Kích thước của dropdown ('medium', 'long', 'short')

  iconLeft?: React.ReactNode; // Biểu tượng nằm bên trái dropdown (ví dụ: icon)

  status?: DropdownStatus; // Trạng thái dropdown ('normal', 'error', 'disabled')
  disabled?: boolean; // Dropdown có bị vô hiệu hóa không? (mặc định: false)

  showArrow?: boolean; // Có hiển thị icon mũi tên hay không? (mặc định: true)

  iconColor?: string; // Màu sắc của icon (mặc định: #FF7506)

  backgroundColorSelected?: string; // Màu nền của option được chọn
  backgroundColor?: string; // Màu nền của dropdown
}
