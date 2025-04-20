import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import Dropdown from '../../../../components/Dropdown';
import { DropdownOption } from '../../../../components/Dropdown/type';
import CheckboxComponent from '../../../../components/CheckBox';
import Button from '../../../../components/Button';
import { useNavigate, useParams } from 'react-router-dom';
import { CustomMultiSelect, OptionType } from '../../../../components/CustomMultiSelect';
import { ClassItem } from './type';
import DateInput from '../../../../components/Date';
import dayjs from 'dayjs';
import createAxiosInstance from '../../../../utils/axiosInstance';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const API_URL = process.env.REACT_APP_API_URL;
const axiosInstance = createAxiosInstance();
const pageSize = 10;

const fetchAllClasses = async (
  option: 'all' | 'basic' | 'advanced' | 'custom',
  selectedGrade: DropdownOption | null,
  selectedSchoolYear: any,
): Promise<ClassItem[]> => {
  let url = '';
  if (option === 'all' || option === 'custom') {
    url = `${API_URL}/class/by-grade-academic`;
  } else if (option === 'basic') {
    url = `${API_URL}/class/classType-co-ban`;
  } else if (option === 'advanced') {
    url = `${API_URL}/class/classType-nang-cao`;
  }

  let allClasses: ClassItem[] = [];
  if (option === 'all' || option === 'custom') {
    let currentPage = 1;
    let totalPages = 1;
    do {
      try {
        const response = await axios.get(url, {
          params: {
            gradeLevelId: selectedGrade?.value,
            academicYearId: selectedSchoolYear?.id,
            page: currentPage,
            pageSize: pageSize,
          },
        });
        const data = response.data.data;
        const items = Array.isArray(data) ? data : data.items || [];
        allClasses = allClasses.concat(items);
        totalPages = data && data.totalPages ? data.totalPages : 1;
        currentPage++;
      } catch (error) {
        console.error('Error fetching classes:', error);
        break;
      }
    } while (currentPage <= totalPages);
  } else {
    try {
      const response = await axios.get(url, {
        params: {
          gradeLevelId: selectedGrade?.value,
          academicYearId: selectedSchoolYear?.id,
        },
      });
      const data = response.data.data;
      allClasses = Array.isArray(data) ? data : data.items || [];
    } catch (error) {
      console.error('Error fetching classes:', error);
    }
  }
  return allClasses;
};

const EditExamSchedule: React.FC = () => {
  const navigate = useNavigate();
  const { id: examScheduleId } = useParams<{ id: string }>();

  // Các state của form
  const [examTitle, setExamTitle] = useState('');
  const [examType, setExamType] = useState('');
  const [duration, setDuration] = useState(180);
  const [examDate, setExamDate] = useState<dayjs.Dayjs | null>(null);
  const [classOption, setClassOption] = useState<'all' | 'basic' | 'advanced' | 'custom'>('all');
  const [selectedCustomClasses, setSelectedCustomClasses] = useState<OptionType[]>([]);
  const [isCheckedHK1, setIsCheckedHK1] = useState(true);
  const [isCheckedHK2, setIsCheckedHK2] = useState(false);
  const [gradingOption, setGradingOption] = useState<'all' | 'custom'>('all');
  const [selectedGraders, setSelectedGraders] = useState<OptionType[]>([]);

  // Các state dữ liệu lớp và phân công chấm thi
  const [allClasses, setAllClasses] = useState<OptionType[]>([]);
  const [classAssignments, setClassAssignments] = useState<{ [classId: string]: OptionType[] }>({});
  // Thêm flag đánh dấu đã load dữ liệu assignments từ API chưa
  const [assignmentsLoaded, setAssignmentsLoaded] = useState(false);

  // State cho Dropdown: niên khóa, khối, môn học
  const [selectedSchoolYear, setSelectedSchoolYear] = useState<DropdownOption | null>(null);
  const [selectedAcademicYear, setSelectedAcademicYear] = useState<any>(null);
  const [selectedGrade, setSelectedGrade] = useState<DropdownOption | null>(null);
  const [selectedSubject, setSelectedSubject] = useState<DropdownOption | null>(null);

  const [academicYears, setAcademicYears] = useState<DropdownOption[]>([]);
  const [academicYearsData, setAcademicYearsData] = useState<any[]>([]);
  const [gradeLevels, setGradeLevels] = useState<DropdownOption[]>([]);
  const [subjects, setSubjects] = useState<DropdownOption[]>([]);

  // Phần lấy dữ liệu exam-graders với phân trang và infinite scroll
  const [graderOptions, setGraderOptions] = useState<OptionType[]>([]);
  const pageNumberRef = useRef(1);
  const [totalPages, setTotalPages] = useState(1);
  const graderContainerRef = useRef<HTMLDivElement>(null);

  const fetchGraders = async (page: number) => {
    try {
      const response = await axios.get(`${API_URL}/exam-graders`, {
        params: {
          pageNumber: page,
          pageSize: pageSize,
        },
      });
      const data = response.data.data;
      const newGraders = data.items.map((item: any) => ({
        value: item.userId,
        label: item.userName,
      }));
      setTotalPages(data.totalPages);
      if (page === 1) {
        setGraderOptions(newGraders);
      } else {
        setGraderOptions((prev) => [...prev, ...newGraders]);
      }
    } catch (error) {
      console.error('Error fetching exam graders:', error);
    }
  };

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const { scrollTop, scrollHeight, clientHeight } = e.currentTarget;
    setTimeout(() => {
      if (scrollHeight - scrollTop - clientHeight <= 50) {
        if (pageNumberRef.current < totalPages) {
          const nextPage = pageNumberRef.current + 1;
          pageNumberRef.current = nextPage;
          fetchGraders(nextPage);
        }
      }
    }, 100);
  };

  // Đồng bộ lại label giáo viên trong selectedGraders khi graderOptions thay đổi
  useEffect(() => {
    if (graderOptions.length > 0 && selectedGraders.length > 0) {
      const newSelectedGraders = selectedGraders.map((grader) => {
        const found = graderOptions.find((g) => g.value === grader.value);
        return {
          value: grader.value,
          label: found ? found.label : grader.label,
        };
      });
      setSelectedGraders(newSelectedGraders);
    }
  }, [graderOptions]);

  // Đồng bộ lại label giáo viên trong classAssignments khi graderOptions thay đổi
  useEffect(() => {
    if (graderOptions.length > 0 && Object.keys(classAssignments).length > 0) {
      const newAssignments: { [classId: string]: OptionType[] } = {};
      Object.keys(classAssignments).forEach((classId) => {
        newAssignments[classId] = classAssignments[classId].map((grader) => {
          const found = graderOptions.find((g) => g.value === grader.value);
          return {
            value: grader.value,
            label: found ? found.label : grader.label,
          };
        });
      });
      setClassAssignments(newAssignments);
    }
  }, [graderOptions]);

  // Hàm tải dữ liệu AcademicYears
  const loadAcademicYears = async () => {
    try {
      const response = await axios.get(`${API_URL}/academic-years`);
      const yearsData = response.data.data;
      setAcademicYearsData(yearsData);
      const yearsOptions = yearsData.map((year: any) => ({
        value: year.id,
        label: year.name,
      }));
      setAcademicYears(yearsOptions);
    } catch (error) {
      console.error('Error fetching academic years:', error);
    }
  };

  // Hàm tải dữ liệu GradeLevels
  const loadGradeLevels = async () => {
    try {
      const response = await axios.get(`${API_URL}/grade-levels`);
      const gradeData = response.data.data;
      const gradeOptions = gradeData.map((grade: any) => ({
        value: grade.id,
        label: grade.name,
      }));
      setGradeLevels(gradeOptions);
    } catch (error) {
      console.error('Error fetching grade levels:', error);
    }
  };

  // Tải các dữ liệu cơ bản: niên khóa, khối, danh sách giáo viên chấm thi trang 1
  useEffect(() => {
    const loadInitialData = async () => {
      await Promise.all([loadAcademicYears(), loadGradeLevels(), fetchGraders(1)]);
    };
    loadInitialData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [examScheduleId]);

  // Khi các state liên quan AcademicYears và GradeLevels đã có dữ liệu, gọi hàm loadExamScheduleData
  useEffect(() => {
    if (examScheduleId && academicYearsData.length > 0 && gradeLevels.length > 0 ) {
      loadExamScheduleData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [examScheduleId, academicYearsData, gradeLevels]);

  // Khi chọn niên khóa, lưu lại đối tượng niên khóa đầy đủ và gọi API lấy môn học theo niên khóa
  const handleSchoolYearChange = (option: DropdownOption) => {
    setSelectedSchoolYear(option);
    const foundYear = academicYearsData.find((year) => year.name === option.value);
    setSelectedAcademicYear(foundYear);
  };

  // Khi selectedAcademicYear thay đổi, gọi API lấy môn học tương ứng
  useEffect(() => {
    const fetchSubjectsByAcademicYear = async () => {
      if (selectedAcademicYear) {
        try {
          const response = await axiosInstance.get(`${API_URL}/subjects/get-by-academic-year`, {
            params: { academicYearId: selectedAcademicYear.id },
          });
          const subjectsData = response.data.data;
          const subjectOptions = subjectsData.map((subj: any) => ({
            value: subj.id,
            label: subj.name,
          }));
          setSubjects(subjectOptions);
        } catch (error) {
          console.error('Error fetching subjects:', error);
        }
      } else {
        setSubjects([]);
      }
    };
    fetchSubjectsByAcademicYear();
  }, [selectedAcademicYear]);

  const handleGradeChange = (option: DropdownOption) => {
    setSelectedGrade(option);
  };

  const handleSubjectChange = (option: DropdownOption) => {
    setSelectedSubject(option);
  };

  const handleHK1Change = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsCheckedHK1(event.target.checked);
  };

  const handleHK2Change = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsCheckedHK2(event.target.checked);
  };

  const handleClassOptionChange = (option: 'all' | 'basic' | 'advanced' | 'custom') => {
    setClassOption(option);
    if (option !== 'custom') {
      setSelectedCustomClasses([]);
    }
  };

  const handleGradingOptionChange = (option: 'all' | 'custom') => {
    setGradingOption(option);
    if (option === 'custom') {
      // Khi chuyển sang custom, ta reset selectedGraders nhưng không reset dữ liệu assignments nếu đã load từ API
      setSelectedGraders([]);
      // Nếu cần, bạn có thể cập nhật lại classAssignments cho các lớp hiện tại mà không xóa dữ liệu đã có
      // Ví dụ: giữ lại dữ liệu nếu có, hoặc chỉ thêm các lớp mới
      const currentClasses = classOption === 'custom' ? selectedCustomClasses : allClasses;
      setClassAssignments((prev) => {
        const newAssignments: { [classId: string]: OptionType[] } = {};
        currentClasses.forEach((cls) => {
          newAssignments[cls.value] = prev[cls.value] || [];
        });
        return newAssignments;
      });
    } else {
      // Nếu chuyển sang áp dụng chung cho tất cả lớp, bạn có thể reset custom assignments (tuỳ nhu cầu)
      setClassAssignments({});
    }
  };

  const handleSelectedGradersChange = (options: any) => {
    setSelectedGraders(options as OptionType[]);
  };

  const handleClassAssignmentChange = (classId: string, newValue: any) => {
    setClassAssignments((prev) => ({
      ...prev,
      [classId]: newValue as OptionType[],
    }));
  };

  const handleClose = () => {
    navigate('/leadership/exams', { replace: true });
  };

  // ============================================
  // Hàm tải dữ liệu ExamSchedule dựa trên examScheduleId
  // ============================================
  const loadExamScheduleData = async () => {
    try {
      const response = await axios.get(`${API_URL}/ExamSchedule/${examScheduleId}`);
      const examData = response.data.data;
  
      // Cập nhật các trường cơ bản
      setExamTitle(examData.name);
      setExamType(examData.type);
      setDuration(examData.duration_in_minutes);
      setExamDate(examData.examDay ? dayjs(examData.examDay) : null);
  
      // Cập nhật niên khóa (Academic Year)
      const foundAcademicYear = academicYearsData.find(
        (year) => Number(year.id) === Number(examData.academicYearId)
      );
      if (foundAcademicYear) {
        setSelectedAcademicYear(foundAcademicYear);
        setSelectedSchoolYear({ value: foundAcademicYear.name, label: foundAcademicYear.name });
      }
  
      // Cập nhật khối
      if (examData.gradeLevelsId) {
        const foundGrade = gradeLevels.find(
          (grade) => Number(grade.value) === Number(examData.gradeLevelsId)
        );
        if (foundGrade) setSelectedGrade(foundGrade);
      }
  
      // Cập nhật môn thi
      if (examData.subject) {
        const foundSubject = subjects.find(
          (subj) => Number(subj.value) === Number(examData.subject)
        );
        if (foundSubject) {
          setSelectedSubject(foundSubject);
        } else {
          setSelectedSubject({ value: examData.subject, label: examData.subjectName });
        }
      }
  
      // Cập nhật học kỳ
      if (examData.semesterIds && Array.isArray(examData.semesterIds)) {
        setIsCheckedHK1(examData.semesterIds.some((id: number) => String(id).includes('1')));
        setIsCheckedHK2(examData.semesterIds.some((id: number) => String(id).includes('2')));
      }
  
      // ===============================================
      // Cập nhật danh sách lớp và cấu hình phân công chấm thi
      // ===============================================
      if (examData.classIds && examData.classIds.length > 0) {
        // Sau khi có thông tin khối và niên khóa, load lại danh sách các lớp liên quan
        const classes = await fetchAllClasses('all', selectedGrade, selectedSchoolYear);
        const filteredOptions = classes
          .filter((cls) => examData.classIds.includes(cls.id))
          .map((cls) => ({ value: String(cls.id), label: cls.name }));
  
        // Chuyển chế độ phân công thành "custom"
        setClassOption('custom');
        setSelectedCustomClasses(filteredOptions);
  
        // Cập nhật cấu hình phân công chấm thi cho từng lớp
        const assignments: { [classId: string]: OptionType[] } = {};
        filteredOptions.forEach((cls) => {
          const graderAssignment = examData.gradersForClasses.find(
            (item: any) => String(item.classId) === cls.value
          );
          if (graderAssignment) {
            assignments[cls.value] = graderAssignment.graderIds.map((id: number) => {
              const found = graderOptions.find((g) => Number(g.value) === Number(id));
              return {
                value: id,
                label: found ? found.label : '',
              };
            });
          } else {
            assignments[cls.value] = [];
          }
        });
     
        setClassAssignments(assignments);
        // Đánh dấu rằng dữ liệu assignments đã được load từ API để không reset khi selectedCustomClasses thay đổi
        setAssignmentsLoaded(true);

        setGradingOption('custom');
      }
    } catch (error) {
      console.error('Error loading exam schedule data:', error);
      toast.error('Lỗi khi tải dữ liệu lịch thi!');
    }
  };
  
  // Khi thông tin chọn thay đổi (khối, niên khóa, hoặc option lớp) thì load lại danh sách lớp
  useEffect(() => {
    const loadClasses = async () => {
      if (selectedGrade && selectedSchoolYear) {
        const optionType = classOption === 'all' || classOption === 'custom' ? 'all' : classOption;
        const classes = await fetchAllClasses(optionType, selectedGrade, selectedSchoolYear);
        const options = classes.map((cls) => ({ value: String(cls.id), label: cls.name }));
        setAllClasses(options);
        if (classOption !== 'custom') {
          const assignments: { [classId: string]: OptionType[] } = {};
          options.forEach((opt) => {
            assignments[opt.value] = [];
          });
          setClassAssignments(assignments);
        }
      }
    };
    loadClasses();
  }, [selectedGrade, selectedSchoolYear, classOption]);

  // Khi thay đổi danh sách lớp được chọn trong chế độ "custom"
  useEffect(() => {
    if (classOption === 'custom') {
      setClassAssignments((prev) => {
        const newAssignments: { [classId: string]: OptionType[] } = {};
        selectedCustomClasses.forEach((opt) => {
          // Nếu có dữ liệu từ API (đã load), giữ nguyên; nếu không, khởi tạo thành mảng rỗng
          newAssignments[opt.value] = prev[opt.value] || [];
        });
        return newAssignments;
      });
    }
  }, [selectedCustomClasses, classOption]);
  
  // Xử lý submit form
  const [isSubmitting, setIsSubmitting] = useState(false);
  const handleSave = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isSubmitting) return;
    setIsSubmitting(true);

    // Xử lý chọn học kỳ
    const semesterIds: number[] = [];
    if (selectedAcademicYear && selectedAcademicYear.semesters) {
      if (isCheckedHK1) {
        const hk1Semester = selectedAcademicYear.semesters.find((s: any) =>
          String(s.name).toLowerCase().includes('học kỳ 1'),
        );
        if (hk1Semester) semesterIds.push(hk1Semester.id);
      }
      if (isCheckedHK2) {
        const hk2Semester = selectedAcademicYear.semesters.find((s: any) =>
          String(s.name).toLowerCase().includes('học kỳ 2'),
        );
        if (hk2Semester) semesterIds.push(hk2Semester.id);
      }
    }

    const classIds = classOption === 'custom' ? selectedCustomClasses.map((cls) => cls.value) : allClasses.map((cls) => cls.value);

    const requestBody = {
      name: examTitle,
      examId: 1,
      examDay: examDate ? examDate.format('YYYY-MM-DDTHH:mm:ss.SSS') : null,
      type: examType,
      form: true,
      status: 'PendingApproval',
      academicYearId: selectedAcademicYear ? selectedAcademicYear.id : null,
      subject: selectedSubject ? selectedSubject.value : null,
      semesterIds: semesterIds,
      gradeLevelsId: selectedGrade ? selectedGrade.value : null,
      duration_in_minutes: duration,
      classIds: classIds,
      gradersForClasses:
        gradingOption === 'all'
          ? (classOption === 'custom' ? selectedCustomClasses : allClasses).map((cls) => ({
              classId: cls.value,
              graderIds: selectedGraders.map((g) => g.value),
            }))
          : Object.entries(classAssignments).map(([classId, graders]) => ({
              classId,
              graderIds: (graders || []).map((g: OptionType) => g.value),
            })),
    };

    try {
      await axios.put(`${API_URL}/ExamSchedule/${examScheduleId}`, requestBody);
      toast.success('Lịch thi đã được cập nhật thành công!');
      navigate('/leadership/exams');
    } catch (error: any) {
      console.error('Error updating exam schedule:', error);
      const errorMessage = error.response?.data?.message || 'Đã có lỗi xảy ra. Vui lòng thử lại sau.';
      toast.error(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  const isSaveDisabled =
    !examTitle.trim() ||
    !examDate ||
    !selectedSubject ||
    !examType.trim() ||
    (gradingOption === 'all' && selectedGraders.length < 1);

  return (
    <div className="modal-overlay">
      <div className="modal-container bg-white rounded-lg shadow-lg w-full max-w-4xl max-h-[105vh] overflow-y-auto">
        <h2 className="text-center text-xl font-bold mb-4">Sửa lịch thi</h2>
        <form onSubmit={handleSave}>
          {/* Thông tin chung */}
          <div className="grid grid-cols-[175px_1fr] gap-x-6 gap-y-4 items-center">
            <label className="text-right font-medium whitespace-nowrap justify-self-start">Niên khóa:</label>
            <div>
              <div className="flex items-center gap-4 justify-between">
                <Dropdown
                  options={academicYears}
                  onSelect={handleSchoolYearChange}
                  selectedOption={selectedSchoolYear}
                  handleOptionClick={handleSchoolYearChange}
                  placeholder="Niên khóa"
                  border="visible"
                  borderColor="black"
                  size="short"
                  iconColor="#FF7506"
                  status="normal"
                  disabled={false}
                  showArrow={true}
                />
                <div className="flex items-center">
                  <label className="font-medium whitespace-nowrap w-20">Khối:</label>
                  <Dropdown
                    options={gradeLevels}
                    onSelect={handleGradeChange}
                    selectedOption={selectedGrade}
                    handleOptionClick={handleGradeChange}
                    placeholder="Khối"
                    border="visible"
                    borderColor="black"
                    size="short"
                    iconColor="#FF7506"
                    status="normal"
                    disabled={false}
                    showArrow={true}
                    backgroundColorSelected="rgb(79 164 204)"
                    className="justify-end"
                  />
                </div>
              </div>
            </div>

            {/* Lớp học */}
            <label className="text-right font-medium whitespace-nowrap justify-self-start">
              Lớp học <span className="text-red-500">*</span>
            </label>
            <div className="grid grid-cols-[1fr_1fr_1fr_0.5fr] gap-4 items-center">
              <label className="flex items-center gap-2 justify-self-start">
                <input
                  type="radio"
                  name="classOption"
                  className="w-5 h-5 accent-blue-500"
                  checked={classOption === 'all'}
                  onChange={() => handleClassOptionChange('all')}
                />
                Tất cả lớp
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="classOption"
                  className="w-5 h-5 accent-blue-500"
                  checked={classOption === 'basic'}
                  onChange={() => handleClassOptionChange('basic')}
                />
                Lớp cơ bản
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="classOption"
                  className="w-5 h-5 accent-blue-500"
                  checked={classOption === 'advanced'}
                  onChange={() => handleClassOptionChange('advanced')}
                />
                Lớp nâng cao
              </label>
              <div></div>
              <label className="flex items-center gap-2 col-span-1">
                <input
                  type="radio"
                  name="classOption"
                  className="w-5 h-5 accent-blue-500"
                  checked={classOption === 'custom'}
                  onChange={() => handleClassOptionChange('custom')}
                />
                Tùy chọn
              </label>
              {classOption === 'custom' && (
                <div className="col-span-3">
                  <CustomMultiSelect
                    options={allClasses}
                    value={selectedCustomClasses}
                    onChange={(options) => setSelectedCustomClasses(options as OptionType[])}
                    placeholder="Chọn lớp"
                  />
                </div>
              )}
            </div>

            {/* Môn thi */}
            <label className="text-right font-medium whitespace-nowrap justify-self-start">
              Môn thi <span className="text-red-500">*</span>
            </label>
            <div>
              <Dropdown
                options={subjects}
                onSelect={handleSubjectChange}
                selectedOption={selectedSubject}
                handleOptionClick={handleSubjectChange}
                placeholder="Môn thi"
                border="visible"
                borderColor="black"
                iconColor="#FF7506"
                status="normal"
                showArrow={true}
                backgroundColorSelected="rgb(79 164 204)"
                headerClassName="w-full"
              />
            </div>

            {/* Tên kỳ thi */}
            <label className="text-right font-medium whitespace-nowrap justify-self-start">
              Tên kỳ thi <span className="text-red-500">*</span>
            </label>
            <div>
              <input
                type="text"
                className="border border-black rounded-[8px] px-2 py-2 w-full focus:border-blue-500"
                value={examTitle}
                onChange={(e) => setExamTitle(e.target.value)}
                placeholder="Nhập tên kỳ thi..."
              />
            </div>

            {/* Exam Type */}
            <label className="text-right font-medium whitespace-nowrap justify-self-start">
              Loại kỳ thi <span className="text-red-500">*</span>
            </label>
            <div>
              <input
                type="text"
                className="border border-black rounded-[8px] px-2 py-2 w-full focus:border-blue-500"
                value={examType}
                onChange={(e) => setExamType(e.target.value)}
                placeholder="Nhập loại kỳ thi..."
              />
            </div>

            {/* Học kỳ */}
            <label className="text-right font-medium whitespace-nowrap justify-self-start"></label>
            <div className="flex flex-wrap items-center gap-4">
              <CheckboxComponent
                label="Học kỳ 1"
                isChecked={isCheckedHK1}
                isIndeterminate={false}
                onChange={handleHK1Change}
                customStyles={{
                  container: { display: 'flex', alignItems: 'center' },
                  label: { color: '#000', fontWeight: '500', fontSize: '14px' },
                }}
              />
              <CheckboxComponent
                label="Học kỳ 2"
                isChecked={isCheckedHK2}
                isIndeterminate={false}
                onChange={handleHK2Change}
                customStyles={{
                  container: { display: 'flex', alignItems: 'center' },
                  label: { color: '#000', fontWeight: '500', fontSize: '14px' },
                }}
              />
            </div>

            {/* Thời lượng làm bài */}
            <label className="text-right font-medium whitespace-nowrap justify-self-start">
              Thời lượng làm bài <span className="text-red-500">*</span>
            </label>
            <div className="flex items-center gap-2">
              <input
                type="number"
                className="border rounded px-2 py-1 w-24 focus:border-blue-500"
                value={duration}
                min={0}
                onChange={(e) => setDuration(Number(e.target.value))}
              />
              <span className="font-medium">Phút</span>
            </div>

            {/* Ngày làm bài */}
            <label className="text-right font-medium whitespace-nowrap justify-self-start">
              Ngày làm bài <span className="text-red-500">*</span>
            </label>
            <div>
              <DateInput value={examDate} onChange={setExamDate} width="140px" />
            </div>
          </div>

          <hr className="my-4" />

          {/* Phân công chấm thi */}
          <div className="mt-4">
            <label className="font-medium text-orange-500">Phân công chấm thi</label>
            <div className="mt-2 grid grid-cols-[auto,1fr] gap-2 items-center">
              <div className="flex items-center gap-2">
                <input
                  type="radio"
                  className="w-5 h-5 accent-blue-500"
                  checked={gradingOption === 'all'}
                  onChange={() => handleGradingOptionChange('all')}
                />
                <label>Áp dụng cho tất cả lớp</label>
              </div>
              <div className="relative">
                <CustomMultiSelect
                  options={graderOptions}
                  value={selectedGraders}
                  onChange={handleSelectedGradersChange}
                  placeholder={gradingOption === 'custom' ? '' : 'Chọn giáo viên'}
                  isDisabled={gradingOption === 'custom'}
                  menuRef={graderContainerRef}
                  onMenuScroll={handleScroll}
                />
              </div>
            </div>
            <div className="mt-2 grid grid-cols-[190px_1fr] gap-2 items-start">
              <div className="flex items-center gap-2">
                <input
                  type="radio"
                  className="w-5 h-5 accent-blue-500"
                  checked={gradingOption === 'custom'}
                  onChange={() => handleGradingOptionChange('custom')}
                />
                <label>Tùy chọn</label>
              </div>
              {gradingOption === 'custom' && (
                <div className="flex flex-col gap-2">
                  {(classOption === 'custom' ? selectedCustomClasses : allClasses).map((cls) => (
                    <div key={cls.value} className="flex items-center gap-2">
                      <span className="font-semibold">{cls.label}</span>
                      <div className="relative flex-grow">
                        <CustomMultiSelect
                          options={graderOptions}
                          value={classAssignments[cls.value]}
                          onChange={(newValue) => handleClassAssignmentChange(cls.value, newValue)}
                          placeholder="Chọn giáo viên"
                          onMenuScroll={handleScroll}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Nút Lưu / Hủy */}
          <div className="mt-6 flex justify-center gap-2">
            <Button className="secondary" size="big" onClick={handleClose} type="button">
              Hủy
            </Button>
            <Button
              className={`${isSaveDisabled || isSubmitting ? 'bg-[#C9C4C0] cursor-not-allowed' : 'primary'}`}
              size="big"
              type="submit"
              disabled={isSaveDisabled || isSubmitting}
            >
              Lưu
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditExamSchedule;
