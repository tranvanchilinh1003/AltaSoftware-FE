import React from 'react';
import './style.scss';

const SharedScreen = () => {
  return (
    <div className="shared-screen">
      <div className="screen-content">
        <img src="https://i.pinimg.com/736x/17/a5/48/17a5482ec6dc0e2bdbe621526366812b.jpg" alt="Shared Screen" />
        <div className="controls">
          <button>🎤</button>
          <button>🎥</button>
        </div>
      </div>
      <p className="title">Lịch Sử Tiết 5: Tìm hiểu văn hóa Hy Lạp - GV: Trần Thanh Tâm</p>
    </div>
  );
};

export default SharedScreen;
