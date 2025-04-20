import React from 'react';
import { SubjectButtonProps } from './types';
import Icons from './icons';
import './style.css';

const SubjectButton: React.FC<SubjectButtonProps> = ({
  title,
  backgroundColor,
  textColor,
  iconName,
  disabled = false,
  size = 'extra-large',
  iconPosition = 'right',
  onClose,
}) => {
  const handleIconClick = (onClose?: () => void) => (e: React.MouseEvent<HTMLSpanElement>) => {
    e.stopPropagation();
    if (onClose) {
      onClose();
    }
  };

  const IconComponent = iconName ? Icons[iconName as keyof typeof Icons] : null;
  const isImage = typeof IconComponent === 'string';

  return (
    <div className="group">
      <button
        className={`subject-button ${backgroundColor} ${textColor}-text ${size} ${disabled ? 'disabled' : ''}`}
        disabled={disabled}
      >
        {IconComponent && iconPosition === 'left' && (
          <span className="icon-wrapper" onClick={handleIconClick(onClose)}> 
            {isImage ? (
              <img src={IconComponent} alt={`${iconName} icon`} className="w-6 h-6" />
            ) : (
              React.createElement(IconComponent)
            )}
          </span>
        )}
        <p className='title'>
          {title}
        </p>

        {IconComponent && iconPosition === 'right' && (
          <span className="icon-wrapper" onClick={handleIconClick(onClose)}> 
            {isImage ? (
              <img src={IconComponent} alt={`${iconName} icon`} className="w-6 h-6" />
            ) : (
              React.createElement(IconComponent)
            )}
          </span>
        )}
      </button>
    </div>
  );
};

export default SubjectButton;
export type { SubjectButtonProps };
