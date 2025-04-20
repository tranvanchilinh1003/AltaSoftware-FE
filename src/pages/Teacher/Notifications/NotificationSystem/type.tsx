export interface INotification {
  id: number;
  avatar: string;
  message: string;
  time: string;
  isRead: boolean;
}

export type DropdownOption = "Tất cả" | "Chưa đọc" | "Đã đọc";

/**
 * - Checkbox có 3 trạng thái: "all" (check), "some" (gạch ngang), "none" (không check).
 * - Chọn "Tất cả" => check.
 * - Chọn "Chưa đọc"/"Đã đọc" => gạch ngang.
 * - Mặc định => none.
 */
export type CheckboxState = "all" | "some" | "none";