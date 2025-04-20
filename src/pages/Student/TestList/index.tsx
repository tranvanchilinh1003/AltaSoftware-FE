import React, { useEffect, useState } from 'react';
import AllTest from './AllTest';
import TestFinal from './TestFinal';
import TestUpComing from './TestUpComing';
import { fetchInstance } from '../../../config';
import Dropdown from '../../../components/Dropdown';
import CalendarInput from '../../../components/CalendarInput';
import Button from '../../../components/Button';
import icon from '../../../components/SearchInput/icon';
import { useNavigate } from 'react-router';
import PaginationControls from '../../../components/Pagination';
import Loading from '../../../components/Loading';

const TestList = () => {
  const [activeTab, setActiveTab] = useState(0);
  const navigate = useNavigate();
  const [testList, setTestList] = useState([
    {
      status: 0,
      tinhTrang: 0,
      trangThai: '',
      coTheThi: false,
      test: {
        id: 1,
        name: 'Kiểm tra giữa kỳ Toán',
        type: 0,
        durationTime: 60,
        startTime: '2024-03-10T08:00:00',
        endTime: '2024-03-10T09:00:00',
        file: null,
        description: 'Bài kiểm tra giữa kỳ môn Toán Cao Cấp',
        classIds: '1,2',
        fileSubmit: true,
        subject: {
          id: 5,
          code: 'SU101',
          name: 'Lịch sử',
          hoursSemester1: 40,
          hoursSemester2: 40,
          subjectGroup: {
            id: 2,
            name: 'Khoa học xã hội',
            teacherId: 2,
          },
          subjectType: {
            id: 1,
            name: 'Cơ bản',
            status: true,
            description: 'Môn học bắt buộc cho tất cả học sinh',
            date: '2022-08-05T10:00:00',
          },
        },
        teacher: {
          id: 21,
          code: 'U021',
          fullName: 'Tran Van U',
          dob: '2003-09-19T00:00:00',
          gender: true,
          email: 'tvu@gmail.com',
          phoneNumber: '0912345698',
        },
        gradeLevel: {
          id: 1,
          code: 'GL001',
          name: 'Lớp 1',
          teacherId: '1',
        },
      },
      user: {
        id: 24,
        code: 'U024',
        fullName: 'Pham Thi X',
        dob: '2004-05-15T00:00:00',
        gender: false,
        email: 'ptx@gmail.com',
      },
    },
  ]);

  useEffect(() => {
    getAllTest();
  }, [activeTab]);

  const getStatus = (startTime: string, endTime: string): number => {
    const now = new Date();
    const start = new Date('2024-03-10T09:00:00');
    const end = new Date(endTime);
    if (now < start) return 0;
    if (now > end) return 2;
    return 1;
  };

  const getAllTest = () => {
    setDataFilter((pre) => ({
      ...pre,
      loading: true,
    }));
    let dateFilter =
      dataFilter.date instanceof Date
        ? `${dataFilter.date.getFullYear()}-${String(dataFilter.date.getMonth() + 1).padStart(2, '0')}-${String(dataFilter.date.getDate()).padStart(
            2,
            '0',
          )}`
        : '';
    fetchInstance
      .get(
        `/test/get-by-students?page=${dataFilter.page}&pageSize=${dataFilter.pageSize}&status=${activeTab}&${
          dataFilter.subjectGroupId.value !== '-1' ? 'subjectGroupId=' + dataFilter.subjectGroupId.value : ''
        }&${dataFilter.gradleLevel.value !== '-1' ? 'gradeLevelsId=' + dataFilter.gradleLevel.value : ''}&${
          dataFilter.isChoose ? 'date' : ''
        }=${dateFilter}&search=${dataFilter.content}`,
      )
      .then((v) => {
        if (v.data !== undefined) {
          dataFilter.totalPage = v.totalPages;
          const updatedData = v.data.map((vv: any) => {
            let tinhTrang = getStatus(vv.test.startTime + '', vv.test.startTime + '');
            let coTheThi = false;
            let trangThai = '';
            if (tinhTrang === 0) {
              trangThai = 'Chưa diễn ra';
            } else if (tinhTrang === 1) {
              if (vv.test.type === 0) {
                if (vv.status === 0) {
                  trangThai = 'Bắt đầu';
                  coTheThi = true;
                } else {
                  trangThai = 'Đã nộp bài';
                }
              } else {
                trangThai = 'Tiếp tục làm';
                coTheThi = true;
              }
            } else {
              if (vv.status === 0) {
                trangThai = 'Không nộp bài';
              } else {
                trangThai = 'Đã nộp bài';
              }
            }
            return {
              ...vv,
              tinhTrang: tinhTrang,
              trangThai: trangThai,
              coTheThi: coTheThi,
            };
          });
          setTestList(updatedData);
        } else {
          setTestList([]);
        }
      })
      .catch((error) => {
        console.log('CÓ LỖI FETCH');
      })
      .finally(() => {
        setDataFilter((pre) => ({
          ...pre,
          loading: false,
        }));
      });
  };

  const [dataFilter, setDataFilter] = useState({
    subjectGroupId: { value: '-1', label: '' },
    content: '',
    date: new Date(),
    gradleLevel: { value: '-1', label: '' },
    isChoose: false,
    page: 1,
    pageSize: 10,
    totalPage: 1,
    loading: true,
  });

  useEffect(() => {
    getSubjectGroup();
    getAllTest();
  }, []);
  const tabs = [
    { id: 0, title: 'Tất cả bài kiểm tra', component: <AllTest /> },
    { id: 1, title: 'Bài kiểm tra sắp tới', component: <TestUpComing /> },
    { id: 2, title: 'Bài kiểm tra đã hoàn thành', component: <TestFinal /> },
  ];

  const [filter, setFilter] = useState({
    groupSubject: [
      {
        value: '1',
        label: 'Khoa học tự nhiên',
      },
    ],
    groupGradleLevel: [
      {
        value: '1',
        label: 'Lớp 1',
      },
    ],
    type: 0,
  });
  const getSubjectGroup = () => {
    fetchInstance
      .get('/subject-groups')
      .then((response) => {
        let c = response.data;
        setFilter((prev) => ({
          ...prev,
          groupSubject: c.map((vv: any) => ({
            value: String(vv.id),
            label: vv.name || 'Không có tên',
          })),
        }));
      })
      .catch((error) => {});
    fetchInstance.get('/grade-levels').then((v) => {
      let c = v.data;
      setFilter((prev) => ({
        ...prev,
        groupGradleLevel: c.map((vv: any) => ({
          value: String(vv.id),
          label: vv.name || 'Không có tên',
        })),
      }));
    });
  };

  function formatDateTime(isoString: string) {
    const date = new Date(isoString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');
    return `${year}/${month}/${day} ${hours}:${minutes}:${seconds}`;
  }

  return (
    <>
      <div className="w-full mx-auto p-4">
        <Loading isLoading={dataFilter.loading} />

        {/* Tab Buttons */}
        <div className="flex border-b border-white h-14">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              className={`py-2 px-6 font-medium transition duration-300 focus:outline-none
        ${
          activeTab === tab.id
            ? 'bg-background-orange-1 text-white border border-border-orange rounded-t-lg'
            : 'bg-white text-black border border-orange-300 rounded-t-lg hover:bg-border-orange'
        }`}
              onClick={() => setActiveTab(tab.id)}
            >
              {tab.title}
            </button>
          ))}
        </div>

        <div className="block h-full w-full">
          <div className="flex items-center justify-between mb-6 px-2 md:px-10 w-full">
            <div className="flex space-x-3">
              <div>
                <div className="text-lg font-bold">Chọn bộ môn</div>
                <Dropdown
                  placeholder="Chọn bộ môn"
                  options={filter.groupSubject}
                  handleOptionClick={(vv) => {
                    setDataFilter((pre) => ({
                      ...pre,
                      subjectGroupId: vv,
                    }));
                  }}
                  selectedOption={dataFilter.subjectGroupId.value == '-1' ? null : dataFilter.subjectGroupId}
                />
              </div>
              <div>
                <div className="text-lg font-bold">Chọn khối</div>
                <Dropdown
                  handleOptionClick={(vv) => {
                    setDataFilter((pre) => ({
                      ...pre,
                      gradleLevel: vv,
                    }));
                  }}
                  placeholder="Chọn khoa khối"
                  options={filter.groupGradleLevel}
                  selectedOption={dataFilter.gradleLevel.value == '-1' ? null : dataFilter.gradleLevel}
                />
              </div>
              <div>
                <div className="text-lg font-bold">Chọn ngày</div>
                <CalendarInput
                  popupStyle={{ top: '28.1em' }}
                  selectedDate={dataFilter.isChoose ? dataFilter.date : null}
                  onDateChange={(vv) => {
                    dataFilter.isChoose = true;
                    setDataFilter((pre) => ({
                      ...pre,
                      date: new Date(vv + ''),
                    }));
                  }}
                />
              </div>
              <div className="mt-5">
                <Button
                  onClick={() => {
                    getAllTest();
                  }}
                  children={'Lọc kết quả'}
                  className="primary btn-custom"
                />
              </div>
            </div>
            <div className="relative w-[430px] h-[30px] mt-3 ">
              <img src={icon.searchIcon} alt="icon" className="absolute left-3 top-1/2 -translate-y-1/2 w-6 h-6 text-gray-400" />
              <input
                type="text"
                onChange={(e) => {
                  dataFilter.content = e.target.value;
                }}
                placeholder={'Nhập nội dung'}
                className="w-full h-full pl-10 pr-4 rounded-full border-none bg-gray-100 focus:outline-none"
              />
            </div>
          </div>

          {/* Bảng hiển thị */}
          <div className="overflow-x-auto flex-grow px-2 md:px-10 w-full">
            <div className="relative w-full border rounded-lg overflow-hidden">
              <table className="table-auto min-w-full border-collapse overflow-hidden rounded-t-lg">
                {/* Header */}
                <thead className="bg-gradient-to-r from-background-orange-1 to-background-1 text-white">
                  <tr>
                    <th className="py-2 px-4 text-left text-sm md:text-base font-semibold w-1/7">
                      <div className="flex items-center gap-2">
                        <span>Lớp</span>
                        {/* <img src={icon.arrow} alt="Sort" className="w-5 h-5 md:w-6 md:h-6 cursor-pointer" /> */}
                      </div>
                    </th>
                    <th className="py-2 px-4 text-left text-sm md:text-base font-semibold w-1/7">Nội dung kiểm tra</th>
                    <th className="py-2 px-4 text-left text-sm md:text-base font-semibold w-1/7">
                      <div className="flex items-center gap-2">
                        <span>Giáo viên</span>
                        {/* <img src={icon.arrow} alt="Sort" className="w-5 h-5 md:w-6 md:h-6 cursor-pointer" /> */}
                      </div>
                    </th>
                    <th className="py-2 px-4 text-left text-sm md:text-base font-semibold w-1/7">Ngày làm bài</th>
                    <th className="py-2 px-4 text-left text-sm md:text-base font-semibold w-1/7">Thời lượng</th>
                    <th className="py-2 px-4 text-left text-sm md:text-base font-semibold w-1/7">Tình trạng</th>
                    <th className="py-2 px-4 text-left text-sm md:text-base font-semibold w-1/7">Bài làm</th>
                    <th className="w-16"></th> {/* Cột cuối để căn chỉnh */}
                  </tr>
                </thead>

                {/* Body */}
                <tbody className="max-h-48 overflow-y-auto">
                  {testList.map((item, index) => (
                    <tr key={index} className={`border-b ${index % 2 === 1 ? 'bg-gray-100' : ''}`}>
                      <td className="py-3 px-4">{item.test.subject.name}</td>
                      <td className="py-3 px-4">{item.test.description}</td>
                      <td className="py-3 px-4">{item.test.teacher.fullName}</td>
                      <td className="py-3 px-4">{formatDateTime(item.test.startTime)}</td>
                      <td className="py-3 px-4">{item.test.durationTime}</td>
                      <td
                        className={`py-3 px-4 text-left italic ${
                          item.tinhTrang === 1
                            ? 'text-blue-500'
                            : item.tinhTrang === 2
                            ? 'text-green-500'
                            : item.tinhTrang === 0
                            ? 'text-red-500'
                            : 'text-red-500'
                        }`}
                      >
                        {item.tinhTrang === 0 ? 'Chưa bắt đầu' : item.tinhTrang === 1 ? 'Đang diễn ra' : 'Đã kết thúc '}
                      </td>
                      <td
                        className={`   flex justify-center items-center    italic  ${
                          item.status === 1
                            ? 'text-blue-500'
                            : item.status === 2
                            ? 'text-red-500'
                            : item.status === 0
                            ? 'text-gray-500'
                            : 'text-green-500'
                        }`}
                      >
                        {item.coTheThi ? (
                          <Button
                            onClick={() => {
                              if (item.test.type === 0) {
                                navigate('/student/quiz?id=' + item.test.id);
                              } else {
                                navigate('/student/essay?id=' + item.test.id);
                              }
                            }}
                            className="ml-2 primary"
                          >
                            {item.trangThai}
                          </Button>
                        ) : item.tinhTrang === 2 ? (
                          <p className={item.status === 0 ? ' ' : 'text-green-500 pt-2'}>{item.trangThai}</p>
                        ) : (
                          <p className={item.status === 1 && item.tinhTrang !== 0 ? 'text-green-500 ' : 'text-red-500'}>{item.trangThai}</p>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {testList.length == 0 && <p className="m-5 text-gray-600 text-center w-full">Không tìm thấy bài kiểm tra</p>}
              <div className="w-full">
                <PaginationControls
                  currentPage={dataFilter.page}
                  itemsPerPage={dataFilter.pageSize}
                  onPageChange={(v) => {
                    dataFilter.page = v;
                    getAllTest();
                  }}
                  setItemsPerPage={(v) => {
                    if (v < 1) {
                      return;
                    }
                    setDataFilter((prev) => ({
                      ...prev,
                      pageSize: v,
                    }));
                    dataFilter.pageSize = v;
                  }}
                  totalPages={dataFilter.totalPage}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default TestList;
