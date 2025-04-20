import { useState } from 'react';
import search from './../../../../assets/icons/fi_search.png';
import TableBody from './bodyTable';
import './styleTable.css';

const TableStudentRetention: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState<string>(''); // State lưu giá trị tìm kiếm

  return (
    <div>
      <div className="TableStudentRetentionsBoder">
        <div className="TableStudentRetentions">
          <div className="TableStudentRetention flex justify-between pr-8">
            <div className="mt-4">
              <p className="title-classrooomsettings">Danh sách học viên</p>
            </div>

            {/* Ô tìm kiếm */}
            <div className="search-classrooomsettings">
              <button className="search-button-classrooomsettings">
                <img src={search} alt="search" className="icon-search" />
              </button>
              <input
                type="text"
                className="search-input"
                placeholder="Tìm kiếm..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)} // Cập nhật giá trị tìm kiếm
              />
            </div>
          </div>

          {/* Truyền searchTerm xuống TableBody */}
          <div className="TableStudentRetention-Body w-full">
            <TableBody searchTerm={searchTerm} />
            {/* <TableBody /> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TableStudentRetention;
