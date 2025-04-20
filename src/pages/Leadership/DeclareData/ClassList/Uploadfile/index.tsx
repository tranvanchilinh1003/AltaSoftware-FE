import React from 'react';
import './model.css';

const Uploadfile = () => {
  return (
    <div className="container">
      <div className="modal">
        <h2>Tải lên file</h2>

        <div className="form-group form-group1">
          <label htmlFor="file-upload">Tệp đính kèm:</label>
          <div className="input-container">
          
            <input type="text" id="file-upload" value="HTKT_KT45P_10A1.doc" readOnly />
          </div>
          <button className="custom-file-upload">Chọn tệp tải lên...</button>
        </div>

        <div className="form-group form-group2">
            <label>Tải file mẫu:</label>
            <a href="#" className="sample-file"> [Tải xuống file mẫu]</a>

          
        
        </div>

        <div className="button-group">
          <button className="cancel-button">Hủy</button>
          <button className="upload-button">Tải lên</button>
        </div>
      </div>
    </div>
  );
};

export default Uploadfile;