import { useState } from "react";
import { IconChevronDown, IconCloseCircleFill } from "../Icons";
import { Props } from "./type";


export default function SelectDropdown({
  value,
  onChange,
  placeholder,
  options,
  className = '',
  variant = 'faded',
  color = 'primary',
  size = 'md',
  radius = 'xs',
  textSize = 'base',
  removeLabel = false,
  clearIcon = false,
}: Props) {
  const [open, setOpen] = useState(false);

  return (
    <div className={`relative w-full max-w-full ${className}`}>
      {/* Dropdown Header */}
      <div
        onClick={() => setOpen(!open)}
        tabIndex={0}
        className={`w-full h-12 flex items-center justify-between px-3 bg-white border border-gray-300 rounded-lg cursor-pointer transition-all duration-200 focus:ring-2 focus:ring-orange-400 ${variantStyles[variant]} ${colorStyles[color]} ${sizeStyles[size]?.inputWrapper} ${radiusStyles[radius]?.inputWrapper}`}
      >
        {!removeLabel && (
          <p className={`w-full flex items-center mt-4 ${value ? 'text-black' : 'text-gray-400'} ${textSizeStyles[textSize]?.input}`}>
            {options.find((option) => option.value === value)?.label || placeholder}
          </p>
        )}
        <div className="flex items-center space-x-2">
          {clearIcon && value && (
            <div
              onClick={() => {
                onChange(''); // Gọi onChange với giá trị rỗng
                setOpen(false); // Đóng dropdown sau khi xóa
              }}
              className="cursor-pointer"
            >
              <IconCloseCircleFill className="size-5 text-gray-400 cursor-pointer" />
            </div>
          )}

          <IconChevronDown className={`text-base flex-shrink-0 transition-transform duration-200 ${open ? 'rotate-180' : 'rotate-0'}`} />
        </div>
      </div>

      {/* Dropdown Options */}
      {open && (
        <div
          className="absolute top-full left-0 w-full mt-2 max-h-[200px] z-50 bg-white border border-gray-400/10 rounded-lg shadow-lg overflow-y-auto space-y-2
                [&::-webkit-scrollbar]:w-1
                [&::-webkit-scrollbar-track]:bg-none
                [&::-webkit-scrollbar-track]:rounded-r-full
                [&::-webkit-scrollbar-thumb]:bg-gray-100
                [&::-webkit-scrollbar-thumb]:rounded-r-full
                [&::-webkit-scrollbar-thumb]:hover:bg-gray-300
                dark:[&::-webkit-scrollbar-track]:bg-neutral-900
                dark:[&::-webkit-scrollbar-thumb]:bg-neutral-700
                dark:[&::-webkit-scrollbar-thumb]:hover:bg-neutral-500
                animate-fadeIn`}"
        >
          {options.map((option) => (
            <div
              key={option.value}
              onClick={() => {
                if (value !== option.value) onChange(option.value);
                setOpen(false);
              }}
              className={`flex py-2 px-3 cursor-pointer transition-all duration-150 ${
                option.value === value ? 'bg-orange-text text-white' : 'hover:bg-gray-100'
              }`}
            >
              <p className="text-sm w-full flex items-center">{option.label}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
const variantStyles: Record<string, string> = {
    flat: "text-opacity-5 bg-zinc-100 bg-transparent transition-colors focus-within:bg-zinc-100 border-none transition-background motion-reduce:transition-none",
    bordered: "bg-white border border-gray-300",
    underlined: "bg-transparent border-b-2 border-gray-300",
    faded: "bg-gray-100 border-none",
};

const colorStyles: Record<string, string> = {
    default: "text-black",
    primary: "border-none text-orange-text",
    secondary: "border-gray-500 text-gray-500",
    success: "border-green-500 text-green-500",
    warning: "border-orange-500 text-orange-500",
    danger: "border-red-500 text-red-500",
};
const sizeStyles = {
    xs: { inputWrapper: "h-6 min-h-6 px-1", input: "text-tiny" },
    md: { inputWrapper: "h-10 min-h-10", input: "text-small" },
    xl: { inputWrapper: "h-14 min-h-14", input: "text-medium" },
};

const radiusStyles = {
    xs: { inputWrapper: "rounded" },
    sm: { inputWrapper: "rounded-[4px]" },
};

const textSizeStyles = {
    base: { input: "text-base" },
};