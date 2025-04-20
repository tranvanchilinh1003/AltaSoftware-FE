import React, { useEffect, useState } from 'react';
import Icon from './icon';
import './style.css';
import Checkbox from '../../../../../components/CheckBox';
import Dropdown from '../../../../../components/Dropdown';
import Button from '../../../../../components/Button';
import axios from 'axios';
import { fetchInstance } from '../../../../../config';
import { toast } from 'react-toastify';
import { useNavigate, useSearchParams } from 'react-router';
const NewClassForm: React.FC = () => {
  const [data, setData] = useState({
    gradeLevels: [],
    academicYears: [],
    teachers: [],
  });
  const [searchParams] = useSearchParams();
  const id = searchParams.get('id');
  useEffect(() => {
    if (id != null) {
      fetchInstance
        .get(`/class/${id}`)
        .then((v) => {
          let data = v.data;
          if (Array.isArray(data.subjects)) {
            data.subjects = data.subjects.map((b: { id: number; name: string }) => {
              return { label: b.name, value: b.id };
            });
          }
          axios
            .get('https://fivefood.shop/api/class-type?page=1&pageSize=10&sortColumn=Id&sortOrder=asc&searchYear=' + data.academicYear.id)
            .then((v) => {
              setClassTypess(v.data.data);
            });
          fetchInstance
            .get('/subjects/get-by-academic-year?academicYearId=' + data.academicYear.id)
            .then((v) => {
              setSubjects(v.data);
            })
            .catch((error) => {
              console.log('Không có dữ liệu');
            });
          console.log(data);
          data.academicYearId = { label: data.academicYear.name, value: data.academicYear.id };
          data.gradeLevelId = { label: '12', value: data.gradeLevel.id };
          data.classTypeId = { label: data.classType.name, value: data.classType.id };
          data.userId = { label: data.user.fullName, value: data.user.id };
          setClassInsert(data);
        })
        .catch((error) => {
          navigate('/leadership/declare-data/class-list');
          console.log(error);
        });
    } else {
      navigate('/declare-data/class-list');
    }
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [gradeLevelRes, academicYearRes, teacherListRes] = await Promise.all([
          fetchInstance.get('/grade-levels'),
          fetchInstance.get('/academic-years'),
          fetchInstance.get('/teacherlists?page=1&pageSize=1000&sortColumn=Id&sortOrder=asc'),
        ]);

        setData({
          gradeLevels: gradeLevelRes.data,
          academicYears: academicYearRes.data,
          teachers: teacherListRes.data,
        });
      } catch (error) {
        console.error('Có lỗi xảy ra khi fetch dữ liệu:', error);
      }
    };
    fetchInstance.get('/teacherlists/1');
    fetchData();
  }, []);

  const [classTypes, setClassTypess] = useState([]);
  const [isChecked, setIsChecked] = useState(false);
  const [showSubjectDropdown, setShowSubjectDropdown] = useState(false);
  const [classInsert, setClassInsert] = useState({
    code: '',
    name: '',
    studentQuantity: 50,
    subjectQuantity: 0,
    description: '',
    gradeLevelId: { label: '', value: '-1' },
    academicYearId: { label: '', value: '-1' },
    userId: { label: '', value: '-1' },
    classTypeId: { label: '', value: '-1' },
    subjects: [] as { label: string; value: string }[],
    academicYearTest: { label: '', value: '-1' },
  });

  const [subjects, setSubjects] = useState([]);

  const navigate = useNavigate();
  const handleCancel = () => {
    console.log('Cancel clicked');
  };

  const handleSave = () => {
    const { academicYearId, gradeLevelId, classTypeId, userId, subjects } = classInsert;

    // console.log(classInsert.subjects);
    if (Number(academicYearId.value) === -1) {
      toast.error('Chưa chọn niên khóa');
      return;
    }
    if (Number(gradeLevelId.value) === -1) {
      toast.error('Chưa chọn khoa khối');
      return;
    }
    if (Number(classTypeId.value) === -1) {
      toast.error('Chưa chọn loại lớp học');
      return;
    }
    if (Number(userId.value) === -1) {
      toast.error('Chưa chọn giáo viên');
      return;
    }
    if (classInsert.name.trim().length < 1) {
      toast.error('Vui lòng nhập tên lớp');
      return;
    }
    if (subjects.length > 0) {
      let a = subjects.map((v) => v.value);
      const dataSend = {
        code: classInsert.code,
        name: classInsert.name,
        studentQuantity: classInsert.studentQuantity,
        subjectQuantity: subjects.length,
        description: classInsert.description,
        gradeLevelId: classInsert.gradeLevelId.value,
        academicYearId: classInsert.academicYearId.value,
        userId: classInsert.userId.value,
        classTypeId: classInsert.classTypeId.value,
        subjects: a,
      };

      fetchInstance
        .put(`/class/${id}`, dataSend)
        .then((v) => {
          toast.success('Cập nhật thành công');
          navigate('/leadership/declare-data/class-list');
        })
        .catch((error) => {
          // navigate('/leadership/declare-data/class-list');
          toast.error(error.message);
          console.log(error.message);
        });
      return;
    } else {
      toast.error('Vui lòng thêm môn học');
    }
  };

  return (
    <div className="flex flex-col items-center">
      <h1 className="text-3xl font-bold text-black-text">Thêm lớp học mới</h1>
      <div className="w-full max-w-5xl p-6 mt-3">
        <h3 className="text-lg font-bold text-orange-text mb-4">Thông tin chung</h3>
        <form action="">
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center">
                <label className="font-bold text-black-text w-28">Niên khóa:</label>
                <Dropdown
                  placeholder="Chọn niên khóa"
                  handleOptionClick={(v) => {
                    classInsert.classTypeId = { value: '-1', label: '' };
                    fetchInstance
                      .get('/subjects/get-by-academic-year?academicYearId=' + v.value)
                      .then((v) => {
                        setSubjects(v.data);
                      })
                      .catch((error) => {
                        setSubjects([]);
                        console.log('Không có dữ liệu');
                      });
                    axios
                      .get('https://fivefood.shop/api/class-type?page=1&pageSize=10&sortColumn=Id&sortOrder=asc&searchYear=' + v.value)
                      .then((v) => {
                        setClassTypess(v.data.data);
                      })
                      .catch((error) => {
                        console.log('Có Lỗi');
                      });
                    setClassInsert((prev) => ({
                      ...prev,
                      academicYearId: v,
                    }));
                  }}
                  selectedOption={classInsert.academicYearId.value == '-1' ? null : classInsert.academicYearId}
                  options={data.academicYears.map((v, index) => {
                    return { label: v['name'], value: v['id'] + '' };
                  })}
                />
              </div>
              <div className="flex justify-end items-center">
                <label className="  whitespace-nowrap font-bold text-black-text w-28  ">
                  Khoa - Khối:
                  <span className="text-red-500">*</span>
                </label>
                <Dropdown
                  placeholder="Chọn khoa khối"
                  handleOptionClick={(v) => {
                    setClassInsert((prev) => ({
                      ...prev,
                      gradeLevelId: v,
                    }));
                  }}
                  selectedOption={classInsert.gradeLevelId.value == '-1' ? null : classInsert.gradeLevelId}
                  options={data.gradeLevels.map((v, index) => {
                    return { label: v['name'], value: v['id'] + '' };
                  })}
                />
              </div>
            </div>
            <div className="flex">
              <label className="font-bold text-black-text mt-2 w-44">
                Tên lớp:
                <span className="text-red-500">*</span>
              </label>
              <input
                value={classInsert.name}
                type="text"
                onChange={(e) => {
                  setClassInsert((pre) => {
                    return { ...pre, name: e.target.value };
                  });
                }}
                className="flex-1 h-10 border w-full border-gray-300 rounded-lg px-3"
              />
            </div>

            <div className="flex">
              <label className="font-bold text-black-text w-44  mt-2">
                Số lượng học viên: <span className="text-red-500">*</span>
              </label>
              <input
                onChange={(e) => {
                  let value = e.target.value;
                  if (Number(value) > 0) {
                    setClassInsert((prev) => ({
                      ...prev,
                      studentQuantity: Number(value),
                    }));
                  }
                }}
                value={classInsert.studentQuantity}
                type="number"
                className="flex-1 h-10 border w-full border-gray-300 rounded-lg px-3"
              />
            </div>

            <div className="flex">
              <label className="font-bold text-black-text w-44  mt-2">
                Phân loại lớp học: <span className="text-red-500">*</span>
              </label>
              <div style={{ width: '500px' }}>
                <Dropdown
                  placeholder="Phân loại lớp"
                  options={classTypes.map((v, index) => {
                    return { label: v['name'], value: v['id'] + '' };
                  })}
                  selectedOption={classInsert.classTypeId.value === '-1' ? null : classInsert.classTypeId}
                  handleOptionClick={(v) => {
                    setClassInsert((prev) => ({
                      ...prev,
                      classTypeId: v,
                    }));
                  }}
                  size={'long'}
                />
              </div>
            </div>

            <div className="flex">
              <label className="font-bold text-black-text w-48 mt-2">Giáo viên chủ nhiệm:</label>
              <div style={{ width: '500px' }}>
                <Dropdown
                  placeholder="Chọn giáo viên chủ nhiệm"
                  options={data.teachers.map((v, index) => {
                    return { label: v['fullName'], value: v['userId'] + '' };
                  })}
                  selectedOption={classInsert.userId.value === '-1' ? null : classInsert.userId}
                  handleOptionClick={(v) => {
                    setClassInsert((prev) => ({
                      ...prev,
                      userId: v,
                    }));
                  }}
                  size={'long'}
                />
              </div>
            </div>

            <hr />
          </div>

          <h3 className="text-lg font-bold text-orange-text mb-3">Danh sách môn học</h3>

          <div className="flex items-center mb-2 gap-2 flex-nowrap">
            <Checkbox
              isChecked={isChecked}
              onChange={(e) => {
                setClassInsert((pre) => ({
                  ...pre,
                  subjects: [],
                }));
                setIsChecked(e.target.checked);
              }}
            />
            {/* <p className=" bg-red-500 whitespace-nowrap">Kế thừa:</p> */}
            <p className="ms-3   whitespace-nowrap leading-none p-0 m-0 flex items-center">Kế thừa:</p>

            <Dropdown
              placeholder="Chọn niên khóa"
              handleOptionClick={(v) => {
                classInsert.academicYearTest = v;
                fetchInstance
                  .get('/subjects/get-by-academic-year?academicYearId=' + v.value)
                  .then((v) => {
                    setClassInsert((pre) => ({
                      ...pre,
                      subjects: v.data.map((v: { id: string; name: string }) => ({ value: v.id, label: v.name })),
                    }));
                  })
                  .catch((error) => {
                    setClassInsert((pre) => ({
                      ...pre,
                      subjects: [],
                    }));

                    toast.error('Không tìm thấy môn học nào cho niên khóa này');
                  });
              }}
              disabled={!isChecked}
              selectedOption={classInsert.academicYearTest}
              options={data.academicYears.map((v, index) => ({
                label: v['name'],
                value: v['id'] + '',
              }))}
            />
          </div>

          {/* Danh sách môn học đã chọn */}
          <div className="flex flex-wrap gap-5 ">
            {classInsert.subjects.map((subject, index) => (
              <div key={index} className="flex items-center py-1 ">
                <img
                  onClick={() => {
                    setClassInsert((prev) => ({
                      ...prev,
                      subjects: prev.subjects.filter((_, i) => i !== index), // Xóa phần tử tại index
                    }));
                  }}
                  src={Icon.plus}
                  alt="icon"
                  className="w-4 h-4 cursor-pointer"
                />
                <p className="p-2">{subject.label}</p>
              </div>
            ))}
          </div>

          <div className="relative">
            <div className="flex items-center mt-2 cursor-pointer" onClick={() => setShowSubjectDropdown(!showSubjectDropdown)}>
              <img src={Icon.fiplus} alt="icon" className="w-5 h-5" />
              {!showSubjectDropdown && <p className="ms-3   whitespace-nowrap leading-none p-0 m-0 flex items-center">Thêm môn</p>}
            </div>

            {showSubjectDropdown && (
              <div className="absolute left-8 z-10 option-css">
                <Dropdown
                  disabled={isChecked}
                  options={subjects
                    .filter((item2) => !classInsert.subjects.some((item1) => item1.value === item2['id']))
                    .map((v, index) => {
                      return {
                        label: v['name'],
                        value: v['id'],
                      };
                    })}
                  selectedOption={null}
                  handleOptionClick={(values) => {
                    let a = { label: values.label, value: values.value };
                    setClassInsert((prev) => ({
                      ...prev,
                      subjects: [...prev.subjects, a],
                    }));
                  }}
                  size={'short'}
                  showArrow={false}
                />
              </div>
            )}
          </div>

          <div className="flex justify-center mt-6 space-x-10">
            <Button
              onClick={handleCancel}
              disabled={false}
              width="160px"
              height="52px"
              style={{
                backgroundColor: 'var(--background-gray)',
                border: 'var(--border-gray)',
                color: 'var(--text-white)',
              }}
            >
              Huỷ
            </Button>
            <Button
              onClick={handleSave}
              width="160px"
              height="52px"
              style={{
                backgroundColor: 'var(--background-orange-1)',
                border: 'var(--border-orange)',
                color: 'var(--text-white)',
              }}
            >
              Lưu
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NewClassForm;
