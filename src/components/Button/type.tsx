import React from "react";

export interface ButtonProps {
    className?: string | 'primary' | 'secondary' | 'outline-primary' | 'outline-secondary';                                                               /** Kiểu button */
    icon?: React.ReactNode;                                                          /** Icon trong button */
    children: React.ReactNode;                                                      /** Nội dung button */
    onClick?: () => void;                                                          /** Sự kiện click */
    width?: string;                                                               /** Chiều rộng */
    height?: string;                                                             /** Chiều cao */
    disabled?: boolean;                                                         /** Vô hiệu hóa button */
    size?: 'big' | 'mini';                                                     /** Kích thước button */
    type?: 'button' | 'submit' | 'reset';                                     /** Loại button */
    style?: React.CSSProperties;                                             /** CSS tùy chỉnh */
}
