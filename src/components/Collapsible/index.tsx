import React, { useState } from 'react';
import { CollapsibleProps } from './type';
import './style.scss';
import ArrowDown from '../../assets/icons/icon-arrow-down.png';
import ArrowRight from '../../assets/icons/icon-arrow-right.png';

const Collapsible: React.FC<CollapsibleProps> = ({ title = 'Open Collapsible', children, className, style }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleCollapsible = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={`collapsible-container ${className || ''}`} style={style}>
      <button type="button" className={`collapsible-button ${isOpen ? 'open' : ''}`} onClick={toggleCollapsible}>
        <div className="collapsible-header">
          <span>
            <img src={isOpen ? ArrowDown : ArrowRight} alt="Arrow Icon" className="icon" />
          </span>
          <span className="title-text">{title}</span>
        </div>
      </button>
      <div className={`collapsible-content ${isOpen ? 'show' : ''}`}>{children}</div>
    </div>
  );
};

export default Collapsible;
// tại sao không dùng useRef
