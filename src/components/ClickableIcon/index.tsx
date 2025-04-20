import React from 'react';
import { ClickableIconProps } from './type';
import IconImages from '../IconImages';
import './style.css';

const sizeClasses = {
  sm: 'w-6 h-6', // 24px
  md: 'w-8 h-8', // 32px
  lg: 'w-10 h-10', // 40px
  xl: 'w-12 h-12', // 48px
};

const ClickableIcon: React.FC<ClickableIconProps> = ({
  iconName,
  onClick,
  size = 'md',
  text = '', // Đảm bảo text không bị gán giá trị mặc định
  customStyles = {},
}) => {
  const iconToDisplay =
    IconImages[iconName as keyof typeof IconImages];

  return (
    <button
    type="button"  
      onClick={onClick}
      className={`clickable-icon ${sizeClasses[size]}`}
      style={customStyles.container}
    >
      {iconToDisplay && (
        <img
          src={iconToDisplay as string}
          alt="Clickable icon"
          className={`clickable-icon-img ${sizeClasses[size]}`}
          style={customStyles.icon}
        />
      )}
      {text && (
        <span
          className="text-sm font-semibold"
          style={customStyles.text}
        >
          {text}
        </span>
      )}
    </button>
  );
};

export default ClickableIcon;
