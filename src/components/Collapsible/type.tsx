export interface CollapsibleProps {
  title: string; // Tiêu đề của collapsible
  children: React.ReactNode; // Nội dung bên trong
  className?: string; // Class tùy chỉnh thêm từ ngoài
  style?: React.CSSProperties; // Custom style inline
}
