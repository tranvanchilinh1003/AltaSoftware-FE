import TextComponent from "../../../../../components/Text";
import FileItem from "../FileItem";

const FileList = ({ uploadedFiles, onRemoveFile }: { uploadedFiles: File[]; onRemoveFile: (file: File) => void }) => {
    return (
        <div className="space-y-2">
            <TextComponent text="Tệp đính kèm của học sinh:" weight="extrabold" size={14} className="[&_p]:pb-0" />
            {uploadedFiles.map((file, index) => (
                <FileItem key={index} file={file} onRemove={onRemoveFile} />
            ))}
            <div className="border-b border-gray-200"></div>
        </div>
    );
};


export default FileList;
