import React, { useState } from 'react';
import { StarProps } from './type';
import StarIcon from './StarIcon';
import './style.css';
/**
 * Component Star dùng để hiển thị biểu tượng ngôi sao có thể chọn.
 * 
 * @param {boolean} selected - Trạng thái cho biết ngôi sao có được chọn hay không.
 * @param {Function} toggleSelect - Hàm callback để thay đổi trạng thái chọn của ngôi sao.
 */
const Star: React.FC<StarProps> = ({ selected, toggleSelect }) => {

  const handleClick = () => {
    toggleSelect();
  };

  return (
    <div className={`starContainer`} onClick={handleClick}>
      <img
        src={selected ? StarIcon.StarTrue : StarIcon.StarFalse}
        alt={selected ? 'ngôi sao đã chọn' : 'ngôi sao chưa chọn'}
        className="starImage"
      />
    </div>
  );
};

export default Star;