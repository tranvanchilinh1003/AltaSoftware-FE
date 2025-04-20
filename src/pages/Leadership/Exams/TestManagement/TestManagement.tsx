import React, { useState, useCallback, useEffect } from "react";
import Button from "../../../../components/Button";
import DropdownSelectionComponent from "../../../../components/DropdownSelection";
import AddressList from "../../../../components/AddressUrlStack/Index";
import { useNavigate } from "react-router";
import dayjs from "dayjs";
import DateInput from "../../../../components/Date";
import { ITestManagement } from "./type";
const teachers: ITestManagement[] = [
    {
        id: 1,
        date: "Thứ 5, 21/08/2020 12:00 PM",
        grade: 6,
        class: "6A1",
        subject: "Toán Đại Số",
        teacher: "GV. Nguyễn Văn A",
        examContent: "Kiểm tra 1 tiết",
        duration: "45 phút",
        status: "Chờ phê duyệt",
        approval: "pending",
    },
    {
        id: 2,
        date: "Thứ 5, 21/08/2020 12:00 PM",
        grade: 8,
        class: "8C",
        subject: "Toán Hình Học",
        teacher: "GV. Nguyễn Văn A",
        examContent: "Kiểm tra 1 tiết",
        duration: "45 phút",
        status: "Chờ phê duyệt",
        approval: "pending",
    },
    {
        id: 3,
        date: "Thứ 5, 21/08/2020 12:00 PM",
        grade: 7,
        class: "7B",
        subject: "Toán Hình Học",
        teacher: "GV. Nguyễn Văn A",
        examContent: "Kiểm tra đầu giờ",
        duration: "15 phút",
        status: "Chưa bắt đầu",
        approval: "rejected",
    },
    {
        id: 4,
        date: "Thứ 5, 21/08/2020 12:00 PM",
        grade: 6,
        class: "6A1",
        subject: "Toán Đại Số",
        teacher: "GV. Nguyễn Văn A",
        examContent: "Kiểm tra 1 tiết",
        duration: "45 phút",
        status: "Đang diễn ra",
        approval: "rejected",
    },
    {
        id: 5,
        date: "Thứ 5, 21/08/2020 12:00 PM",
        grade: 6,
        class: "6A1",
        subject: "Toán Hình Học",
        teacher: "GV. Nguyễn Văn A",
        examContent: "Kiểm tra 1 tiết",
        duration: "45 phút",
        status: "Đã tiến hành",
        approval: "approved",
    },
    {
        id: 6,
        date: "Thứ 5, 21/08/2020 12:00 PM",
        grade: 6,
        class: "6A1",
        subject: "Toán Hình Học",
        teacher: "GV. Nguyễn Văn A",
        examContent: "Kiểm tra 1 tiết",
        duration: "90 phút",
        status: "Đã hoàn thành",
        approval: "approved",
    },
    {
        id: 7,
        date: "Thứ 5, 21/08/2020 12:00 PM",
        grade: 6,
        class: "6A1",
        subject: "Toán Đại Số",
        teacher: "GV. Nguyễn Văn A",
        examContent: "Kiểm tra đầu giờ",
        duration: "15 phút",
        status: "Đã hoàn thành",
        approval: "approved",
    },
    {
        id: 8,
        date: "Thứ 5, 21/08/2020 12:00 PM",
        grade: 6,
        class: "6A1",
        subject: "Toán Hình Học",
        teacher: "GV. Nguyễn Văn A",
        examContent: "Kiểm tra đầu giờ",
        duration: "15 phút",
        status: "Chưa bắt đầu",
        approval: "approved",
    },
];

const option_selectClass = ["6A", "6B", "6C"];
const option_selectBlock = ["Khối 6", "Khối 7", "Khối 8"];


const TestManagement: React.FC = () => {
    const [data, setData] = useState<ITestManagement[]>([]);
    const [urls, setUrls] = useState([{ link: "/", linkName: "Quản lý bài kiểm tra" }])

    const [itemsPerPage, setItemsPerPage] = useState(8);
    const navigate = useNavigate();
    const [selectedStartDate, setSelecteStartDate] = useState<dayjs.Dayjs | null>(dayjs());
    const [selectedEndDate, setSelecteEndDate] = useState<dayjs.Dayjs | null>(dayjs());

    const handleItemsPerPageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setItemsPerPage(Number(e.target.value));
    };
    const handleApproval = (index: number, type: "approved" | "rejected") => {
        const newData = [...data];
        newData[index].approval = type;
        setData(newData);
    };
    const goDetail = (id: number) => {
        navigate(`/leadership/exams/test-management/${id}`);
    };
    const goCreate = () => {
        navigate(`/leadership/exams/create-exam-schedule`);
    };
    useEffect(() => {
        setData(teachers);
    }, []);


    return (
        <div className="p-3">
            <AddressList addressList={urls} />
            <div className="flex justify-between items-center mb-6">
                <div className="flex add-grade-modal__button-group">
                    <DropdownSelectionComponent
                        label='Tình trạng'
                        width={144}

                    />
                    <DropdownSelectionComponent
                        label='Chọn lớp'
                        options={option_selectClass}
                        width={144}
                    />
                    <DropdownSelectionComponent
                        label='Chọn khối'
                        options={option_selectBlock}
                        width={144}
                    />
                    <div className="flex">
                        <div className="flex items-center ms-3">
                            <p className="">Từ ngày</p>
                            <DateInput
                                value={selectedStartDate}
                                onChange={setSelecteStartDate}
                                style={{ height: '32px' }}
                                width={'144px'}
                            />
                        </div>
                        <div className="flex items-center ms-2">
                            <p className="">Đến ngày</p>
                            <DateInput
                                value={selectedEndDate}
                                onChange={setSelecteEndDate}
                                style={{ height: '32px' }}
                                width={'144px'}
                            />
                        </div>
                    </div>
                </div>
                <div className="space-x-2 flex justify-between">
                    <Button className="primary" onClick={goCreate}>+ Thêm mới</Button>
                </div>
            </div>

            <div className=" flex flex-col min-h-[752px]  bg-background-white shadow-custom rounded-lg">
                <div className="flex flex-wrap justify-between items-center px-2 md:px-10 pt-4 gap-2 ">
                    <h2 className="text-lg font-sans font-bold">Xem chi tiết bài kiểm tra</h2>
                    <div className="relative flex items-center w-full max-w-xs sm:w-[438px] rounded-[30px] border border-gray-300 bg-gray-200">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="ms-3">
                            <path fillRule="evenodd" clipRule="evenodd" d="M11 4C7.13401 4 4 7.13401 4 11C4 14.866 7.13401 18 11 18C14.866 18 18 14.866 18 11C18 7.13401 14.866 4 11 4ZM2 11C2 6.02944 6.02944 2 11 2C15.9706 2 20 6.02944 20 11C20 15.9706 15.9706 20 11 20C6.02944 20 2 15.9706 2 11Z" fill="#C5C5C5" />
                            <path fillRule="evenodd" clipRule="evenodd" d="M15.9429 15.9433C16.3334 15.5528 16.9666 15.5528 17.3571 15.9433L21.7071 20.2933C22.0976 20.6838 22.0976 21.317 21.7071 21.7075C21.3166 22.098 20.6834 22.098 20.2929 21.7075L15.9429 17.3575C15.5524 16.967 15.5524 16.3338 15.9429 15.9433Z" fill="#C5C5C5" />
                        </svg>
                        <input
                            type="text"
                            placeholder="Tìm kiếm"
                            className="w-full h-[40px] pl-2 pr-4 rounded-[30px] border-none focus:outline-none focus:ring-0 italic bg-gray-200"
                        />
                    </div>
                </div>
                <div className="overflow-x-auto py-6 px-8">
                    <table className="min-w-full  border-collapse overflow-hidden rounded-t-lg">
                        <thead className="bg-gradient-to-r from-background-orange-1 to-background-1 text-white">
                            <tr>
                                <th className="py-3 px-4 text-left whitespace-nowrap ">
                                    <div className="flex items-center font-sans">
                                        <span>Ngày làm bài </span>

                                    </div>
                                </th>
                                <th className="py-3 px-4 text-left whitespace-nowrap ">
                                    <div className="flex items-center font-sans">
                                        <span>Khoa khối </span>
                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M9.70994 9.7158L11.9999 7.4158L14.2899 9.7158C14.3829 9.80953 14.4935 9.88392 14.6154 9.93469C14.7372 9.98546 14.8679 10.0116 14.9999 10.0116C15.132 10.0116 15.2627 9.98546 15.3845 9.93469C15.5064 9.88392 15.617 9.80953 15.7099 9.7158C15.8037 9.62284 15.8781 9.51223 15.9288 9.39038C15.9796 9.26852 16.0057 9.13781 16.0057 9.0058C16.0057 8.87379 15.9796 8.74308 15.9288 8.62122C15.8781 8.49936 15.8037 8.38876 15.7099 8.2958L12.7099 5.2958C12.617 5.20207 12.5064 5.12768 12.3845 5.07691C12.2627 5.02614 12.132 5 11.9999 5C11.8679 5 11.7372 5.02614 11.6154 5.07691C11.4935 5.12768 11.3829 5.20207 11.2899 5.2958L8.28994 8.2958C8.10164 8.4841 7.99585 8.7395 7.99585 9.0058C7.99585 9.2721 8.10164 9.52749 8.28994 9.7158C8.47825 9.9041 8.73364 10.0099 8.99994 10.0099C9.26624 10.0099 9.52164 9.9041 9.70994 9.7158Z" fill="white" />
                                            <path d="M11.603 18.9856C11.4811 18.9348 11.3705 18.8604 11.2775 18.7667L8.27753 15.7267C8.1838 15.6337 8.10941 15.5231 8.05864 15.4013C8.00787 15.2794 7.98173 15.1487 7.98173 15.0167C7.98173 14.8847 8.00787 14.754 8.05864 14.6321C8.10941 14.5103 8.1838 14.3997 8.27753 14.3067C8.37049 14.213 8.48109 14.1386 8.60295 14.0878C8.72481 14.037 8.85552 14.0109 8.98753 14.0109C9.11954 14.0109 9.25025 14.037 9.3721 14.0878C9.49396 14.1386 9.60456 14.213 9.69753 14.3067L11.9875 16.6467L14.2775 14.3067C14.4711 14.1184 14.7316 14.0147 15.0017 14.0185C15.2717 14.0222 15.5292 14.1331 15.7175 14.3267C15.9058 14.5203 16.0095 14.7808 16.0058 15.0508C16.002 15.3209 15.8911 15.5784 15.6975 15.7667L12.6975 18.7667C12.6046 18.8604 12.494 18.9348 12.3721 18.9856C12.2502 19.0364 12.1195 19.0625 11.9875 19.0625C11.8555 19.0625 11.7248 19.0364 11.603 18.9856Z" fill="white" />
                                        </svg>
                                    </div>
                                </th>
                                <th className="py-3 px-4 text-left whitespace-nowrap ">
                                    <div className="flex items-center font-sans">
                                        <span>Lớp </span>
                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M9.70994 9.7158L11.9999 7.4158L14.2899 9.7158C14.3829 9.80953 14.4935 9.88392 14.6154 9.93469C14.7372 9.98546 14.8679 10.0116 14.9999 10.0116C15.132 10.0116 15.2627 9.98546 15.3845 9.93469C15.5064 9.88392 15.617 9.80953 15.7099 9.7158C15.8037 9.62284 15.8781 9.51223 15.9288 9.39038C15.9796 9.26852 16.0057 9.13781 16.0057 9.0058C16.0057 8.87379 15.9796 8.74308 15.9288 8.62122C15.8781 8.49936 15.8037 8.38876 15.7099 8.2958L12.7099 5.2958C12.617 5.20207 12.5064 5.12768 12.3845 5.07691C12.2627 5.02614 12.132 5 11.9999 5C11.8679 5 11.7372 5.02614 11.6154 5.07691C11.4935 5.12768 11.3829 5.20207 11.2899 5.2958L8.28994 8.2958C8.10164 8.4841 7.99585 8.7395 7.99585 9.0058C7.99585 9.2721 8.10164 9.52749 8.28994 9.7158C8.47825 9.9041 8.73364 10.0099 8.99994 10.0099C9.26624 10.0099 9.52164 9.9041 9.70994 9.7158Z" fill="white" />
                                            <path d="M11.603 18.9856C11.4811 18.9348 11.3705 18.8604 11.2775 18.7667L8.27753 15.7267C8.1838 15.6337 8.10941 15.5231 8.05864 15.4013C8.00787 15.2794 7.98173 15.1487 7.98173 15.0167C7.98173 14.8847 8.00787 14.754 8.05864 14.6321C8.10941 14.5103 8.1838 14.3997 8.27753 14.3067C8.37049 14.213 8.48109 14.1386 8.60295 14.0878C8.72481 14.037 8.85552 14.0109 8.98753 14.0109C9.11954 14.0109 9.25025 14.037 9.3721 14.0878C9.49396 14.1386 9.60456 14.213 9.69753 14.3067L11.9875 16.6467L14.2775 14.3067C14.4711 14.1184 14.7316 14.0147 15.0017 14.0185C15.2717 14.0222 15.5292 14.1331 15.7175 14.3267C15.9058 14.5203 16.0095 14.7808 16.0058 15.0508C16.002 15.3209 15.8911 15.5784 15.6975 15.7667L12.6975 18.7667C12.6046 18.8604 12.494 18.9348 12.3721 18.9856C12.2502 19.0364 12.1195 19.0625 11.9875 19.0625C11.8555 19.0625 11.7248 19.0364 11.603 18.9856Z" fill="white" />
                                        </svg>
                                    </div>

                                </th>
                                <th className="py-3 px-4 text-left whitespace-nowrap ">
                                    <div className="flex items-center font-sans">
                                        <span>Môn học </span>
                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M9.70994 9.7158L11.9999 7.4158L14.2899 9.7158C14.3829 9.80953 14.4935 9.88392 14.6154 9.93469C14.7372 9.98546 14.8679 10.0116 14.9999 10.0116C15.132 10.0116 15.2627 9.98546 15.3845 9.93469C15.5064 9.88392 15.617 9.80953 15.7099 9.7158C15.8037 9.62284 15.8781 9.51223 15.9288 9.39038C15.9796 9.26852 16.0057 9.13781 16.0057 9.0058C16.0057 8.87379 15.9796 8.74308 15.9288 8.62122C15.8781 8.49936 15.8037 8.38876 15.7099 8.2958L12.7099 5.2958C12.617 5.20207 12.5064 5.12768 12.3845 5.07691C12.2627 5.02614 12.132 5 11.9999 5C11.8679 5 11.7372 5.02614 11.6154 5.07691C11.4935 5.12768 11.3829 5.20207 11.2899 5.2958L8.28994 8.2958C8.10164 8.4841 7.99585 8.7395 7.99585 9.0058C7.99585 9.2721 8.10164 9.52749 8.28994 9.7158C8.47825 9.9041 8.73364 10.0099 8.99994 10.0099C9.26624 10.0099 9.52164 9.9041 9.70994 9.7158Z" fill="white" />
                                            <path d="M11.603 18.9856C11.4811 18.9348 11.3705 18.8604 11.2775 18.7667L8.27753 15.7267C8.1838 15.6337 8.10941 15.5231 8.05864 15.4013C8.00787 15.2794 7.98173 15.1487 7.98173 15.0167C7.98173 14.8847 8.00787 14.754 8.05864 14.6321C8.10941 14.5103 8.1838 14.3997 8.27753 14.3067C8.37049 14.213 8.48109 14.1386 8.60295 14.0878C8.72481 14.037 8.85552 14.0109 8.98753 14.0109C9.11954 14.0109 9.25025 14.037 9.3721 14.0878C9.49396 14.1386 9.60456 14.213 9.69753 14.3067L11.9875 16.6467L14.2775 14.3067C14.4711 14.1184 14.7316 14.0147 15.0017 14.0185C15.2717 14.0222 15.5292 14.1331 15.7175 14.3267C15.9058 14.5203 16.0095 14.7808 16.0058 15.0508C16.002 15.3209 15.8911 15.5784 15.6975 15.7667L12.6975 18.7667C12.6046 18.8604 12.494 18.9348 12.3721 18.9856C12.2502 19.0364 12.1195 19.0625 11.9875 19.0625C11.8555 19.0625 11.7248 19.0364 11.603 18.9856Z" fill="white" />
                                        </svg>
                                    </div>
                                </th>
                                <th className="py-3 px-4 text-left whitespace-nowrap ">
                                    <div className="flex items-center font-sans">
                                        <span>Giảng viên </span>

                                    </div>
                                </th>
                                <th className="py-3 px-4 text-left whitespace-nowrap ">
                                    <div className="flex items-center font-sans">
                                        <span>Nội dung kiểm tra </span>

                                    </div>
                                </th>
                                <th className="py-3 px-4 text-left whitespace-nowrap">
                                    <div className="flex items-center font-sans">
                                        <span>Thời lượng </span>
                                    </div>
                                </th>
                                <th className="py-3 px-4 text-left whitespace-nowrap">
                                    <div className="flex items-center font-sans">
                                        <span>Tình trạng </span>
                                    </div>
                                </th>
                                <th className="py-3 px-4 text-left whitespace-nowrap whitespace-nowrap">
                                    <div className="flex items-center font-sans">
                                        <span>Phê duyệt </span>
                                    </div>
                                </th>
                                <th className="py-3 px-4 text-left whitespace-nowrap"></th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.map((item, index) => (
                                <tr key={index} className={`border-b ${index % 2 === 1 ? 'bg-gray-100' : ''}`}>
                                    <td className="py-3 px-4 text-black-text ">{item.date}</td>
                                    <td className="py-3 px-4 text-black-text ">{item.grade}</td>
                                    <td className="py-3 px-4 text-black-text ">{item.class}</td>
                                    <td className="py-3 px-4 text-black-text whitespace-nowrap">{item.subject}</td>
                                    <td className="py-3 px-4 text-black-text whitespace-nowrap">{item.teacher}</td>
                                    <td className="py-3 px-4 text-black-text whitespace-nowrap">{item.examContent}</td>
                                    <td className="py-3 px-4 text-black-text whitespace-nowrap">{item.duration}</td>
                                    <td className="py-3 px-4 text-gray-400 italic whitespace-nowrap">{item.status}</td>
                                    <td className="py-3 px-4 text-black-text">
                                        {item.approval === "pending" ? (
                                            <div className="flex">
                                                <Button
                                                    className="primary" size="mini"
                                                    width="106px"
                                                    style={{ marginRight: '5px' }}
                                                    onClick={goDetail.bind(null, item.id)}
                                                >
                                                    Xác nhận
                                                </Button>
                                                <Button
                                                    className="outline-primary"
                                                    size="mini"
                                                    onClick={handleApproval.bind(null, index, "rejected")}
                                                    width="69px"
                                                >
                                                    Hủy
                                                </Button>
                                            </div>
                                        ) : item.approval === "approved" ? (
                                            <span className="text-blue-400 italic font-semibold">Đã duyệt</span>
                                        ) : (
                                            <span className="text-gray-400 italic">Đã hủy</span>
                                        )}
                                    </td>
                                    <td className="">
                                        <button onClick={goDetail.bind(null, item.id)}>
                                            <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M29.2268 15.4663C26.5334 9.21301 21.4668 5.33301 16.0001 5.33301C10.5334 5.33301 5.46676 9.21301 2.77342 15.4663C2.7 15.6346 2.66211 15.8161 2.66211 15.9997C2.66211 16.1832 2.7 16.3648 2.77342 16.533C5.46676 22.7863 10.5334 26.6663 16.0001 26.6663C21.4668 26.6663 26.5334 22.7863 29.2268 16.533C29.3002 16.3648 29.3381 16.1832 29.3381 15.9997C29.3381 15.8161 29.3002 15.6346 29.2268 15.4663ZM16.0001 23.9997C11.7734 23.9997 7.77342 20.9463 5.46676 15.9997C7.77342 11.053 11.7734 7.99967 16.0001 7.99967C20.2268 7.99967 24.2268 11.053 26.5334 15.9997C24.2268 20.9463 20.2268 23.9997 16.0001 23.9997ZM16.0001 10.6663C14.9453 10.6663 13.9141 10.9791 13.037 11.5652C12.16 12.1512 11.4764 12.9842 11.0727 13.9587C10.6691 14.9332 10.5634 16.0056 10.7692 17.0402C10.975 18.0747 11.483 19.025 12.2289 19.7709C12.9747 20.5168 13.925 21.0247 14.9596 21.2305C15.9942 21.4363 17.0665 21.3307 18.0411 20.927C19.0156 20.5234 19.8486 19.8398 20.4346 18.9627C21.0206 18.0857 21.3334 17.0545 21.3334 15.9997C21.3334 14.5852 20.7715 13.2286 19.7713 12.2284C18.7711 11.2282 17.4146 10.6663 16.0001 10.6663ZM16.0001 18.6663C15.4727 18.6663 14.9571 18.5099 14.5186 18.2169C14.08 17.9239 13.7382 17.5074 13.5364 17.0202C13.3346 16.5329 13.2818 15.9967 13.3847 15.4794C13.4876 14.9622 13.7415 14.487 14.1145 14.1141C14.4874 13.7411 14.9626 13.4871 15.4798 13.3842C15.9971 13.2814 16.5333 13.3342 17.0206 13.536C17.5078 13.7378 17.9243 14.0796 18.2173 14.5182C18.5104 14.9567 18.6668 15.4723 18.6668 15.9997C18.6668 16.7069 18.3858 17.3852 17.8857 17.8853C17.3856 18.3854 16.7073 18.6663 16.0001 18.6663Z" fill="#FF7506" />
                                            </svg>
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                </div>

                <div className="mt-auto flex flex-wrap justify-center md:justify-between items-center px-2 md:px-10 p-4 mb-5 text-black-text font-sans italic text-sm gap-2">
                    <div className="flex items-center space-x-2 font-sans">
                        <span>Hiển thị</span>
                        <input
                            type="number"
                            min={1}
                            value={itemsPerPage}
                            onChange={handleItemsPerPageChange}
                            className="w-12 h-7 border border-border-orange rounded-md text-center text-black-text focus:outline-none focus:ring-1 focus:ring-border-orange"
                        />
                        <span>hàng trong mỗi trang</span>
                    </div>

                    <div className="flex space-x-1 md:space-x-2 items-center text-black-text text-sm font-sans">
                        <button>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-chevron-left" viewBox="0 0 16 16">
                                <path fillRule="evenodd" d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0" />
                            </svg>
                        </button>
                        <button className="text-black-text">1</button>
                        <button className="w-[26px] h-[26px] rounded-full bg-background-orange-1 text-white flex items-center justify-center font-medium">
                            2
                        </button>
                        <button className="text-black">3</button>
                        <button className="text-black">...</button>
                        <button className="text-black">10</button>
                        <button>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-chevron-right" viewBox="0 0 16 16">
                                <path fillRule="evenodd" d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708" />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
        </div>

    );
};

export default TestManagement;
