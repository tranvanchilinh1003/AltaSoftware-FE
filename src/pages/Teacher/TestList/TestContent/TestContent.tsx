import React, { useRef, useState } from 'react';
import { TestItem, TestInfo } from './type';
import { ArrowLeftIcon, ArrowRightIcon } from '../../../../components/Icons/IconComponents';
import AddressList from '../../../../components/AddressUrlStack/Index';
import SwitchTag from '../../../../components/SwitchTag';
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/solid';
import Button from '../../../../components/Button';
import DateInput from '../../../../components/Date';
import dayjs, { Dayjs } from "dayjs";
import DropdownSelectionComponent from '../../../../components/DropdownSelection';
import DropdownTimeSelection from '../../../../components/DropdownTimeSelection/DropdownTimeSelection';
import file from '../../../../assets/icons/u_paperclip.png';

const labels = [
    { link: "/", linkName: "Bài kiểm tra" },
    { link: "/", linkName: "Nội dung bài kiểm tra" },
]

const testInfoData = {
    subject: "Toán Đại Số",
    class: "10A1",
    totalTests: 6,
    startDate: "19/08/2020",
    duration: "15 phút",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    file: "DSTT_KT45P_12A1.doc",
    requireAttachment: false,
    tests: [
        { id: 1, title: "Bài 1", date: '19/08/2020', time: '14:00 - 14:45', isEditing: false },
        { id: 2, title: "Bài 2", date: '20/08/2020', time: '14:00 - 14:45', isEditing: false },
        { id: 3, title: "Bài 3", date: '21/08/2020', time: '14:00 - 14:45', isEditing: false },
        { id: 4, title: "Bài 4", date: '07/03/2025', time: '13:00 - 14:45', isEditing: false },
        { id: 5, title: "Bài 5", date: '23/08/2020', time: '14:00 - 14:45', isEditing: false },
        { id: 6, title: "Bài 6", date: '24/08/2025', time: '14:00 - 14:45', isEditing: false },
    ],
};

const TestContent: React.FC = () => {
    const [testInfo, setTestInfo] = useState(testInfoData);
    const [tests, setTests] = useState<TestItem[]>(testInfoData.tests);
    const [editTest, setEditTest] = useState<TestItem | null>(null);
    const linkRef = useRef<HTMLInputElement>(null);

    const isUpcomingSession = (date: string, time: string) => {
        const [day, month, year] = date.split('/').map(Number);
        const [startHour, startMinute] = time.split(' - ')[0].split(':').map(Number);
        const startTime = new Date(year, month - 1, day, startHour, startMinute);
        const now = new Date();
        return now < startTime; // Trả về true nếu buổi học chưa diễn ra
    };
    const handleEdit = (test: TestItem) => {
        setEditTest({
            ...test,
            date: test.date ? dayjs(test.date, "DD/MM/YYYY") : null,  // Thêm format để tránh lỗi
        });
    };



    const handleSave = () => {
        if (editTest) {
            setTests(tests.map((s) => (s.id === editTest.id ? editTest : s)));
            setEditTest(null);
        }
    };

    const handleDelete = (id: number) => {
        setTests(tests.filter((s) => s.id !== id));
    };

    const getTestBgColor = (date: string, time: string) => {
        const [day, month, year] = date.split('/').map(Number);
        const [startHour, startMinute] = time.split(' - ')[0].split(':').map(Number);
        const [endHour, endMinute] = time.split(' - ')[1].split(':').map(Number);
        const startTime = new Date(year, month - 1, day, startHour, startMinute);
        const endTime = new Date(year, month - 1, day, endHour, endMinute);
        const now = new Date(); // Lấy thời gian hiện tại
        if (now >= startTime && now <= endTime) return 'bg-orange-500';
        if (now > endTime) return 'bg-gray-300';
        return 'bg-blue-400';
    };

    const getTextColor = (bgColor: string) => {
        return bgColor === 'bg-gray-300' ? 'text-gray-300'
            : bgColor === 'bg-orange-500' ? 'text-orange-500'
                : 'text-blue-400';
    };

    const handleDateChange = (date: dayjs.Dayjs | null) => {
        if (editTest) {
            setEditTest({
                ...editTest,
                date: date ? date.format("DD/MM/YYYY") : "",  // Chuyển thành string đúng format
            });
        }
    };


    {/* Format date */ }
    const formatDate = (date: Dayjs | string | null): string => {
        if (!date) {
            return "";
        }

        if (typeof date === "string") {
            return date; // Return the string directly if it's already a string
        }

        return dayjs(date).format("YYYY-MM-DD"); // Or any other desired format
    };

    const handleTimeChange = (newTime: string) => {
        setEditTest((prev) => (prev ? { ...prev, time: newTime } : null));
    };

    return (
        <div className="p-3">

            <AddressList
                addressList={labels}
            />


            <div className="flex justify-between items-center mb-4">
                <div
                    className="bg-orange-500 text-white px-6 py-2 rounded ml-auto border border-orange-500 mb-2"
                >
                    Chỉnh sửa
                </div>
            </div>

            <div className=" relative  bg-gray-50 bg-white rounded-[16px] shadow-md mx-auto w-full max-w-[1680px] min-h-[720px]">
                <div className="pl-48 py-2 flex items-center pb-4 bg-white p-6">
                    <div className="flex-1 grid grid-cols-[1fr_2fr] gap-x-4 gap-y-4 ml-4">

                        <div className="pl-12">
                            <p className="text-base font-bold text-gray-700 mb-4">
                                Môn học: <span className="font-normal">{testInfoData.subject}</span>
                            </p>
                            <p className="text-base font-bold text-gray-700 ">
                                Lớp: <span className="font-normal">{testInfoData.class}</span>
                            </p>
                        </div>
                    </div>
                </div>

                <div className='bg-[#F0F3F6] pl-12 py-2'>

                    {/* Main Content */}
                    <div className="max-w-sm ml-[191px] p-4 rounded-md ">
                        <div className="grid grid-cols-2 gap-y-2">
                            <div className="font-bold text-gray-700">Số lượng</div>
                            <div className="text-gray-700 text-right text-start">
                                Tổng số <span className="font-bold">{testInfoData.totalTests}</span> bài kiểm tra
                            </div>

                            <div className="font-bold text-gray-700">Ngày bắt đầu</div>
                            <div className="text-gray-700 text-right text-start">{testInfoData.startDate}</div>

                            <div className="font-bold text-gray-700">Thời lượng</div>
                            <div className="text-gray-700 text-right text-start">{testInfoData.duration}</div>
                        </div>
                    </div>

                    {/* Session Grid */}
                    <div className="flex items-center gap-2 mb-6 ml-[175px] ">
                        <span className="text-gray-400 text-2xl cursor-pointer">
                            <ArrowLeftIcon />
                        </span>
                        <div className="flex gap-3">
                            {testInfoData.tests.map((test, index) => {
                                const bgColor = getTestBgColor(formatDate(test.date), test.time);
                                const textColor = getTextColor(bgColor);
                                const isUpcoming = isUpcomingSession(formatDate(test.date), test.time);
                                return (
                                    <div>
                                        <div key={test.id} className={`p-3 rounded-lg text-center min-w-[124px] h-[120px] shadow-sm  ${bgColor}`}>
                                            <p className={`font-bold text-base bg-white rounded-[14px] h-[27px] items-center justify-center ${textColor}`}>
                                                Buổi {test.title}
                                            </p>
                                            <p className="text-base text-center font-bold text-white">
                                                {formatDate(test.date)}
                                            </p>
                                            <p className="text-[18px] font-bold text-white whitespace-nowrap">
                                                {test.time}
                                            </p>

                                        </div>
                                        <div>
                                            {/* hiện update  */}
                                            {isUpcoming && (
                                                <div className="mt-2 flex justify-center gap-2">
                                                    <button className={`w-8 h-8 flex items-center justify-center text-gray-300`} onClick={handleEdit.bind(null, test)}>
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" className={`bi bi-pencil-square ${editTest?.id == test.id ? 'text-gray-400' : 'text-orange-500'}`} viewBox="0 0 16 16">
                                                            <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                                                            <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z" />
                                                        </svg>
                                                    </button>
                                                    <button onClick={handleDelete.bind(null, test.id)}>
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" className="bi bi-x-circle text-orange-500" viewBox="0 0 16 16">
                                                            <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16" />
                                                            <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708" />
                                                        </svg>
                                                    </button>
                                                </div>
                                            )}
                                            {/*  */}
                                        </div>
                                    </div>
                                );
                            })}
                            <div className="p-3 rounded-lg text-center min-w-[120px] h-[120px] shadow-sm bg-blue-400 flex items-center justify-center">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="60"
                                    height="60"
                                    fill="currentColor"
                                    className="bi bi-plus-circle-fill text-gray-200 cursor-pointer"
                                    viewBox="0 0 16 16"
                                >
                                    <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M8.5 4.5a.5.5 0 0 0-1 0v3h-3a.5.5 0 0 0 0 1h3v3a.5.5 0 0 0 1 0v-3h3a.5.5 0 0 0 0-1h-3z" />
                                </svg>
                            </div>
                            {/*  */}
                        </div>
                        <span className="text-gray-400 text-2xl cursor-pointer">
                            {' '}
                            <ArrowRightIcon />
                        </span>
                    </div>
                    {/* giao diện edit  */}
                    {editTest && (
                        <div className=" ml-[191px] p-4 rounded-md">
                            <div className="flex items-center mb-4">
                                <label className="w-32 text-gray-700 font-bold">Nội dung</label>
                                <span className="text-gray-400">Buổi {editTest.title}</span>
                            </div>


                            <div className="flex gap-x-2 items-center">
                                <label className="text-gray-700 font-bold">Ngày kiểm tra</label>

                                <DateInput
                                    value={editTest.date ? dayjs(editTest.date, "DD/MM/YYYY") : null}
                                    onChange={handleDateChange}
                                    width="180px"
                                    className="border-gray-300 ms-4"
                                />

                                <DropdownTimeSelection
                                    value={editTest.time}
                                    onChange={handleTimeChange}
                                    className='w-[150px]'
                                />

                                <Button
                                    className="border-orange-400 bg-orange-100 ml-2"
                                    size="mini"
                                    width="67px"
                                    height="32px"
                                    onClick={handleSave}
                                >
                                    Lưu
                                </Button>
                            </div>
                        </div>
                    )}

                </div>

                <div className="p-6 pl-[256px] mr-8">
                    <div className="mt-6 p-4 border rounded-lg bg-gray-50">
                        <div className="flex items-start gap-8 mb-4">
                            <p className="text-base font-bold text-gray-700 whitespace-nowrap">Mô tả:</p>
                            <textarea
                                className="w-2/3 p-2 border rounded mt-0"
                                value={testInfo.description}
                                onChange={(e) => setTestInfo({ ...testInfo, description: e.target.value })}
                            />
                        </div>

                        {/* <p><strong>Mô tả:</strong></p>
                        <textarea
                            className="w-full p-2 border rounded mt-1"
                            value={testInfo.description}
                            onChange={(e) => setTestInfo({ ...testInfo, description: e.target.value })}
                        /> */}

                        {/* Tệp đính kèm */}
                        <div className="flex items-start mb-4">
                            <p className="mt-3 text-gray-500 italic whitespace-nowrap mr-5 ml-20">Tệp đính kèm:</p>
                            <div className="flex items-center gap-2 mt-1 w-full max-w-[655px] border p-2 rounded">
                                {/* Nút tải file */}
                                <label className="cursor-pointer flex items-center gap-2">
                                    <img src={file} alt="Upload" className="w-6 h-6" />
                                    <input
                                        type="file"
                                        className="hidden"
                                        onChange={(e) => {
                                            if (e.target.files?.length) {
                                                setTestInfo({ ...testInfo, file: e.target.files[0].name });
                                            }
                                        }}
                                    />
                                </label>

                                {/* Dấu gạch đứng ngăn cách */}
                                <span className="text-gray-400">|</span>

                                {/* Hiển thị tên file */}
                                <input
                                    type="text"
                                    className="w-full bg-transparent outline-none"
                                    value={testInfo.file}
                                    readOnly
                                />
                            </div>
                        </div>

                        <label className="flex items-center gap-2 mt-3">
                            <input
                                type="checkbox"
                                checked={testInfo.requireAttachment}
                                onChange={() => setTestInfo({ ...testInfo, requireAttachment: !testInfo.requireAttachment })}
                            />
                            Yêu cầu học viên đính kèm tệp
                        </label>
                    </div>

                    {/* <div className="flex items-center mb-4">
                        <label className="w-32 text-gray-700 font-bold">Mã lớp</label>
                        <span className="text-gray-800">{Exams.examCode}</span>
                    </div>
                    <div className="flex items-center mb-4">
                        <label className="w-32 text-gray-700 font-bold">Bảo mật</label>
                        <div className="relative w-[434px]">
                            <input
                                type={showPassword ? 'text' : 'password'}
                                readOnly
                                value={Exams.password}
                                className="border border-gray-300 rounded-md p-2 text-gray-800 bg-gray-50 w-full pr-10"
                            />
                            <span className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-orange-500" onClick={handleToggleShowPassword}>
                                {showPassword ? <EyeIcon className="w-5 h-5" /> : <EyeSlashIcon className="w-5 h-5" />}
                            </span>
                        </div>
                    </div>
                    <div className="flex items-start mb-4">
                        <p className="w-32 text-gray-700 font-bold">Cài đặt khác</p>
                        <div className="flex flex-col space-y-2">
                            {Exams.options.map((option, idx) => (
                                <div className="flex items-center" key={idx}>
                                    <input type="checkbox" id={`option-${idx}`} className="mr-2 rounded" />
                                    <label htmlFor={`option-${idx}`} className="text-gray-800">
                                        {option}
                                    </label>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="flex items-center">
                        <label className="w-32 text-gray-700 font-bold">Link chia sẻ</label>
                        <input
                            type="text"
                            ref={linkRef}
                            className="w-[434px] border border-gray-300 rounded-md p-2 text-gray-800 bg-gray-50"
                            value={Exams.link}
                            readOnly
                        />
                        <Button className='primary ms-4' size='mini' width='108px' height='32px' onClick={handleCopyLink}>Copy link</Button>
                    </div> */}
                </div>


            </div>

            <div className="flex justify-center mt-4">
                <div
                    className="bg-orange-500 text-white px-6 py-3 rounded border border-orange-500"
                >
                    Bắt đầu kiểm tra
                </div>
            </div>

        </div >
    );
};

export default TestContent;
