import React, { useEffect, useState } from 'react';

interface DropdownOption {
  label: string;
  value: string;
}

interface PopupProps {
  titleBig: string;
  titleSmall1: string;
  titleSmall2: string;
  titleSmall3: string;
  isOpen: boolean;
  onClose: () => void;
  className?: string;

  initId?: number | string;
  initName?: string;
  initDescription?: string;
  initActive?: boolean;

  dropdown?: boolean;
  dropdownOptions?: DropdownOption[];
  selectedDropdown?: DropdownOption | null;
  onSelectDropdown?: (option: DropdownOption) => void;
  loadMoreDropdownOptions?: () => void;
  hasMoreDropdown?: boolean;

  onSave?: (updatedData: { id?: number | string; name: string; description: string; status: boolean; academicYearId?: string | number }) => void;
}

const Popup: React.FC<PopupProps> = ({
  titleBig,
  titleSmall1,
  titleSmall2,
  titleSmall3,
  isOpen,
  onClose,
  className,
  initName,
  initDescription,
  initActive,
  onSave,
  initId,
  dropdown,
  dropdownOptions = [],
  selectedDropdown,
  onSelectDropdown,
  loadMoreDropdownOptions,
  hasMoreDropdown = false,
}) => {
  const [isActive, setIsActive] = useState(false);
  const [nameValue, setNameValue] = useState('');
  const [descValue, setDescValue] = useState('');
  const [errors, setErrors] = useState<{ name?: string; description?: string; dropdown?: string }>({});
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [isLoadingDropdown, setIsLoadingDropdown] = useState(false);

  useEffect(() => {
    setIsActive(initActive ?? false);
    setNameValue(initName ?? '');
    setDescValue(initDescription ?? '');
    setErrors({});
  }, [initActive, initName, initDescription, isOpen]);

  if (!isOpen) return null;

  const handleSaveClick = () => {
    const newErrors: { name?: string; description?: string; dropdown?: string } = {};
    const specialCharRegex = /^[a-zA-Z0-9\s\u00C0-\u1EF9]+$/;

    if (!nameValue.trim()) {
      newErrors.name = 'Tên lớp không được để trống';
    } else if (!specialCharRegex.test(nameValue)) {
      newErrors.name = 'Tên lớp không được chứa ký tự đặc biệt';
    }

    if (!descValue.trim()) {
      newErrors.description = 'Ghi chú không được để trống';
    }

    if (dropdown && !selectedDropdown) {
      newErrors.dropdown = 'Vui lòng chọn niên khóa';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});

    const basePayload = {
      name: nameValue.trim(),
      description: descValue.trim(),
      status: isActive,
      academicYearId: selectedDropdown?.value ?? undefined,
    };

    if (onSave) {
      if (initId != null) {
        onSave({ id: initId, ...basePayload });
      } else {
        onSave({ ...basePayload });
      }
    }
  };

  return (
    <div className={`fixed inset-0 flex items-center justify-center bg-black bg-opacity-10 ${className}`} onClick={onClose}>
      <div className="flex justify-center items-center max-h-screen w-full" onClick={(e) => e.stopPropagation()}>
        <div className="bg-white rounded-2xl p-6 w-full max-w-[884px] h-auto shadow-lg flex flex-col">
          <form className="w-full pt-3 px-6">
            <h2 className="text-center text-lg font-semibold mb-4">{titleBig}</h2>

            {/* Tên loại lớp */}
            <div className="flex flex-col md:flex-row items-start mb-2">
              <label className="md:w-3/12 w-full text-black-text font-bold text-base text-center md:text-left pt-2">{titleSmall1}:</label>
              <div className="w-full md:w-9/12">
                <input
                  type="text"
                  className="w-full p-2 rounded-lg text-black-text cursor-pointer bg-gray-100"
                  value={nameValue}
                  onChange={(e) => setNameValue(e.target.value)}
                  disabled={!isActive}
                />
                {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
              </div>
            </div>

            {/* Trạng thái */}
            <div className="flex flex-col md:flex-row items-center mb-4">
              <label className="md:w-3/12 w-full text-black-text font-bold text-base mb-2 md:mb-0 text-left">{titleSmall2}:</label>
              <div className="flex items-center gap-3 w-full md:w-9/12">
                <div
                  className={`relative w-12 h-6 rounded-full cursor-pointer ${isActive ? 'bg-blue-500' : 'bg-gray-300'}`}
                  onClick={() => setIsActive(!isActive)}
                >
                  <div
                    className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-transform ${isActive ? 'translate-x-6' : 'translate-x-1'}`}
                  ></div>
                </div>
                <span className="text-sm">{isActive ? 'Đang hoạt động' : 'Vô hiệu hóa'}</span>
              </div>
            </div>

            {/* Ghi chú */}
            <div className="flex flex-col md:flex-row items-start mb-2">
              <label className="md:w-3/12 w-full text-black-text font-bold text-base text-center md:text-left pt-2">{titleSmall3}:</label>
              <div className="w-full md:w-9/12">
                <input
                  type="text"
                  className="w-full p-2 rounded-lg text-black-text cursor-pointer bg-gray-100"
                  value={descValue}
                  onChange={(e) => setDescValue(e.target.value)}
                  disabled={!isActive}
                />
                {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description}</p>}
              </div>
            </div>

            {/* Dropdown chọn niên khóa */}
            {dropdown && (
              <div className="flex flex-col md:flex-row items-start mb-4">
                <label className="md:w-3/12 w-full text-black-text font-bold text-base text-center md:text-left pt-2">Niên khóa:</label>
                <div className="w-full md:w-9/12 relative">
                  <div className="w-full p-2 rounded-lg bg-gray-100 cursor-pointer" onClick={() => setDropdownVisible((prev) => !prev)}>
                    {selectedDropdown?.label || 'Chọn niên khóa'}
                  </div>

                  {dropdownVisible && (
                    <div
                      className="absolute z-50 w-full bg-white border rounded shadow max-h-40 overflow-y-auto mt-1"
                      onScroll={(e) => {
                        const el = e.currentTarget;
                        if (el.scrollTop + el.clientHeight >= el.scrollHeight - 5 && !isLoadingDropdown && hasMoreDropdown) {
                          setIsLoadingDropdown(true);
                          loadMoreDropdownOptions?.();
                          setTimeout(() => setIsLoadingDropdown(false), 1000);
                        }
                      }}
                    >
                      {dropdownOptions.length === 0 && <div className="p-2 text-gray-500">Không có dữ liệu</div>}
                      {dropdownOptions.map((opt) => (
                        <div
                          key={opt.value}
                          className={`p-2 hover:bg-gray-100 cursor-pointer ${selectedDropdown?.value === opt.value ? 'bg-blue-100' : ''}`}
                          onClick={() => {
                            onSelectDropdown?.(opt);
                            setDropdownVisible(false);
                          }}
                        >
                          {opt.label}
                        </div>
                      ))}
                      {isLoadingDropdown && <div className="p-2 text-center text-sm text-gray-400">Đang tải thêm...</div>}
                    </div>
                  )}
                  {errors.dropdown && <p className="text-red-500 text-sm mt-1">{errors.dropdown}</p>}
                </div>
              </div>
            )}

            {/* Nút hành động */}
            <div className="flex flex-col md:flex-row justify-center gap-4 mt-10">
              <button type="button" onClick={onClose} className="w-full md:w-40 h-12 py-2 bg-[#F2F2F2] text-black-text font-bold rounded-lg">
                Hủy
              </button>
              <button
                type="button"
                className={`w-full md:w-40 py-2 font-bold rounded-lg ${
                  nameValue.trim() === '' || descValue.trim() === '' ? 'bg-gray-300 text-gray-500 cursor-not-allowed' : 'bg-orange-text text-white'
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
  );
};

export default Popup;
