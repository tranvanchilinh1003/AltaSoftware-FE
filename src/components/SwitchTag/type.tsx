/**
 * Cấu hình cho SwitchTag
 * @property labels - Danh sách nhãn hiển thị trên tab
 * @property paths - Danh sách đường dẫn tương ứng với từng tab
 */
export interface SwitchTagOptions {
  readonly labels: string[];
  readonly paths: string[];
}

/**
 * Props cho component SwitchTag
 * @property options - Đối tượng chứa thông tin cấu hình
 */
export interface SwitchTagProps {
  options: SwitchTagOptions;
  className?: string;
}
