import React, { useState, useEffect } from 'react';
import './style.css';
import { ModalProps } from './type';
import { useNavigate } from "react-router-dom";
import Button from '../../../../components/Button';
const EditDepartment: React.FC = () => {
  const [data, setData] = useState<ModalProps | null>(null);

  useEffect(() => {

    const sampleData: ModalProps = {
      code: 'MKU8327',
      faculty: 'Khoa học tự nhiên',
      headOfFaculty: 'Trần Thị B',
      facultyOptions: ['Trần Thị B', 'Nguyễn Văn C'],
      onClose: () => console.log('Modal closed'),
      onSave: () => console.log('Data saved'),
    };

    setData(sampleData);
  }, []);

  const [facultyName, setFacultyName] = useState('');
  const [selectedHead, setSelectedHead] = useState('');
  const navigate = useNavigate();
  const handleClose = () => {
    navigate("/leadership/declare-data/block-department", { replace: true });
  };

  const handleSave = () => { };

  if (!data) {
    return <div>Loading...</div>;
  }

  return (
    <div className="modal-overlay">
      <div className="modal-container">
        <h2 className="modal-title">Thiết lập Khoa - Khối</h2>

        <div className="modal-content">
          <div className="row">
            <label className="label">Mã khoa - khối:</label>
            <span className="text">{data.code}</span>
          </div>

          <div className="row">
            <label className="label">Khoa - khối:</label>
            <input type="text" value={data.faculty} className="input" onChange={(e) => setFacultyName(e.target.value)} />
          </div>
          <div className="row">
            <label className="label">Trưởng khoa - khối:</label>
            <div className="select-container">
              <select className="input" value={selectedHead} onChange={(e) => setSelectedHead(e.target.value)}>
                {data.facultyOptions.map((option, index) => (
                  <option key={index} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        <div className="modal-footer">
          <Button className="secondary" size='big' onClick={handleClose}>
            Hủy
          </Button>
          <Button className="primary" size='big' onClick={handleSave}>
            Lưu
          </Button>
        </div>
      </div>
    </div>
  );
};

export default EditDepartment;
