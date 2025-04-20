import React, { useRef } from "react";
import { FileUploadButtonProps } from "./type";


const FileUploadButton: React.FC<FileUploadButtonProps> = ({
    onFileChange,
    label = "Chọn tệp",
    accept = ".doc,.docx,.png,.jpg,.jpeg",
    bgColor = "bg-blue-500",
    textColor = "text-white",
    borderColor = "border-transparent",
    className = "",
    children,
    size = "medium",
    fileInputRef,
}) => {


    const handleClick = () => {
        fileInputRef?.current?.click();
    };

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files) {
            const filesArray = Array.from(event.target.files); // Chuyển thành mảng
            onFileChange(filesArray); // Truyền danh sách file lên component cha
        }
    };
    const sizeClasses = {
        small: "py-0.5 px-2 text-sm",
        medium: "py-1 px-2 text-base",
        large: "py-2 px-4 text-lg"
    };
    return (
        <div className="relative flex flex-col items-center">
            {/* Nút chọn file */}
            <button
                type="button"
                onClick={handleClick}
                className={`py-2 px-4 font-semibold rounded-lg shadow-md transition duration-200 ${bgColor} ${textColor} ${borderColor} ${sizeClasses[size]} ${className}`}
            >
                {children || label}
            </button>

            {/* Input file ẩn */}
            <input
                type="file"
                ref={fileInputRef}
                accept={accept}
                multiple
                onChange={handleFileChange}
                className="hidden"
            />
        </div>
    );
};

export default FileUploadButton;
