import { Exam, Option } from "./type";
export const exams: Exam[] = [
  { class: "10A1", content: "Kiểm tra 1 tiết", subject: "Toán Hình học", date: "19/08/2020 12:00 PM", duration: "45 phút", status: "Chưa bắt đầu" },
  { class: "10A1", content: "Kiểm tra đầu giờ", subject: "Toán Đại Số", date: "24/08/2020 12:00 PM", duration: "15 phút", status: "Đã kết thúc" },
  { class: "10A1", content: "Kiểm tra nhanh", subject: "Toán Hình học", date: "30/08/2020 09:00 AM", duration: "10 phút", status: "Đã kết thúc" },
  { class: "10A2", content: "Kiểm tra chương", subject: "Toán Đại Số", date: "05/09/2020 08:30 AM", duration: "60 phút", status: "Chưa bắt đầu" },
  { class: "10A2", content: "Kiểm tra đầu giờ", subject: "Toán Đại Số", date: "05/09/2020 7:30 AM", duration: "10 phút", status: "Chưa bắt đầu" },
  { class: "10A2", content: "Kiểm tra chương", subject: "Toán Đại Số", date: "05/09/2020 2:30 PM", duration: "60 phút", status: "Đang tiến hành" }
];

export const subjectOptions: Option[] = [
  { label: 'Toán', value: 'math' },
  { label: 'Văn', value: 'literature' }
];

export const gradeOptions: Option[] = [
  { label: '10', value: '10' },
  { label: '11', value: '11' }
];
