

import React, { useState } from 'react';
import { CustomDropdownProps } from './type';
import './style.css';
import { IconArrowCaretDown } from '../Icons';


const DropdownSelectionComponent: React.FC<CustomDropdownProps> = ({
  label = '',                                      // Nhãn hiển thị cho dropdown (mặc định là chuỗi rỗng)
  placeholder = 'Chọn một mục...',                 // Văn bản hiển thị khi không có giá trị nào được chọn (mặc định là 'Chọn một mục...')
  width,                                           // Chiều rộng của dropdown
  options = [],                                    // Danh sách các tùy chọn trong dropdown
  onSelect,                                        // Hàm gọi lại khi một tùy chọn được chọn
}) => {
  const [isOpen, setIsOpen] = useState(false);     // Trạng thái mở/đóng của dropdown
  const [selected, setSelected] = useState(label); // Giá trị được chọn


  const handleSelect = (value: string) => {
    setSelected(value);                             // Cập nhật giá trị được chọn
    setIsOpen(false);                               // Đóng dropdown
    if (onSelect) onSelect(value);                  // Gọi hàm onSelect nếu có
  };

  return (
    <div
      className="relative"
      style={{
        width: width
          ? typeof width === 'number'
            ? `${width}px`
            : width
          : '144px',
      }}
    >

      <div
        className="custom-dropdown h-8 px-2 bg-white rounded border border-gray-700 flex justify-between items-center cursor-pointer hover:bg-gray-100"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="text-gray-700 text-base font-normal leading-tight overflow-hidden text-ellipsis whitespace-nowrap">
          {selected || (
            <span className="text-gray-400">
              {placeholder}
            </span>
          )}
        </div>
        <div data-svg-wrapper>
          <IconArrowCaretDown />
        </div>
      </div>
      {isOpen && options.length > 0 && (
        <ul className="absolute mt-1 w-full bg-white border border-gray-300 rounded shadow-lg z-10">
          {options.map((option, index) => (
            <li
              key={index}
              className={`px-2 py-1 hover:bg-gray-200 cursor-pointer ${option === selected
                  ? 'custom-dropdown-option-selected'
                  : ''
                }`}
              onClick={() => handleSelect(option)}
            >
              {option}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default DropdownSelectionComponent;
// Sử dụng component DropdownSelection để hiển thị dropdown chọn niên khóa
/*
<DropdownSelection
  placeholder="Niên khóa"        // Hiển thị văn bản "Niên khóa" khi không có giá trị nào được chọn
  options={['2020', '2021', '2022', '2023']}  // Danh sách các tùy chọn trong dropdown
  width={144}                     // Chiều rộng của dropdown là 144px
  className="flex-grow"           // Tên lớp CSS tùy chỉnh cho dropdown
/>
*/

// Đây là cách sử dụng component DropdownSelection với các props tùy chỉnh:
// - `placeholder`: Hiển thị văn bản "Niên khóa" khi không có giá trị nào được chọn.
// - `options`: Một mảng các chuỗi đại diện cho các tùy chọn trong dropdown.
// - `width`: Chiều rộng của dropdown được đặt là 144px.
// - `onSelect`: Hàm gọi lại khi một tùy chọn được chọn
// - `className`: Tên lớp CSS tùy chỉnh để định dạng cho dropdown.