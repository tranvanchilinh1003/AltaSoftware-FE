import './styleBody.css';
import { data as dataDemo } from './data';
import arrow from './../../../../../assets/icons/u_arrow up down.png';
import Tick from './../../../../../assets/icons/Tick.png';
import mark from './../../../../../assets/icons/mark.png';

const TableBody = () => {
  const currentData = dataDemo;

  return (
    <>
      <div className="table-container">
        <div className="flex justify-between items-center pb-5">
          {/* Phần bên trái */}
          <div className="text-black">
            <span className="font-bold text-[28px]">HỌC KÌ 1</span>
            <b className="font-bold"> - </b>
            <span className="text-[#2EACEE] text-[18px] font-bold"> 10/13 môn đạt</span>
          </div>
          {/* Phần bên phải */}
          <button className="w-[130px] h-[40px] border-2 border-[#FF7506] bg-none text-[#FF7506] rounded-md hover:bg-[#FF7506] hover:text-white transition">
            In Bảng Điểm
          </button>
        </div>

        <div className="overflow-x-auto w-full">
          <div className="relative">
            <table className="student-table min-w-[1200px]">
              <thead className="thead bg-br-gradient-right-or sticky top-0 z-10">
                <tr>
                  <th>
                    <div className="th-content">
                      STT <img src={arrow} alt="Sort Icon" className="sort-icon" />
                    </div>
                  </th>
                  <th>
                    <div className="th-content">Môn học</div>
                  </th>
                  <th>
                    <div className="th-content">Giảng viên</div>
                  </th>
                  <th>
                    <div className="th-content">Chuyên cần</div>
                  </th>
                  <th>
                    <div className="th-content">Miệng</div>
                  </th>
                  <th>
                    <div className="th-content">15 phút</div>
                  </th>
                  <th>
                    <div className="th-content">Hệ số II</div>
                  </th>
                  <th>
                    <div className="th-content">Hệ số III</div>
                  </th>
                  <th>
                    <div className="th-content">Trung bình</div>
                  </th>
                  <th>
                    <div className="th-content">
                      Tổng điểm <br /> trung bình
                    </div>
                  </th>
                  <th>
                    <div className="th-content">Kết quả</div>
                  </th>
                  <th>
                    <div className="th-content">Ngày cập nhật</div>
                  </th>
                </tr>
              </thead>
              <tbody className="tbody max-h-[400px] overflow-y-auto">
                {currentData.map((student, index) => (
                  <tr key={student.id} className="student-table min-w-[1200px]">
                    <td data-label="STT">{student.id} </td>
                    <td data-label="Môn học">{student.subject}</td>
                    <td data-label="Giảng viên">{student.teacher}</td>
                    <td data-label="Chuyên cần">{student.attendance}</td>
                    <td data-label="Miệng">{student.oralScore}</td>
                    <td data-label="15 phút">{student.quizScore}</td>
                    <td data-label="Hệ số II">{student.midtermScore}</td>
                    <td data-label="Hệ số III">{student.finalScore}</td>
                    <td data-label="Trung bình">{student.averageScore}</td>
                    <td data-label="Tổng điểm trung bình" style={{ fontWeight: 700, color: Number(student.totalAverage) > 5 ? 'green' : 'red' }}>
                      {student.totalAverage}
                    </td>
                    <td data-label="Kết quả">
                      <img
                        src={Number(student.result) === 1 ? Tick : mark}
                        alt={Number(student.result) === 1 ? 'Tick' : 'Mark'}
                        style={{ width: '20px', height: '20px' }}
                      />
                    </td>
                    <td data-label="Ngày cập nhật" className="text-left">
                      <i>
                        Thứ 4, 16/03/2025 <br />
                        9:00 AM
                      </i>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default TableBody;
