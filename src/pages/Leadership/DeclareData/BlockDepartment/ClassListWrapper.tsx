import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./style.css";
import fixCancel from "../../../../../src/assets/images/people/leadership/fi_x-cancel.png";
import fiTrash2 from "../../../../../src/assets/images/people/leadership/fi_trash-2.png";
import checkboxChecked from "../../../../../src/assets/images/people/leadership/checkbox_checked.png";
import checkboxUnchecked from "../../../../../src/assets/images/people/leadership/checkbox_unchecked.png";
import unfold from "../../../../../src/assets/images/people/leadership/unfold.png";
import { ClassItem, ClassListProps } from "./type";

const sampleData: ClassItem[] = [
    { id: "1", code: "vl009", name: "Vật Lý 9" },
    { id: "2", code: "hh010", name: "Hóa Học 10" },
    { id: "3", code: "sh010", name: "Sinh Học 10" },
    { id: "4", code: "vl010", name: "Vật Lý 10" },
    { id: "5", code: "vl009", name: "Vật Lý 9" },
    { id: "6", code: "hh010", name: "Hóa Học 10" },
    { id: "7", code: "vl009", name: "Vật Lý 9" },
    { id: "8", code: "hh010", name: "Hóa Học 10" },
    { id: "9", code: "sh010", name: "Sinh Học 10" },
    { id: "10", code: "vl010", name: "Vật Lý 10" },
];

const ClassList: React.FC<ClassListProps> = ({
    data,
    selectedItems,
    onSelect,
    onDelete,
    onSelectAll,
    isAllSelected,
    onClose,
}) => {
    return (
        <div className="class-list-container">
            <div className="header-container">
                <h2 className="class-list-title">Danh sách lớp học</h2>
                <button onClick={onClose} className="close-btn">
                    <img src={fixCancel} alt="Close Button" />
                </button>
            </div>
            <div className="delete-btn-container">
                <button className="delete-btn" onClick={onDelete} disabled={selectedItems.length === 0}>
                    <img src={fiTrash2} alt="Delete Button" className="delete-icon" />
                </button>
            </div>
            <div className="class-list-wrapper">
                <table className="class-list-table">
                    <thead>
                        <tr>
                            <th className="table-header checkbox-header" onClick={onSelectAll}>
                                <img
                                    src={isAllSelected ? checkboxChecked : checkboxUnchecked}
                                    alt="Checkbox All"
                                    className="checkbox-icon"
                                />
                            </th>
                            <th className="table-header">
                                <div className="unfold-wrapper">
                                    Mã lớp học <img src={unfold} alt="Unfold Button" />
                                </div>
                            </th>
                            <th className="table-header">
                                <div className="unfold-wrapper">
                                    Tên lớp học <img src={unfold} alt="Unfold Button" />
                                </div>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((item, index) => (
                            <tr
                                key={item.id}
                                className={`class-list-row ${index % 2 === 0 ? "bg-gray" : ""} ${selectedItems.includes(item.id) ? "selected" : ""
                                    }`}
                            >
                                <td className="checkbox-cell" onClick={() => onSelect(item.id)}>
                                    <img
                                        src={selectedItems.includes(item.id) ? checkboxChecked : checkboxUnchecked}
                                        alt="Checkbox"
                                        className="checkbox-icon"
                                    />
                                </td>
                                <td>{item.code}</td>
                                <td>{item.name}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div className="class-list-footer">
            </div>
        </div>
    );
};

const ClassListWrapper: React.FC = () => {
    const [selectedItems, setSelectedItems] = useState<string[]>([]);
    const navigate = useNavigate();

    // Hàm xử lý chọn từng checkbox
    const handleSelect = (id: string) => {
        setSelectedItems((prev) =>
            prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
        );
    };

    // Hàm xử lý chọn tất cả checkbox
    const handleSelectAll = () => {
        if (selectedItems.length === sampleData.length) {
            setSelectedItems([]); // Nếu tất cả đã chọn thì bỏ chọn hết
        } else {
            setSelectedItems(sampleData.map((item) => item.id)); // Chọn tất cả
        }
    };

    // Hàm xử lý xóa
    const handleDelete = () => {
        console.log("Deleted items:", selectedItems);
        setSelectedItems([]); // Xóa các mục đã chọn
    };

    const handleClose = () => {
        navigate("/leadership/declare-data/block-department", { replace: true }); // Điều hướng đến một trang mới và thay thế trang hiện tại trong lịch sử
    };

    return (
        <div style={{ display: "flex", justifyContent: "center", padding: "20px" }}>
            <ClassList
                data={sampleData}
                selectedItems={selectedItems}
                onSelect={handleSelect}
                onDelete={handleDelete}
                onSelectAll={handleSelectAll} // Truyền handler chọn tất cả vào
                isAllSelected={selectedItems.length === sampleData.length} // Kiểm tra xem có tất cả các mục được chọn hay không
                onClose={handleClose}  // Đảm bảo không có ký tự thừa
            />
        </div>
    );
};

export default ClassListWrapper;
