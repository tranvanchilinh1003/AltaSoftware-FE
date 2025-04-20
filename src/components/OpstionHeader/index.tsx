import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './style.scss';
import Button from '../Button';

const HeaderOption: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const handleAddNew = () => {
    const currentPath = location.pathname;
    const lastSegment = currentPath.split('/').pop();
    navigate(`${currentPath}/add-${lastSegment}`);
  };

  return (
    <div className="header-container-opstion">
      <header className="header">
        <p>Khai Báo Dữ Liệu</p>
      </header>
      <div className="button-container">
        <Button className="primary" size="big" onClick={handleAddNew}>
          + Thêm mới
        </Button>
      </div>
    </div>
  );
};

export default HeaderOption;
