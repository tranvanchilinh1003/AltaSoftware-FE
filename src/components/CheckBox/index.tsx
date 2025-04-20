import React, { useState, useEffect, useRef } from "react";
import { CheckboxProps } from "./type";
import IconImages from '../IconImages'; 

const CheckboxComponent: React.FC<CheckboxProps> = ({
  label,
  isChecked,
  isIndeterminate = false,
  onChange, 
  customStyles = {},
  iconName,                            
  disabled
}) => {
  const [checked, setChecked] = useState(isChecked);
  const checkboxRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setChecked(isChecked);
    if (checkboxRef.current) {
      checkboxRef.current.indeterminate = isIndeterminate;  
    }
  }, [isChecked, isIndeterminate]);

  // 🔥 Chọn icon hiển thị dựa trên trạng thái
  let iconToDisplay;
  if (isIndeterminate) {
    iconToDisplay = IconImages.iconMinusActiveBlueLarge;
  } else {
    iconToDisplay = checked
      ? IconImages.iconCheckActiveBlueLarge // 🔹 Khi chọn → iconCheckActiveBlueLarge
      : IconImages.iconCheckboxUncheckedBlue; // 🔹 Khi chưa chọn → iconCheckboxUncheckedBlue
  }

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.checked);
    onChange(event);
  };

  return (
    <label className="flex items-center cursor-pointer select-none relative text-lg my-2" style={customStyles.container}>
      <input
        ref={checkboxRef}  
        type="checkbox"
        checked={checked}
        onChange={handleChange}
        className="absolute opacity-0 w-0 h-0 cursor-pointer peer"
        style={customStyles.input}
        disabled={disabled}
      />
      <span className="relative flex justify-center items-center w-5 h-5 bg-white rounded transition-colors" style={customStyles.checkmark}>
        <img src={iconToDisplay} alt="Checkbox icon" className="w-full h-full" />
      </span>
      {label && (
        <span className="ml-3 text-gray-800 transition-colors font-semibold" style={customStyles.label}>
          {label}
        </span>
      )}
    </label>
  );
};

export default CheckboxComponent;
