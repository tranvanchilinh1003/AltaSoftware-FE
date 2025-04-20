export interface TitleProps {
  text: string;                         // Tiêu đề hiển thị
  size?: number | string;               // Kích thước chữ (px hoặc biến CSS)
  font?: string;                        // Font chữ (hoặc biến CSS)
  color?: string;                       // Màu chữ (HEX, RGB, hoặc biến CSS)
  className?: string;                   // Class tùy chỉnh thêm từ ngoài
  align?: "left" | "center" | "right";  // Căn lề tiêu đề
  weight?: "thin" | "normal" | "bold" | "extrabold";  // Độ đậm của chữ
  style?: React.CSSProperties;          // Custom style inline
}
