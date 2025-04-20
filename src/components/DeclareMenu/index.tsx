import React, { useState, useEffect } from 'react';
import './style.scss';
import { Link, useLocation } from 'react-router-dom';

const DeclareMenu: React.FC = () => {
  const location = useLocation();
  const [selectedSchool, setSelectedSchool] = useState('THCS');
  const [selectedYear, setSelectedYear] = useState('2020 - 2021');
  const [activeMenu, setActiveMenu] = useState('Tổ - Bộ môn');

  const menuItems = [
    {
      label: 'Tổ - Bộ môn',
      path: '/leadership/declare-data',
      pathEdit: '/leadership/declare-data/edit',
      pathAdd: '/leadership/declare-data/add-declare-data',
    },
    {
      label: 'Niên khóa',
      path: '/leadership/declare-data/school-year',
      pathEdit: '/leadership/declare-data/school-year/edit-school-year',
      pathAdd: '/leadership/declare-data/school-year/add-school-year',
    },
    {
      label: 'Khoa - Khối',
      path: '/leadership/declare-data/block-department',
      pathEdit: '/leadership/declare-data/block-department/edit',
      pathAdd: '/leadership/declare-data/block-department/add-block-department',
    },
    { label: 'Môn học', path: '/leadership/declare-data/section-list', pathEdit: '/leadership/declare-data/section-list/edit', pathAdd: '/leadership/declare-data/section-list/add-section-list', },
    {
      label: 'Lớp học',
      path: '/leadership/declare-data/class-list',
      pathEdit: '/leadership/declare-data/class-list/edit',
      pathAdd: '/leadership/declare-data/class-list/add-class-list',
    },
    {
      label: 'Loại điểm',
      path: '/leadership/declare-data/score-types',
      pathEdit: '/leadership/declare-data/score-types/edit',
      pathAdd: '/leadership/declare-data/score-types/add-score-types',
    },
  ];

  useEffect(() => {
    const activeItem = menuItems.find(
      (item) => location.pathname === item.path || location.pathname === item.pathEdit || location.pathname === item.pathAdd,
    );
    if (activeItem) {
      setActiveMenu(activeItem.label);
    }
  }, [location.pathname]);

  return (
    <div className="declare-menu">
      <div className="menu-content">
        <div className="menu-select">
          <label>Đang chọn xem:</label>
        </div>
        <div className="menu-select">
          <label>Trường:</label>
          <select value={selectedSchool} onChange={(e) => setSelectedSchool(e.target.value)}>
            <option value="THCS">THCS</option>
            <option value="THPT">THPT</option>
            <option value="CH">CH</option>
          </select>
        </div>
        <div className="menu-select">
          <label>Niên khóa:</label>
          <select value={selectedYear} onChange={(e) => setSelectedYear(e.target.value)}>
            <option value="2020 - 2021">2020 - 2021</option>
            <option value="2015 - 2016">2015 - 2016</option>
            <option value="2016 - 2018">2016 - 2018</option>
          </select>
        </div>
      </div>
      <div className="menu-list">
        {menuItems.map((item) => (
          <Link
            key={item.label}
            to={item.path}
            className={`menu-item ${activeMenu === item.label ? 'active' : ''}`}
            onClick={() => setActiveMenu(item.label)}
          >
            {item.label}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default DeclareMenu;
