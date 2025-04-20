export type IconNames =
  | 'iconCheckActiveBlueLarge'      // Biểu tượng kiểm tra màu xanh lớn
  | 'iconCheckActiveGrayLarge'      // Biểu tượng kiểm tra màu xám lớn
  | 'iconMinusActiveBlueLarge'      // Biểu tượng dấu trừ màu xanh lớn
  | 'iconMinusActiveGrayLarge'      // Biểu tượng dấu trừ màu xám lớn
  | 'iconPlusBlue';                 // Biểu tượng dấu cộng màu xanh

export interface ClickableIconProps {
  iconName: IconNames;              // Tên biểu tượng được chọn
  onClick: () => void;              // Hàm gọi lại khi biểu tượng được nhấp
  size?: 'sm' | 'md' | 'lg' | 'xl'; // Kích thước của biểu tượng (tùy chọn, có thể là 'sm', 'md', 'lg' hoặc 'xl')
  text?: string;                    // Văn bản đi kèm với biểu tượng (tùy chọn)
  customStyles?: {                  // Các kiểu dáng tùy chỉnh cho biểu tượng (tùy chọn)
    container?: React.CSSProperties; // Kiểu dáng của container bao quanh biểu tượng
    icon?: React.CSSProperties;      // Kiểu dáng của phần tử icon
    text?: React.CSSProperties;      // Kiểu dáng của văn bản
  };
}
