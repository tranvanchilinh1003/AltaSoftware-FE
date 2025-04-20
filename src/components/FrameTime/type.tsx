export interface Item {
  title: string; // hiển thị tiêu đề vd : Tiết 1, Tiết 2,...
  time: string; // thời gian
}
export interface FrameTimeProps {
  items: Item[];
}