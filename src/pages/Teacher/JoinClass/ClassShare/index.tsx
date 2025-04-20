import React from 'react';
import './style.scss';

const ClassShare = () => {
  return (
    <div className="class-share">
      <label>Chia sẻ tiết học:</label>
      <div className="share-content">
        <input type="text" value="https://school.edu.vn/baihoc/???????" readOnly />
        <button className="copy-btn">Copy link</button>
      </div>
    </div>
  );
};

export default ClassShare;
