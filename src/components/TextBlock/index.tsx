import React from 'react';
import { TextBlockProps } from './type';
import './style.css';
const TextBlockComponent: React.FC<TextBlockProps> = ({ text }) => {
  return (
    <div className="text-block">
      {/* Chia văn bản theo <br/> và sử dụng map để tạo các dòng mới */}
      {text.split('<br/>').map((line, index) => (
        // Sử dụng React.Fragment để bao bọc mỗi dòng và thêm <br /> cho dòng mới
        <React.Fragment key={index}>
          {line}
          <br />
        </React.Fragment>
      ))}
    </div>
  );
};

export default TextBlockComponent;

// Ví dụ cụ thể:
// Dữ liệu được kế thừa bao gồm các thông tin:
// - Thông tin học viên và Danh sách lớp học
// - Thông tin môn học
// - Phân công giảng dạy

// Cách dùng ở noi khác:
// Hiển thị văn bản với các dòng mới được tách ra bởi thẻ <br/>
// `TextBlock`: Component được import từ file khác, dùng để hiển thị văn bản với định dạng các dòng mới.
// `text`: Thuộc tính chứa văn bản cần hiển thị. Các thẻ <br/> trong chuỗi văn bản sẽ được thay thế bằng các dòng mới trong UI.