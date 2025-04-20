export interface AccordionProps<T> {
    items: T[]; // Danh sách các mục hiển thị trong Accordion
    multiple?: boolean; // Cho phép mở nhiều mục cùng lúc hay không (mặc định: false - chỉ mở một mục)
    getId: (item: T) => string; // Hàm lấy ID duy nhất của từng mục, dùng để kiểm soát trạng thái mở/đóng
    renderHeader: (item: T, isOpen: boolean) => React.ReactNode; // Hàm render phần tiêu đề (header) của mỗi mục
    renderContent: (item: T) => React.ReactNode; // Hàm render nội dung bên trong mỗi mục khi mở
    defaultOpenItems?: string[]; // Danh sách ID của các mục được mở sẵn khi load trang
    className?: string; // Custom className cho toàn bộ Accordion để dễ dàng thay đổi style
    itemClassName?: (item: T, isOpen: boolean) => string; // Hàm custom className cho từng mục dựa trên trạng thái mở/đóng
    onToggle?: (id: string, isOpen: boolean) => void; // Callback được gọi mỗi khi một mục được mở hoặc đóng
}
// cách dùng DynamicAccordion
{/* <DynamicAccordion
            items={sampleData}
            multiple={true} // Cho phép mở nhiều mục cùng lúc
            defaultOpenItems={["1"]} // Mở sẵn mục có ID "1"
            getId={(item) => item.id}
            renderHeader={(item, isOpen) => (
                <div className="flex items-center gap-2">
                    <span className="text-lg font-semibold">{item.name}</span>
                    {isOpen ? "🔽" : "▶️"}
                </div>
            )}
            renderContent={(item) => (
                <div className="p-2 text-gray-700">{item.description}</div>
            )}
            className="border border-gray-200 p-4" // Custom class cho toàn bộ accordion
            itemClassName={(item, isOpen) =>
                `p-2 border-b ${isOpen ? "bg-gray-100" : "bg-white"}`
            } // Custom class cho từng item dựa trên trạng thái mở/đóng
            onToggle={(id, isOpen) => console.log(`Item ${id} ${isOpen ? "mở" : "đóng"}`)}
        /> */}