export interface StatusProps {
    type: 'studying' | 'dropped' | 'graduated' | 'classTransferred' | 'schoolTransferred';
    label?: string; // Văn bản hiển thị (tuỳ chọn, có thể ghi đè nhãn mặc định)
    styles?: {
        container?: React.CSSProperties; // Kiểu dáng cho phần bao bọc bên ngoài
        dot?: React.CSSProperties;       // Kiểu dáng cho chấm tròn trạng thái
        label?: React.CSSProperties;     // Kiểu dáng cho văn bản hiển thị
    };
    className?: string; // Các class bổ sung cho phần bao bọc bên ngoài
    height?: string | number; // Chiều cao tùy chỉnh của component
    width?: string | number; // Chiều rộng tùy chỉnh của component
    margin?: string | number; // Khoảng cách ngoài (margin) tùy chỉnh
    padding?: string | number; // Khoảng cách bên trong (padding) tùy chỉnh
    fontSize?: string | number; // Kích thước chữ của văn bản hiển thị
    borderRadius?: string | number; // Độ bo góc của phần bao bọc bên ngoài
    gap?: string | number; // Khoảng cách giữa chấm tròn và văn bản
    border?: string; // Kiểu đường viền cho phần bao bọc bên ngoài
}
