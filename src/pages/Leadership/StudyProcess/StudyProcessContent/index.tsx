import React, { useEffect, useState, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Collapsible from '../../../../components/Collapsible';
import SemesterScoreTable from './SemesterScoreTable';
import createAxiosInstance from '../../../../utils/axiosInstance';
import { dataKi1, dataKi2 } from './data';
import search from '../../../../assets/icons/fi_search.png';
import edit from '../../../../assets/icons/fi_edit.png';
import trash from '../../../../assets/icons/fi_trash-2.png';
import DeleteConfirmation from '../../../../components/DeleteConfirmation';
import '../style.scss';

interface Award {
  id: number;
  content: string;
  file: string;
  dateAwarded: string;
}

const StudyProcessContent: React.FC = () => {
  const typingTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const location = useLocation();
  const state = location.state || {};
  const studentId = state.studentId;
  const academicYearId = state.academicYearId;

  const [info, setInfo] = useState<any>(null);
  const [rankingData, setRankingData] = useState<any[]>([]);
  const [activeButton, setActiveButton] = useState<string>('1');
  const [awards, setAwards] = useState<Award[]>([]);
  const [disciplines, setDisciplines] = useState<Award[]>([]);
  const [searchKeyword, setSearchKeyword] = useState('');
  const [loading, setLoading] = useState(false);

  const axiosInstance = createAxiosInstance(true);

  useEffect(() => {
    if (!academicYearId || !studentId) return;

    const fetchRanking = async () => {
      const res = await axiosInstance.get(`api/semesters/ranking?academicYearId=${academicYearId}&userId=${studentId}`);
      setRankingData(res.data?.data || []);
    };

    fetchRanking();
  }, [academicYearId, studentId]);

  useEffect(() => {
    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }

    typingTimeoutRef.current = setTimeout(() => {
      const fetchData = async () => {
        setLoading(true);
        try {
          const [resAwards, resDisciplines] = await Promise.all([
            axiosInstance.get('https://fivefood.shop/api/Achivement/GetAwards', {
              params: {
                page: 1,
                pageSize: 10,
                sortColumn: 'Id',
                sortOrder: 'asc',
                search: searchKeyword,
              },
            }),
            axiosInstance.get('https://fivefood.shop/api/Achivement/GetDisciplines', {
              params: {
                page: 1,
                pageSize: 10,
                sortColumn: 'Id',
                sortOrder: 'asc',
                search: searchKeyword,
              },
            }),
          ]);

          if (resAwards.data.code === 0) {
            const filtered = resAwards.data.data.filter((item: any) => item.typeValue === 'Rewards');
            setAwards(filtered);
          }

          if (resDisciplines.data.code === 0) {
            const filtered = resDisciplines.data.data.filter((item: any) => item.typeValue === 'Discipline');
            setDisciplines(filtered);
          }
        } catch (error) {
          console.error('Lỗi khi fetch danh sách khen thưởng/kỷ luật:', error);
        } finally {
          setLoading(false);
        }
      };

      fetchData();
    }, 500);

    return () => {
      if (typingTimeoutRef.current) {
        clearTimeout(typingTimeoutRef.current);
      }
    };
  }, [searchKeyword]);

  const buttons = [
    { label: 'KÌ I', value: '1' },
    { label: 'KÌ II', value: '2' },
  ];

  const renderComponent = () => {
    switch (activeButton) {
      case '1':
        return <SemesterScoreTable data={dataKi1} />;
      case '2':
        return <SemesterScoreTable data={dataKi2} />;
      default:
        return null;
    }
  };

  return (
    <>
      <div className="class-info-container">
        <div className="class-info-box">
          <h3 className="title">Thông tin chung</h3>
          <div className="content-study-process">
            <div className="info-column">
              <p>
                <strong>Niên khóa:</strong> {info?.academicYear?.name || '--'}
              </p>
              <p>
                <strong>Khoa - Khối:</strong> {info?.class?.gradeLevel?.name || '--'}
              </p>
              <p>
                <strong>Mã lớp học:</strong> {info?.class?.code || '--'}
              </p>
              <p>
                <strong>Tên lớp học:</strong> {info?.class?.name || '--'}
              </p>
            </div>
            <div className="info-column">
              <p>
                <strong>Giáo viên chủ nhiệm:</strong> {info?.class?.user?.fullName || '--'}
              </p>
              <p>
                <strong>Số lượng học viên:</strong> {info?.studentQty || 0} học viên
              </p>
              <p>
                <strong>Loại lớp học:</strong> {info?.class?.classType?.name || '--'}
              </p>
              <p>
                <strong>Số lượng môn học:</strong> {info?.subjectQty || 0} môn học
              </p>
            </div>
            <div className="info-description">
              <p>
                <strong>Mô tả:</strong> {info?.class?.description || 'Không có mô tả'}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Kết quả học tập */}
      <div className="collapsible">
        <Collapsible title="Kết quả học tập">
          <div className="p-4">
            {rankingData.length > 0 ? (
              <>
                <table className="w-full text-white bg-icon-color shadow-custom rounded-lg">
                  <thead>
                    <tr>
                      {rankingData.map((item, index) => (
                        <th key={index} className="border p-2">
                          {item.semester}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="bg-white text-black">
                    <tr>
                      {rankingData.map((item, index) => (
                        <td key={index} className="border p-2">
                          <div className="flex justify-around">
                            <div>
                              <p className="font-bold text-user-color">Học lực</p>
                              <p>{item.ranking}</p>
                            </div>
                            <div>
                              <p className="font-bold text-user-color">Hạnh kiểm</p>
                              <p>{item.conduct}</p>
                            </div>
                            <div>
                              <p className="font-bold text-user-color">Điểm trung bình</p>
                              <p className={item.averageScore >= 7 ? 'text-green-500' : 'text-red-500'}>{item.averageScore}</p>
                            </div>
                          </div>
                        </td>
                      ))}
                    </tr>
                  </tbody>
                </table>

                {/* Chọn học kỳ */}
                <div className="mt-4 w-full">
                  <div className="activeButton flex gap-3">
                    {buttons.map(({ label, value }) => (
                      <button key={value} className={`btn ${activeButton === value ? 'active' : ''}`} onClick={() => setActiveButton(value)}>
                        {label}
                      </button>
                    ))}
                  </div>
                  <div className="mt-4">{renderComponent()}</div>
                </div>
              </>
            ) : (
              <p className="text-center text-gray-500">Chưa có dữ liệu xếp loại học tập</p>
            )}
          </div>
        </Collapsible>
      </div>

      {/* Danh sách khen thưởng */}
      <div className="collapsible">
        <Collapsible title="Danh sách khen thưởng">
          <div className="search-container float-right mb-2">
            <button className="search-button">
              <img src={search} alt="search" className="icon-search" />
            </button>
            <input
              type="text"
              className="search-input"
              placeholder="Tìm kiếm..."
              value={searchKeyword}
              onChange={(e) => setSearchKeyword(e.target.value)}
            />
          </div>

          <div className="w-full overflow-hidden rounded-lg border border-gray-300">
            <div className="max-h-64 overflow-y-auto custom-scrollbar">
              <table className="w-full border-collapse">
                <thead className="bg-black-text text-white sticky top-0 z-10">
                  <tr>
                    <th className="text-center">STT</th>
                    <th className="text-left">Nội dung</th>
                    <th className="text-left">File</th>
                    <th className="text-left">Ngày tặng</th>
                    <th className="text-center">Thao tác</th>
                  </tr>
                </thead>
                <tbody>
                  {loading ? (
                    <tr>
                      <td colSpan={5} className="text-center p-4">
                        Đang tải...
                      </td>
                    </tr>
                  ) : awards.length === 0 ? (
                    <tr>
                      <td colSpan={5} className="text-center p-4">
                        Không có dữ liệu
                      </td>
                    </tr>
                  ) : (
                    awards.map((item, index) => (
                      <tr key={item.id} className="odd:bg-gray-100 even:bg-gray-200">
                        <td className="text-center">{index + 1}</td>
                        <td className="text-left break-words">{item.content}</td>
                        <td className="text-left">
                          <a href={`https://fivefood.shop/uploads/${item.file}`} target="_blank" rel="noreferrer" className="text-blue-600 underline">
                            {item.file}
                          </a>
                        </td>
                        <td className="text-left">{new Date(item.dateAwarded).toLocaleDateString('vi-VN')}</td>
                        <td className="text-center flex">
                          <Link to={`update-rewards`} className="p-1">
                            <img src={edit} alt="edit" className="w-5 h-5" />
                          </Link>
                          <Link to={`/delete-award/${item.id}`} className="p-1">
                            <img src={trash} alt="trash" className="w-5 h-5" />
                          </Link>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </Collapsible>
      </div>

      {/* Danh sách kỷ luật (tạm dùng static) */}
      <div className="collapsible">
        <Collapsible title="Danh sách kỷ luật">
          <div className="search-container float-right mb-2">
            <button className="search-button">
              <img src={search} alt="search" className="icon-search" />
            </button>
            <input
              type="text"
              className="search-input"
              placeholder="Tìm kiếm..."
              value={searchKeyword}
              onChange={(e) => setSearchKeyword(e.target.value)}
            />
          </div>

          <div className="w-full overflow-hidden rounded-lg border border-gray-300">
            <div className="max-h-64 overflow-y-auto custom-scrollbar">
              <table className="w-full border-collapse">
                <thead className="bg-black-text text-white sticky top-0 z-10">
                  <tr>
                    <th className="text-center">STT</th>
                    <th className="text-left">Nội dung Kỷ luật</th>
                    <th className="text-left">Quyết định Kỷ luật</th>
                    <th className="text-left">Ngày quyết định</th>
                    <th className="text-center">Thao tác</th>
                  </tr>
                </thead>
                <tbody>
                  {loading ? (
                    <tr>
                      <td colSpan={5} className="text-center p-4">
                        Đang tải...
                      </td>
                    </tr>
                  ) : disciplines.length === 0 ? (
                    <tr>
                      <td colSpan={5} className="text-center p-4">
                        Không có dữ liệu
                      </td>
                    </tr>
                  ) : (
                    disciplines.map((item, index) => (
                      <tr key={item.id} className="odd:bg-gray-100 even:bg-gray-200">
                        <td className="text-center">{index + 1}</td>
                        <td className="text-left break-words">{item.content}</td>
                        <td className="text-left">
                          <a href={`https://fivefood.shop/uploads/${item.file}`} target="_blank" rel="noreferrer" className="text-blue-600 underline">
                            {item.file}
                          </a>
                        </td>
                        <td className="text-left">{new Date(item.dateAwarded).toLocaleDateString('vi-VN')}</td>
                        <td className="text-center flex">
                          <Link to={`update-discipline`} className="p-1">
                            <img src={edit} alt="edit" className="w-5 h-5" />
                          </Link>
                          <Link to={`/delete-discipline/${item.id}`} className="p-1">
                            <img src={trash} alt="trash" className="w-5 h-5" />
                          </Link>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </Collapsible>
      </div>
    </>
  );
};

export default StudyProcessContent;
