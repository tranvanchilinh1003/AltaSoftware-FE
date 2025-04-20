export interface TagProp {
  /** Nội dung hiển thị cho tag */
  text: string;
  /** Trạng thái tag đang active hay không */
  isActive: boolean;
  /** Sự kiện click vào tag */
  onClick: () => void;
}
