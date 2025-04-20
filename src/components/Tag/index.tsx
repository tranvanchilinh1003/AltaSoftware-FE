import React from 'react';
import { TagProp } from './type';
import './style.css';

const TagLayout: React.FC<TagProp> = ({ text, isActive, onClick }) => {
  return (
    <div className={`tag ${isActive ? 'active' : 'inactive'}`} onClick={onClick}>
      {text}
    </div>
  );
};

export default TagLayout;
