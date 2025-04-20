    export interface FileUploadButtonProps {
        onFileChange: (files: File[]) => void;
        label?: string;
        accept?: string;
        bgColor?: string;
        textColor?: string;
        borderColor?: string;
        className?: string;
        children?: React.ReactNode;
        size?: "small" | "medium" | "large";
        fileInputRef?: React.RefObject<HTMLInputElement>;
    }