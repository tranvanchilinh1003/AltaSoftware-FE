import { useRef } from 'react';
import { FileUploadProps } from './type';
import upaperclip from '../../assets/icons/upaperclip.png';
import './style.scss';

const AttachFile: React.FC<FileUploadProps> = ({ fileName, onFileChange }) => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      onFileChange(event.target.files[0]);
    }
  };

  return (
    <div className="relative w-full md:w-9/12 flex items-center">
      {/* Input chứa icon và đường kẻ dọc */}
      <div className="relative w-full">
        <input
          type="text"
          className="input-with-icon w-full p-2 pl-12 pr-4 rounded-lg text-black-text cursor-pointer bg-gray-100"
          value={fileName}
          readOnly
        />
        <img src={upaperclip} alt="Tệp đính kèm" className="input-icon absolute left-3 top-1/2 transform -translate-y-1/2" />

        {/* Đường kẻ dọc */}
        <div className="absolute left-8 top-1/2 transform -translate-y-1/2 h-5 w-[1px] bg-gray-400"></div>
      </div>
      <div className="p-2"></div>
      {/* Nút chọn tệp */}
      <button type="button" className="button-file ml-2 px-4 py-2 pl-3" onClick={handleButtonClick}>
        Chọn tệp tải lên...
      </button>

      <input type="file" ref={fileInputRef} className="hidden" onChange={handleFileChange} />
    </div>
  );
};

export default AttachFile;
