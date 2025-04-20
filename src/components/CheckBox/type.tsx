export type IconNames =
  | 'iconCheckActiveBlueLarge'      // Biểu tượng kiểm tra màu xanh lớn
  | 'iconCheckActiveGrayLarge'      // Biểu tượng kiểm tra màu xám lớn
  | 'iconMinusActiveBlueLarge'      // Biểu tượng dấu trừ màu xanh lớn
  | 'iconMinusActiveGrayLarge'
  | 'iconCheckboxUncheckedBlue';    // Biểu tượng dấu trừ màu xám lớn

export type CheckboxProps = {
  label?: string;                   // Nhãn cho checkbox (tùy chọn)
  isChecked?: boolean;               // Trạng thái đã được chọn hay chưa của checkbox
  isIndeterminate?: boolean;        // Trạng thái không xác định (indeterminate) của checkbox (tùy chọn)
  onChange: (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => void;                        // Hàm gọi lại khi trạng thái checkbox thay đổi
  customStyles?: {                  // Các kiểu dáng tùy chỉnh cho checkbox (tùy chọn)
    container?: React.CSSProperties; // Kiểu dáng của container bao quanh checkbox
    input?: React.CSSProperties;     // Kiểu dáng của phần tử input của checkbox
    checkmark?: React.CSSProperties; // Kiểu dáng của dấu kiểm của checkbox
    label?: React.CSSProperties;     // Kiểu dáng của nhãn của checkbox
  };
  icon?: string;                     // Biểu tượng tùy chỉnh cho checkbox (tùy chọn)
  iconName?: IconNames;              // Tên biểu tượng cho checkbox (tùy chọn)
  className?: string;                // Tên lớp CSS tùy chỉnh cho checkbox (tùy chọn)

  disabled?: boolean;
};
