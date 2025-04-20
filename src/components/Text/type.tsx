export interface TextProps {
  text: string;                         // Nội dung văn bản
  size?: number | string;               // Kích thước chữ (px hoặc biến CSS)
  font?: string;                        // Font chữ, mặc định dùng var(--font-Mulish)
  color?: string;                       // Màu chữ (HEX, RGB, hoặc biến CSS)
  flex?: boolean;                       // Nếu true, văn bản mở rộng (flex-grow: 1)
  className?: string;                   // Class tùy chỉnh thêm từ ngoài
  align?: "left" | "center" | "right";  // Căn lề văn bản (trái, giữa, phải)
  weight?: "thin" | "normal" | "bold" | "semibold" | "extrabold";  // Thêm trọng lượng chữ (font-weight)
  italic?: boolean;                     // Chữ in nghiêng
  styles?: React.CSSProperties;         // Các styles tùy chỉnh
}
