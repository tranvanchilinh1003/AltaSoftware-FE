import TableBody from './bodyTable';
import { useState } from 'react';
import './style-Table.scss';
import arrow_left from './../../../../assets/icons/arrow left.png';
import arrow_right from './../../../../assets/icons/chevron_big_right.png';
import search from './../../../../assets/icons/fi_search.png';

interface HeaderSearchProps {
  title: string;
}

const TableStudentRetention: React.FC<HeaderSearchProps> = ({ title }) => {
  const [rowsPerPage, setRowsPerPage] = useState(8);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const totalPages = 100;

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <>
      <div className="TableStudentRetention">
        <div className="TableStudentRetention-Header">
          <div className="header-search">
            <h2 className="title">{title}</h2>
            <div className="search-box">
              <img src={search} alt="Search" className="search-icon" />
              <input type="text" className="search-input" placeholder="Tìm kiếm" />
            </div>
          </div>
        </div>
      </div>

      <div className="TableStudentRetention-Body">
        <TableBody />
      </div>

      <div className="TableStudentRetention-Footer">
        <div className="table-footer">
          <div className="rows-per-page">
            <span>Hiển thị</span>
            <input type="number" value={rowsPerPage} onChange={(e) => setRowsPerPage(Number(e.target.value))} />
            <span>hàng trong mỗi trang</span>
          </div>

          <div className="pagination">
            <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>
              <img src={arrow_left} alt="Sort Icon" className="sort-icon" />
            </button>

            <button onClick={() => handlePageChange(1)} className={currentPage === 1 ? 'active' : ''}>
              1
            </button>

            {currentPage > 2 && <span>...</span>}

            {currentPage > 1 && currentPage < totalPages && <button className="active">{currentPage}</button>}

            {currentPage < totalPages - 1 && <span>...</span>}

            <button onClick={() => handlePageChange(totalPages)} className={currentPage === totalPages ? 'active' : ''}>
              {totalPages}
            </button>

            <button onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages}>
              <img src={arrow_right} alt="Sort Icon" className="sort-icon" />
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default TableStudentRetention;
