import { useState } from "react";

interface FileValidationResult {
    validFiles: File[];
    errors: string[];
}

const useFileValidation = (maxSizeMB: number = 50) => {
    const [errors, setErrors] = useState<string[]>([]);
    const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);

    const validateFiles = (files: File[]): FileValidationResult => {
        const allowedImageFormats = [".png", ".jpg", ".jpeg"];
        const allowedWordFormats = [".doc", ".docx"];
        const maxSizeBytes = maxSizeMB * 1024 * 1024;

        let newErrors = new Set<string>();
        let validFiles: File[] = [];

        // Cập nhật trạng thái hiện tại
        let hasImage = uploadedFiles.some((file) =>
            allowedImageFormats.includes(file.name.slice(file.name.lastIndexOf(".")).toLowerCase())
        );
        let hasWord = uploadedFiles.some((file) =>
            allowedWordFormats.includes(file.name.slice(file.name.lastIndexOf(".")).toLowerCase())
        );

        files.forEach((file) => {
            const fileExtension = file.name.slice(file.name.lastIndexOf(".")).toLowerCase();
            const isImage = allowedImageFormats.includes(fileExtension);
            const isWord = allowedWordFormats.includes(fileExtension);

            if (!isImage && !isWord) {
                newErrors.add(`File "${file.name}" không đúng định dạng.`);
                return;
            }
            if (file.size > maxSizeBytes) {
                newErrors.add(`File "${file.name}" vượt quá dung lượng ${maxSizeMB}MB.`);
                return;
            }


            if (uploadedFiles.some((f) => f.name === file.name && f.size === file.size)) {
                newErrors.add(`File "${file.name}" đã được tải lên.`);
                return;
            }


            if (isImage && hasImage) {
                newErrors.add("Chỉ được tải lên 1 file ảnh.");
                return;
            }
            if (isWord && hasWord) {
                newErrors.add("Chỉ được tải lên 1 file Word.");
                return;
            }

            validFiles.push(file);
            if (isImage) hasImage = true;
            if (isWord) hasWord = true;
        });

        if (validFiles.length > 0) {
            setUploadedFiles((prevFiles) => [...prevFiles, ...validFiles]);
        }

        const errorArray = Array.from(newErrors);
        setErrors(errorArray);
        return { validFiles, errors: errorArray };
    };


    const removeFile = (fileName: string) => {
        setUploadedFiles((prevFiles) => {
            const updatedFiles = prevFiles.filter((file) => file.name !== fileName);
            console.log("After remove, uploadedFiles:", updatedFiles);
            return [...updatedFiles];
        });

        setErrors((prevErrors) => prevErrors.filter((err) => !err.includes(fileName)));
    };



    return { validateFiles, removeFile, errors, uploadedFiles };
};

export default useFileValidation;
