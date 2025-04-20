import React, { useRef, useState } from 'react';
import { IExamSession, Session } from './type';
import { ArrowLeftIcon, ArrowRightIcon } from '../../../../components/Icons/IconComponents';
import AddressList from '../../../../components/AddressUrlStack/Index';
import SwitchTag from '../../../../components/SwitchTag';
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/solid';
import Button from '../../../../components/Button';
import DateInput from '../../../../components/Date';
import dayjs, { Dayjs } from "dayjs";
import DropdownSelectionComponent from '../../../../components/DropdownSelection';
import DropdownTimeSelection from '../../../../components/DropdownTimeSelection/DropdownTimeSelection';

const labels = [
    { link: "/", linkName: "Quản lý lớp học" },
    { link: "/", linkName: "Thông tin lớp học" },
    { link: "/", linkName: "Lịch sử" },
]

const tabOptions = {
    labels: ["Thông tin lớp học", "Hỏi đáp Q & A"],
    paths: ["/teacher/class-list/class-detail/1", ""],
};
const options_time = ["00:00", "11:11", "22:22"];
const Exams: IExamSession = {
    id: 1,
    teacher: 'Nguyễn Văn A',
    avatar: 'https://i.pinimg.com/474x/f0/f8/85/f0f885b81b5848e9b9379f3e6e0a2437.jpg',
    class: '6',
    subject: 'Lịch sử',
    startDate: '19/08/2020',
    endDate: '24/08/2020',
    describe: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam placerat, nulla nec tincidunt tincidunt, neque erat bibendum lectus',
    sessions: [
        { id: 1, sessions: 1, date: '19/08/2020', time: '14:00 - 14:45', studentCount: 107, isEditing: false },
        { id: 2, sessions: 2, date: '06/03/2025', time: '14:00 - 23:55', studentCount: 23, isEditing: false },
        { id: 3, sessions: 3, date: '06/03/2026', time: '15:00 - 23:45', studentCount: 23, isEditing: false },
        { id: 4, sessions: 4, date: '22/08/2026', time: '15:00 - 16:30', studentCount: 23, isEditing: false },
        { id: 5, sessions: 5, date: '23/08/2026', time: '16:00 - 16:45', studentCount: 23, isEditing: false },
        { id: 6, sessions: 6, date: '24/08/2026', time: '16:00 - 16:45', studentCount: 23, isEditing: false },
    ],
    totalSessions: 6,
    examCode: '785 4512 6325',
    link: 'https://school.edu.vn/baiang/10aidaisobtl1',
    options: ['Tải danh sách học sinh tham gia thi', 'Tải danh sách lớp bị hủy', 'Xuất danh sách lớp tham gia thi'],
    password: 'hihihihihihih'
};

const ClassDetail: React.FC = () => {
    const [sessions, setSessions] = useState<Session[]>(Exams.sessions);
    const [editSession, setEditSession] = useState<Session | null>(null);
    const [showPassword, setShowPassword] = useState(false);
    const linkRef = useRef<HTMLInputElement>(null);

    const handleCopyLink = () => {
        if (linkRef.current) {
            navigator.clipboard.writeText(linkRef.current.value)
                .then(() => alert('Đã sao chép link!'))
                .catch((err) => console.error('Lỗi khi sao chép:', err));
        }
    };
    const handleToggleShowPassword = () => {
        setShowPassword(!showPassword);
    };
    const isUpcomingSession = (date: string, time: string) => {
        const [day, month, year] = date.split('/').map(Number);
        const [startHour, startMinute] = time.split(' - ')[0].split(':').map(Number);
        const startTime = new Date(year, month - 1, day, startHour, startMinute);
        const now = new Date();
        return now < startTime; // Trả về true nếu buổi học chưa diễn ra
    };
    const handleEdit = (session: Session) => {
        setEditSession({
            ...session,
            date: session.date ? dayjs(session.date, "DD/MM/YYYY") : null,  // Thêm format để tránh lỗi
        });
    };



    const handleSave = () => {
        if (editSession) {
            setSessions(sessions.map((s) => (s.id === editSession.id ? editSession : s)));
            setEditSession(null);
        }
    };

    const handleDelete = (id: number) => {
        setSessions(sessions.filter((s) => s.id !== id));
    };
    const getSessionBgColor = (date: string, time: string) => {
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
        if (editSession) {
            setEditSession({
                ...editSession,
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
        setEditSession((prev) => (prev ? { ...prev, time: newTime } : null));
    };


    return (
        <div className="p-3">

            <AddressList
                addressList={labels}
            />


            <div className="flex justify-between items-center mb-6 mt-6">
                <SwitchTag className="w-48" options={tabOptions} />
            </div>
            <div className=" relative  bg-gray-50 bg-white rounded-[16px] shadow-md mx-auto w-full max-w-[1680px] min-h-[720px]">
                <div className="flex items-center pb-4 bg-white p-6">
                    <div className="w-[110px] h-[110px] rounded-full overflow-hidden border-2 border-gray-300 mr-10 ms-6">
                        <img src={Exams.avatar} alt="Teacher" className="w-[110px] h-[110px] rounded-full object-cover mr-12" />
                    </div>
                    <div className="flex-1 grid grid-cols-[1fr_2fr] gap-x-4 gap-y-4 ml-4">

                        <div className="border-l pl-12">
                            <p className="text-base font-bold text-gray-700 mb-4">
                                Giáo viên: <span className="font-normal">{Exams.teacher}</span>
                            </p>
                            <p className="text-base font-bold text-gray-700 ">
                                Bộ môn: <span className="font-normal">{Exams.subject}</span>
                            </p>
                        </div>

                        <div className="border-l pl-12">
                            <p className="text-base font-bold text-gray-700">
                                Mô tả:
                                <span className="font-normal text-gray-500 mb-4">
                                    {' '}
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam placerat, nulla nec tincidunt tincidunt, neque erat bibendum lectus
                                </span>
                            </p>
                            <p className="text-base font-bold text-gray-700">
                                Lớp: <span className="font-normal">10A1</span>
                            </p>
                        </div>
                    </div>
                </div>

                <div className='bg-[#F0F3F6] pl-12 py-2'>

                    {/* Main Content */}
                    <div className="max-w-sm ml-[191px] p-4 rounded-md ">
                        <div className="grid grid-cols-2 gap-y-2">
                            <div className="font-bold text-gray-700">Lịch học</div>
                            <div className="text-gray-700 text-right text-start">
                                Tổng số <span className="font-bold">{Exams.totalSessions}</span> buổi
                            </div>

                            <div className="font-bold text-gray-700">Ngày bắt đầu</div>
                            <div className="text-gray-700 text-right text-start">{Exams.startDate}</div>

                            <div className="font-bold text-gray-700">Ngày kết thúc</div>
                            <div className="text-gray-700 text-right text-start">{Exams.endDate}</div>
                        </div>
                    </div>

                    {/* Session Grid */}
                    <div className="flex items-center gap-2 mb-6 ml-[175px] ">
                        <span className="text-gray-400 text-2xl cursor-pointer">
                            <ArrowLeftIcon />
                        </span>
                        <div className="flex gap-3">
                            {Exams.sessions.map((session, index) => {
                                const bgColor = getSessionBgColor(formatDate(session.date), session.time);
                                const textColor = getTextColor(bgColor);
                                const isUpcoming = isUpcomingSession(formatDate(session.date), session.time);
                                return (
                                    <div>
                                        <div key={session.id} className={`p-3 rounded-lg text-center min-w-[124px] h-[120px] shadow-sm  ${bgColor}`}>
                                            <p className={`font-bold text-base bg-white rounded-[14px] h-[27px] items-center justify-center ${textColor}`}>
                                                Buổi {session.sessions}
                                            </p>
                                            <p className="text-base text-center font-bold text-white">
                                                {formatDate(session.date)}
                                            </p>
                                            <p className="text-[18px] font-bold text-white whitespace-nowrap">
                                                {session.time}
                                            </p>

                                        </div>
                                        <div>
                                            {/* hiện update  */}
                                            {isUpcoming && (
                                                <div className="mt-2 flex justify-center gap-2">
                                                    <button className={`w-8 h-8 flex items-center justify-center text-gray-300`} onClick={handleEdit.bind(null, session)}>
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" className={`bi bi-pencil-square ${editSession?.id == session.id ? 'text-gray-400' : 'text-orange-500'}`} viewBox="0 0 16 16">
                                                            <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                                                            <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z" />
                                                        </svg>
                                                    </button>
                                                    <button onClick={handleDelete.bind(null, session.id)}>
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
                            {/* Thêm buổi  */}
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
                    {editSession && (
                        <div className=" ml-[191px] p-4 rounded-md">
                            <div className="flex items-center mb-4">
                                <label className="w-32 text-gray-700 font-bold">Nội dung</label>
                                <span className="text-gray-400">Buổi {editSession.sessions}</span>
                            </div>


                            <div className="flex gap-x-2 items-center">
                                <label className="text-gray-700 font-bold">Ngày kiểm tra</label>

                                <DateInput
                                    value={editSession.date ? dayjs(editSession.date, "DD/MM/YYYY") : null}
                                    onChange={handleDateChange}
                                    width="180px"
                                    className="border-gray-300 ms-4"
                                />

                                <DropdownTimeSelection
                                    value={editSession.time}
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
                    <div className="flex items-center mb-4">
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
                    </div>
                </div>


            </div>
        </div >
    );
};

export default ClassDetail;