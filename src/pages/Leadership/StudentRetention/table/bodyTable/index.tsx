import './styleBodyTable.scss';
import eye from './../../../../../assets/images/people/fi_eye_true.png';
import arrow from './../../../../../assets/icons/u_arrow up down.png';

import { data as dataDemo } from './data';
const TableBody = () => {
  return (
    <>
      <div className="table-container">
        <table className="student-table">
          <thead className="bg-br-gradient-right-or">
            <tr>
              <th>
                <div className="th-content">
                  Mã học viên
                  <img src={arrow} alt="Sort Icon" className="sort-icon" />
                </div>
              </th>
              <th>
                <div className="th-content">
                  Tên học viên
                  <img src={arrow} alt="Sort Icon" className="sort-icon" />
                </div>
              </th>
              <th>
                <div className="th-content">
                  Ngày sinh
                  <img src={arrow} alt="Sort Icon" className="sort-icon" />
                </div>
              </th>
              <th>
                <div className="th-content">
                  Giới tính
                  <img src={arrow} alt="Sort Icon" className="sort-icon" />
                </div>
              </th>
              <th>
                <div className="th-content">
                  Lớp bảo lưu
                  <img src={arrow} alt="Sort Icon" className="sort-icon" />
                </div>
              </th>
              <th>
                <div className="th-content">
                  Ngày bảo lưu
                  <img src={arrow} alt="Sort Icon" className="sort-icon" />
                </div>
              </th>
              <th>
                <div className="th-content">
                  Thời gian
                  <img src={arrow} alt="Sort Icon" className="sort-icon" />
                </div>
              </th>
              <th>
                <div className="th-content">
                  Lý do
                  <img src={arrow} alt="Sort Icon" className="sort-icon" />
                </div>
              </th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {dataDemo.map((student, index) => (
              <tr key={index}>
                <td>{student.id}</td>
                <td>{student.name}</td>
                <td>{student.birthDate}</td>
                <td>{student.gender}</td>
                <td>{student.class}</td>
                <td>{student.retentionDate}</td>
                <td>{student.semester}</td>
                <td>{student.reason}</td>
                <td className="eye-icon">
                  <img src={eye} alt="" />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default TableBody;
