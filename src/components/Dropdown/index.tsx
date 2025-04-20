import React, { useState } from 'react';
import './style.css';
import { DropdownProps, DropdownOption } from './type';

interface CustomDropdownProps extends DropdownProps {
  selectedOption: DropdownOption | null;
  handleOptionClick: (option: DropdownOption) => void;
  // Thêm prop tùy chỉnh cho container, header và list
  className?: string;
  style?: React.CSSProperties;
  headerClassName?: string;
  headerStyle?: React.CSSProperties;
  listClassName?: string;
  listStyle?: React.CSSProperties;
}

const Dropdown: React.FC<CustomDropdownProps> = ({
  options,
  onSelect,
  selectedOption,
  handleOptionClick,
  placeholder = 'Lựa chọn',
  border = 'visible',
  borderColor,
  size = '',
  iconLeft,
  iconColor,
  status = 'normal',
  disabled = false,
  showArrow = true,
  backgroundColorSelected = 'rgb(79 164 204)',
  backgroundColor,
  className = '',
  style = {},
  headerClassName = '',
  headerStyle = {},
  listClassName = '',
  listStyle = {},
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = () => {
    if (!disabled) {
      setIsOpen(!isOpen);
    }
  };

  const handleOptionClickInternal = (option: DropdownOption) => {
    handleOptionClick(option);
    setIsOpen(false);
  };

  const getItemStyle = (option: DropdownOption) => ({
    backgroundColor: selectedOption?.value === option.value ? backgroundColorSelected : 'transparent',
  });

  // Kết hợp class nội bộ với class tùy chỉnh từ bên ngoài
  const dropdownClass = `dropdown ${status} ${disabled ? 'disabled' : ''} ${className}`;
  const placeholderClass = selectedOption ? 'dropdown-selected' : 'dropdown-placeholder';

  return (
    <div className={dropdownClass} style={style}>
      <div
        className={`dropdown-header ${size} ${headerClassName} `}
        onClick={handleToggle}
        style={{
          backgroundColor: status === 'error' ? 'white' : backgroundColor,
          border: border === 'visible' ? `1px solid ${status === 'error' ? 'red' : borderColor || '#ccc'}` : 'none',
          ...headerStyle,
        }}
      >
        {iconLeft && (
          <span className="dropdown-icon-left" style={{ color: iconColor }}>
            {iconLeft}
          </span>
        )}
        <span className={placeholderClass}>
          {selectedOption ? selectedOption.label : placeholder}
        </span>
        {showArrow && (
          <span className={`dropdown-arrow ${isOpen ? 'open' : ''}`} style={{ color: iconColor }}>
            <svg width="20" height="12" viewBox="0 0 20 12" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M18.8095 1.1633C18.4778 0.845263 18.029 0.666748 17.5612 0.666748C17.0934 0.666748 16.6445 0.845263 16.3128 1.1633L9.95574 7.2082L3.68724 1.1633C3.35546 0.845263 2.90666 0.666748 2.43885 0.666748C1.97104 0.666748 1.52223 0.845263 1.19046 1.1633C1.02449 1.32205 0.892755 1.51091 0.802855 1.719C0.712956 1.92708 0.666672 2.15028 0.666672 2.3757C0.666672 2.60112 0.712956 2.82432 0.802855 3.0324C0.892755 3.24049 1.02449 3.42935 1.19046 3.58809L8.69849 10.8283C8.86311 10.9884 9.05896 11.1154 9.27474 11.2021C9.49053 11.2888 9.72197 11.3334 9.95574 11.3334C10.1895 11.3334 10.4209 11.2888 10.6367 11.2021C10.8525 11.1154 11.0484 10.9884 11.213 10.8283L18.8095 3.58809C18.9755 3.42935 19.1073 3.24049 19.1972 3.0324C19.2871 2.82432 19.3333 2.60112 19.3333 2.3757C19.3333 2.15028 19.2871 1.92708 19.1972 1.719C19.1073 1.51091 18.9755 1.32205 18.8095 1.1633Z"
                fill={iconColor || "#FF7506"}
              />
            </svg>
          </span>
        )}
      </div>
      {isOpen && !disabled && (
        <ul className={`dropdown-list ${listClassName}`} style={listStyle}>
          {options.map((option) => (
            <li
              key={option.value}
              className={`dropdown-item ${selectedOption?.value === option.value ? 'selected' : ''}`}
              onClick={() => handleOptionClickInternal(option)}
              style={getItemStyle(option)}
            >
              {option.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Dropdown;
