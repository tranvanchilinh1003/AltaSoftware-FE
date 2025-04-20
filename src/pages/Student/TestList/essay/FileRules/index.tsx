import TextComponent from "../../../../../components/Text";

const FileRules = () => {
    return (
        <div className="text-gray-700 text-sm leading-relaxed p-3 bg-white rounded-md shadow-sm">
            <TextComponent text="* Quy định nộp bài:" weight="extrabold" size={14} className="[&_p]:pb-0" />
            <ul className="list-none pl-2">
                <li>- Mỗi học viên chỉ được gửi tối đa <b>1 file word (.doc, .docx)</b> và <b>1 file ảnh (.png, .jpg, .jpeg)</b>. Dung lượng tối đa là <b>50MB</b>. Khi tải lên một File tương ứng, File cũ sẽ bị xóa.</li>
                <li>- Học viên có thể lưu bài nhiều lần. Khi hết thời lượng làm bài, hệ thống sẽ tự động đóng bài kiểm tra. Kết quả được tính dựa theo <b>lần lưu sau cùng</b>.</li>
            </ul>
        </div>
    );
};

export default FileRules;
