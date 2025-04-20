import React, { forwardRef } from 'react';
import { inputProps } from './type';

const Input = forwardRef<HTMLInputElement, inputProps>(
  (
    { name, placeholder, outline, disabled, icon, leftIcon, leftIconHandle, size, style, className, type, error, onChange, onKeyDown, onPaste },
    ref,
  ) => {
    return (
      <div className="flex flex-col">
        <div
          className={`relative rounded-md ${disabled ? 'bg-slate-100' : ''}`}
          style={{
            width: style?.width ?? (size === 'sm' ? 152 : size === 'md' ? 410 : size === 'lg' ? 890 : undefined),
            ...style,
          }}
        >
          {icon && <div className={`absolute inset-y-0 left-0 flex items-center ${outline ? 'text-orange-text' : 'text-slate-400'}`}>{icon}</div>}
          <input
            ref={ref}
            name={name}
            className={`border-2 border-solid w-full h-11 ${
              outline === 'primary-outline' ? 'border-orange-text' : 'border-gray-300'
            } rounded-md py-1 px-3 ${icon ? 'pl-10' : ''} 
          focus:ring-1 focus:ring-sky-500 focus:outline-none focus:border-sky-500 ${className} ${error ? 'border-red-500' : ''}`}
            placeholder={placeholder}
            disabled={disabled}
            type={type}
            onChange={onChange}
            onKeyDown={onKeyDown}
            onPaste={onPaste}
          />
          {leftIcon && (
            <div className={`absolute inset-y-0 right-0 flex items-center ${outline ? 'text-orange-text' : 'text-slate-400'}`}>{leftIcon}</div>
          )}
        </div>
        {error && <p className="pb-0 text-red-500 text-sm mt-1">{error}</p>}
      </div>
    );
  },
);

export default Input;
