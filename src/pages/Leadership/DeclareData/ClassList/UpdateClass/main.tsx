import React, { useState } from "react";
import Icon from "./icon";
import './style.css';
import DropdownSelection from "../../../../../components/DropdownSelection";
import Checkbox from "../../../../../components/CheckBox";
import Dropdown from "../../../../../components/Dropdown";
import { DropdownOption } from "../../../../../components/Dropdown/type";
import Button from "../../../../../components/Button";
const yearOptions = ["2020-2021", "2021-2022", "2022-2023", "2023-2024"];
const gradeOptions = ["Khối 6", "Khối 7", "Khối 8", "Khối 9"];
const classOptions = [
    { label: "Lớp căn bản", value: "can-ban" },
    { label: "Lớp nâng cao", value: "nang-cao" }
];

const teacherOptions = [
    { label: "Nguyễn Minh Thuận", value: "nguyen-minh-thuan" },
    { label: "Nguyễn Hữu Phúc", value: "nguyen-huu-phuc" },
    { label: "Nguyễn Hồng Duy Thanh", value: "nguyen-hong-duy-thanh" }
];

const subjectOptions = [
    { label: "Toán", value: "toan" },
    { label: "Văn", value: "van" },
    { label: "Anh", value: "anh" },
];

const dataInheritanceOptions = [
    { label: "2020-2021", value: "2020-2021" },
    { label: "2022-2023", value: "2022-2023" }
];

const UpdatelassForm: React.FC = () => {
    const [selectedClass, setSelectedClass] = useState<DropdownOption | null>(null);
    const [selectedTeacher, setSelectedTeacher] = useState<DropdownOption | null>(null);
    const [isChecked, setIsChecked] = useState(false);
    const [showSubjectDropdown, setShowSubjectDropdown] = useState(false);
    const [selectedSubjects, setSelectedSubjects] = useState<string[]>([]);
    const [selectedOption, setSelectedOption] = useState<DropdownOption | null>(null);
    // Khi chọn môn học từ dropdown
    const handleSelectSubject = (subject: string) => {
        if (!selectedSubjects.includes(subject)) {
            setSelectedSubjects([...selectedSubjects, subject]);
        }
        setShowSubjectDropdown(false);
    };

    const handleCancel = () => {
        console.log('Cancel clicked');
    };

    const handleSave = () => {
        console.log('Save clicked');
    };

    return (
        <div className="flex flex-col items-center">
            <h1 className="text-3xl font-bold text-black-text">Thiết lập lớp học</h1>
            <div className="w-full max-w-5xl p-6 mt-3">
                <h3 className="text-lg font-bold text-orange-text mb-4">Thông tin chung</h3>
                <form action="">
                    <div className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                            <div className="flex">
                                <label className="font-bold text-black-text w-28">Niên khóa:</label>
                                <DropdownSelection options={yearOptions} />
                            </div>
                            <div className="flex justify-end">
                                <label className="font-bold text-black-text w-28">Khoa - Khối:
                                    <span className="text-red-500">*</span>
                                </label>
                                <DropdownSelection options={gradeOptions} />
                            </div>
                        </div>
                        <div className="flex">
                            <label className="font-bold text-black-text mt-2 w-44">Tên lớp:
                                <span className="text-red-500">*</span>
                            </label>
                            <input type="text" className="flex-1 h-10 border w-full border-gray-300 rounded-lg px-3" />
                        </div>

                        <div className="flex">
                            <label className="font-bold text-black-text w-44  mt-2">
                                Số lượng học viên: <span className="text-red-500">*</span>
                            </label>
                            <input type="text" className="h-10 border border-gray-300 rounded-lg px-3 w-36" />
                        </div>

                        <div className="flex">
                            <label className="font-bold text-black-text w-48 mt-2">Phân loại lớp:
                                <span className="text-red-500">*</span>
                            </label>
                            <Dropdown
                                placeholder="Phân loại lớp"
                                options={classOptions}
                                onSelect={setSelectedOption}
                                selectedOption={selectedOption}
                                handleOptionClick={setSelectedOption}
                                size={"long"}
                            />
                        </div>

                        <div className="flex">
                            <label className="font-bold text-black-text w-48 mt-2">Giáo viên chủ nhiệm:</label>
                            <Dropdown
                                placeholder="Chọn giáo viên"
                                options={teacherOptions}
                                onSelect={setSelectedTeacher}
                                selectedOption={selectedTeacher}
                                handleOptionClick={setSelectedTeacher}
                                size="long"
                            />
                        </div>

                        <hr />
                    </div>

                    <h3 className="text-lg font-bold text-orange-text mb-3">Danh sách môn học</h3>

                    <div className="flex items-center mb-2">
                        <Checkbox isChecked={isChecked} onChange={(e) => setIsChecked(e.target.checked)} />
                        <p className="ms-3 me-3">Kế thừa dữ liệu:</p>
                        <DropdownSelection
                            placeholder="Niên khóa"
                            options={yearOptions}
                        />
                    </div>

                    {/* Danh sách môn học đã chọn */}
                    <div className="flex flex-wrap gap-20 ">
                        {selectedSubjects.map((subject, index) => (
                            <div key={index} className="flex items-center py-1 ">
                                <img src={Icon.plus} alt="icon" className="w-4 h-4" />
                                <p className="ml-2">{subject}</p>
                            </div>
                        ))}
                    </div>

                    <div className="relative">
                        <div
                            className="flex items-center mt-2 cursor-pointer"
                            onClick={() => setShowSubjectDropdown(!showSubjectDropdown)}
                        >
                            <img src={Icon.fiplus} alt="icon" className="w-5 h-5" />
                            <p className="ms-3 text-blue-text">Thêm môn học mới</p>
                        </div>

                        {showSubjectDropdown && (
                            <div className="absolute left-8 z-10 option-css">
                                <Dropdown
                                    placeholder="Niên khóa"
                                    options={dataInheritanceOptions}
                                    onSelect={setSelectedOption}
                                    selectedOption={selectedOption}
                                    handleOptionClick={setSelectedOption}
                                    size={"short"}
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
                            disabled={false}
                            width="160px"
                            height="52px"
                            style={{ backgroundColor: 'var(--background-orange-1)', border: 'var(--border-orange)', color: 'var(--text-white)' }}
                        >
                            Lưu
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default UpdatelassForm;