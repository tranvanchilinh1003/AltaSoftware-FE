/**
 * Props cho component Star
 *
 * @property {boolean} selected
 * @property {Function} toggleSelect
 */
export interface StarProps {
  /** Trạng thái của ngôi sao (đã chọn hoặc chưa chọn). */
  selected: boolean;

  /** Hàm xử lý chọn/bỏ chọn ngôi sao. */
  toggleSelect: () => void;
}
