import React, { useState } from 'react';
import { Item, FrameTimeProps } from './type'; // Điều chỉnh đường dẫn nếu cần
import './style.css';

function FrameTime({ items }: FrameTimeProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  return (
    <div className="container">
      <div className="card">
        <div className="card-2">
          <div className="title">{items[currentIndex]?.title}</div>
        </div>
        <div className="time">{items[currentIndex]?.time}</div>
      </div>
    </div>
  );
}

export default FrameTime;
