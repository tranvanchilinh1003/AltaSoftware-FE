export interface IDepartment {
  id: string;
  name: string;
}
export interface ModalProps {
  code: string; // Mã khoa - khối
  faculty: string; // Tên khoa - khối
  headOfFaculty: string; // Trưởng khoa - khối đang được chọn
  facultyOptions: string[]; // Danh sách trưởng khoa - khối để hiển thị trong select
  onClose: () => void; // Hàm xử lý khi nhấn nút "Hủy"
  onSave: () => void; // Hàm xử lý khi nhấn nút "Lưu"
}
export interface ClassItem {
  id: string;
  code: string;
  name: string;
}

export interface ClassListProps {
  data: ClassItem[];
  selectedItems: string[];
  onSelect: (id: string) => void;
  onDelete: () => void;
  onSelectAll: () => void;
  isAllSelected: boolean;
  onClose: () => void;
}