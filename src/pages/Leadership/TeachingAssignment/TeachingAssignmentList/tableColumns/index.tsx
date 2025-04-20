import { TableColumn } from "./type";

export const columns: TableColumn[] = [
    { key: "class.code", label: "Mã lớp" },
    { key: "class.name", label: "Tên lớp" },
    { key: "startDate", label: "Ngày bắt đầu", isDate: true },
    { key: "endDate", label: "Ngày kết thúc", isDate: true },
];
