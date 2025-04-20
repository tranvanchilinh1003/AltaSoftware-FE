import Dropdown from '../../../../../components/Dropdown';
import { DropdownOption } from '../../../../../components/Dropdown/type';
import Button from '../../../../../components/Button';
import plus from '../../../../../assets/icons/Plus.jpg';
import Breadcrumb from '../../../../../components/AddressUrlStack/Index';
import { useState, useEffect } from 'react';
import './style.css';
import { toast } from 'react-toastify';
import createAxiosInstance from '../../../../../utils/axiosInstance';

const axiosTrue = createAxiosInstance(true);

const ClassManagementHeader: React.FC<{
  selectedYearOption: DropdownOption | null;
  setSelectedYearOption: (option: DropdownOption) => void;
  onSubjectAdded?: () => void; // ✅ thêm prop này
}> = ({ selectedYearOption, setSelectedYearOption, onSubjectAdded }) => {
  const [yearOptions, setYearOptions] = useState<DropdownOption[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAcademicYears = async () => {
      try {
        const response = await axiosTrue.get(`https://fivefood.shop/api/academic-years`);

        const yearsData = Array.isArray(response.data?.data) ? response.data.data : [];
        const formattedYears = yearsData.map((year: any) => ({
          label: year.name,
          value: year.id.toString(),
        }));
        setYearOptions(formattedYears);
      } catch (error) {
        setError('Lỗi khi lấy danh sách niên khóa. Vui lòng thử lại sau.');
        console.error('Lỗi khi lấy danh sách niên khóa:', error);
      }
    };
    fetchAcademicYears();
  }, []);

  const handleYearSelect = (option: DropdownOption) => {
    setSelectedYearOption(option); // Chỉ cần cập nhật state ở component cha
  };

  const addresses = [
    { linkName: 'Cài đặt hệ thống', link: '/' },
    { linkName: 'Thiết lập môn học', link: '/' },
  ];

  const [showModal, setShowModal] = useState(false);
  const [isActive, setIsActive] = useState(true);
  const [nameValue, setNameValue] = useState('');
  const [descValue, setDescValue] = useState('');
  const [selectedYearInModal, setSelectedYearInModal] = useState<DropdownOption | null>(null);

  const handleSaveClick = async () => {
    if (!nameValue.trim()) {
      toast.error('Vui lòng nhập tên loại lớp học!');
      return;
    }

    if (!descValue.trim()) {
      toast.error('Vui lòng nhập ghi chú!');
      return;
    }

    if (!selectedYearInModal || !selectedYearInModal.value) {
      toast.error('Vui lòng chọn niên khóa!');
      return;
    }

    try {
      console.log('Selected Year in modal:', selectedYearInModal);
      const yearId = selectedYearInModal.value;
      console.log('Year ID:', yearId);

      const response = await axiosTrue.get(`https://fivefood.shop/api/subject-types`);

      console.log('API Response:', response.data);

      const existingSubjects = response.data?.data || [];
      console.log('Existing subjects:', existingSubjects);

      const isNameExist = existingSubjects.some((subject: any) => subject.name.trim().toLowerCase() === nameValue.trim().toLowerCase());

      if (isNameExist) {
        toast.error(`Tên loại lớp học '${nameValue}' đã tồn tại trong niên khóa này!`);
        return;
      }

      const payload = {
        name: nameValue,
        description: descValue,
        status: isActive,
        academicYearsId: parseInt(yearId),
      };

      const Response = await axiosTrue.post('https://fivefood.shop/api/subject-types', payload);

      toast.success('Thêm mới môn học thành công!');

      setNameValue('');
      setDescValue('');
      setIsActive(true);
      setSelectedYearInModal(null);
      setShowModal(false);

      onSubjectAdded?.(); // ✅ Gọi callback nếu có
    } catch (error: any) {
      console.error('Lỗi khi thêm mới môn học:', error);
      if (error.response && error.response.data && error.response.data.message) {
        toast.error(error.response.data.message);
      } else {
        toast.error('Đã xảy ra lỗi khi thêm môn học. Vui lòng thử lại!');
      }
    }
  };

  return (
    <>
      <div className="breadcrum ml-5">
        <Breadcrumb addressList={addresses} type={true} />
      </div>
      <div className="flex justify-between items-center pt-6 pl-3 mb-6 mr-[65px]">
        {/* Dropdown */}
        <div className="dropdown">
          <Dropdown
            placeholder="Niên khóa"
            size="short"
            options={yearOptions}
            selectedOption={selectedYearOption}
            onSelect={handleYearSelect} // Sử dụng hàm này khi chọn niên khóa
            handleOptionClick={handleYearSelect} // Có thể bỏ qua nếu onSelect đã đủ
          />
          {error && <p className="text-red-500 mt-2">{error}</p>} {/* Hiển thị lỗi nếu có */}
        </div>

        {/* ✅ Button mở popup */}
        <div className="flex justify-end">
          <Button className="primary" size="big" onClick={() => setShowModal(true)}>
            <img src={plus} alt="Thêm mới" />
            Thêm mới
          </Button>
        </div>
      </div>
      {/* Modal hiển thị khi showModal = true */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-10 z-50">
          <div className="flex justify-center items-center max-h-screen w-full" onClick={() => setShowModal(false)}>
            <div className="bg-white rounded-2xl p-6 w-full max-w-[884px] h-auto shadow-lg flex flex-col" onClick={(e) => e.stopPropagation()}>
              <form className="w-full pt-3 px-6">
                <h2 className="text-center text-lg font-semibold mb-4">Thêm môn học</h2>

                <div className="flex flex-col md:flex-row items-center mb-4">
                  <label className="md:w-3/12 w-full font-bold text-base text-center md:text-left">Loại lớp học:</label>
                  <input
                    type="text"
                    className="w-full md:w-9/12 p-2 rounded-lg bg-gray-100"
                    value={nameValue}
                    onChange={(e) => setNameValue(e.target.value)}
                  />
                </div>

                <div className="flex flex-col md:flex-row items-center mb-4">
                  <label className="md:w-3/12 w-full font-bold text-base text-center md:text-left">Trạng thái:</label>
                  <div className="flex items-center gap-3 w-full md:w-9/12">
                    <div
                      className={`relative w-12 h-6 rounded-full cursor-pointer ${isActive ? 'bg-blue-500' : 'bg-gray-300'}`}
                      onClick={() => setIsActive(!isActive)}
                    >
                      <div
                        className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-transform ${
                          isActive ? 'translate-x-6' : 'translate-x-1'
                        }`}
                      ></div>
                    </div>
                    <span className="text-sm">{isActive ? 'Đang hoạt động' : 'Vô hiệu hóa'}</span>
                  </div>
                </div>

                <div className="flex flex-col md:flex-row items-center mb-4">
                  <label className="md:w-3/12 w-full font-bold text-base text-center md:text-left" style={{ marginLeft: '3%' }}>
                    Ghi chú:
                  </label>
                  <input
                    type="text"
                    className="w-full md:w-9/12 p-2 rounded-lg bg-gray-100"
                    style={{ marginRight: '9%' }}
                    value={descValue}
                    onChange={(e) => setDescValue(e.target.value)}
                  />
                </div>

                <div className="flex flex-col md:flex-row items-center mb-4">
                  <label className="md:w-3/12 w-full font-bold text-base text-center md:text-left" style={{ marginLeft: '4%' }}>
                    Niên khóa:
                  </label>
                  <div className="dropdown" style={{ marginRight: '-9%' }}>
                    <Dropdown
                      placeholder="Niên khóa"
                      size="short"
                      options={yearOptions}
                      selectedOption={selectedYearInModal}
                      onSelect={(option) => {
                        console.log('Selected year:', option); // Đảm bảo là giá trị chọn đúng
                        setSelectedYearInModal(option);
                      }}
                      handleOptionClick={(option) => setSelectedYearInModal(option)}
                    />
                    {error && <p className="text-red-500 mt-2">{error}</p>} {/* Hiển thị lỗi nếu có */}
                  </div>
                </div>

                <div className="flex flex-col md:flex-row justify-center gap-4 mt-10">
                  <button
                    type="button"
                    className="w-full md:w-40 h-12 py-2 bg-[#F2F2F2] text-black-text font-bold rounded-lg"
                    onClick={() => setShowModal(false)}
                  >
                    Hủy
                  </button>
                  <button
                    type="button"
                    className={`w-full md:w-40 py-2 font-bold rounded-lg ${
                      nameValue.trim() === '' || descValue.trim() === ''
                        ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                        : 'bg-orange-text text-white'
                    }`}
                    disabled={nameValue.trim() === '' || descValue.trim() === ''}
                    onClick={handleSaveClick}
                  >
                    Lưu
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ClassManagementHeader;
