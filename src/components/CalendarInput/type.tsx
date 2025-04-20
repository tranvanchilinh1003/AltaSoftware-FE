export interface CalendarInputProps {
    placeholder?: string; // Nội dung hiển thị ở ô input
    onDateChange?: (date: Date | null) => void; // Hàm gọi khi người dùng chọn ngày
    onMonthChange?: (month: number, year: number) => void; // Hàm gọi khi chuyển tháng
    onToggleCalendar?: (isOpen: boolean) => void; // Hàm gọi khi mở/đóng lịch
    handleDateChoose?: () => void; // Hàm gọi khi nhấn nút "Chọn"
    selectedDate?: Date | null; // Ngày được chọn (có thể null)
    initialDate?: Date; // Ngày mặc định ban đầu
    locale?: string; // Ngôn ngữ hiển thị (ví dụ: 'vi-VN')
    dayNames?: string[]; // Danh sách tên ngày trong tuần: ['CN', 'T2', ..., 'T7']
  
    // Các thuộc tính style tùy chỉnh
    style?: React.CSSProperties; // Style cho container chính
    inputStyle?: React.CSSProperties; // Style cho input
    popupStyle?: React.CSSProperties; // Style cho popup lịch
    buttonStyle?: React.CSSProperties; // Style cho nút mở lịch
    selectedDayStyle?: React.CSSProperties; // Style cho ngày được chọn
    otherMonthDayStyle?: React.CSSProperties; // Style cho ngày thuộc tháng khác
    disable?: boolean
  }
  