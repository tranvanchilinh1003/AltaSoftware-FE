import React, { useState } from "react";
import useFileIcon from "../hook/useFileIcon";
import IconImages from "../../../../../components/IconImages";
import { FileItemProps } from "./type";
import { IconTablerCircleXFilled } from "../../../../../components/Icons";
const { iconSelected } = IconImages;

const FileItem: React.FC<FileItemProps & { onRemove: (file: File) => void }> = ({ file, onRemove }) => {
    const fileIcon = useFileIcon(file.name) || "/default-file-icon.png";
    const [isHovered, setIsHovered] = useState(false);

    return (
        <div
            className="relative flex items-center justify-between border-b border-gray-200 py-4 px-3 bg-white shadow-sm rounded-lg"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            {/* Phần icon + tên file */}
            <div className="flex items-center space-x-3 w-full overflow-hidden">
                <img
                    src={fileIcon}
                    alt="file icon"
                    className="w-10 h-10 object-contain rounded-sm flex-shrink-0"
                    onError={(e) => (e.currentTarget.src = "/default-file-icon.png")}
                />
                <span className="text-sm font-medium text-gray-700 truncate overflow-hidden whitespace-nowrap w-[150px] sm:w-[250px] lg:w-auto">
                    {file.name}
                </span>
            </div>

            {/* Phần icon selected hoặc xoá */}
            <div className="flex-shrink-0 w-6 h-6">
                {isHovered ? (
                    <IconTablerCircleXFilled
                        className="w-full h-full text-red-500 cursor-pointer"
                        onClick={() => onRemove(file)} // Gọi hàm xóa với toàn bộ file
                    />
                ) : typeof iconSelected === "string" ? (
                    <img src={iconSelected} alt="selected icon" className="w-full h-full object-contain" />
                ) : (
                    iconSelected
                )}
            </div>
        </div>
    );
};


export default FileItem;
