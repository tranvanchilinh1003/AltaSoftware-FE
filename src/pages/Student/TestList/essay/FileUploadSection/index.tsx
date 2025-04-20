import { useRef } from "react";
import FileUploadButton from "../../../../../components/FileUploadButton";

const FileUploadSection = ({ handleFileChange, errors }: { handleFileChange: (files: File[]) => void, errors: string[] }) => {
    const fileInputRef = useRef<HTMLInputElement>(null);
    return (
        <div className="mt-auto pt-40">
            <FileUploadButton
                onFileChange={handleFileChange}
                label="Chọn File"
                accept=".doc,.docx,.png,.jpg,.jpeg"
                bgColor="bg-[#FFD8B8] hover:bg-[#FFD8A8]"
                textColor="text-black"
                borderColor="border border-[#FF7506]"
                size="small"
                fileInputRef={fileInputRef}
            />
            {errors.length > 0 && (
                <div className="flex justify-center">
                    <span className="text-red-600">
                        {errors.map((error, index) => (
                            <span key={index} className="block">{error}</span>
                        ))}
                    </span>
                </div>
            )}


        </div>
    );
};

export default FileUploadSection;
