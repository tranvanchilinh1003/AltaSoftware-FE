// src/NotificationForm/index.tsx

import React, { useState, useEffect } from 'react';
import { Editor } from '@tinymce/tinymce-react';
import Button from '../../../../components/Button';
import type { NotificationFormProps, NotificationData } from './type';

const NotificationForm: React.FC<NotificationFormProps> = ({ visible, onClose, onSubmit, initialData }) => {
  const [formData, setFormData] = useState<NotificationData>({
    recipient: '',
    subject: '',
    content: '',
  });

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    }
  }, [initialData]);

  // Nếu không visible thì không render (hoặc bạn có thể animate ẩn/hiện)
  if (!visible) return null;

  const handleChangeRecipient = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, recipient: e.target.value }));
  };

  const handleChangeSubject = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, subject: e.target.value }));
  };

  const handleEditorChange = (content: string) => {
    setFormData((prev) => ({ ...prev, content }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Gọi hàm onSubmit từ props, truyền dữ liệu form
    onSubmit(formData);
    // Sau đó đóng form (tùy ý)
    onClose();
  };

  return (
    <div
    className="
    fixed 
    top-20 
    right-8 
    w-[450px] 
    bg-white 
    border 
    border-gray-300 
    rounded-2xl
    shadow-lg
    max-h-[80vh]       
    overflow-y-auto    
  "
    >
      {/* Header */}
      <div className="flex justify-between items-center px-4 py-3 border-b bg-black rounded-t-2xl">
        <h2 className="text-lg font-semibold text-white">Gửi thông báo mới</h2>
        <button onClick={onClose} className="text-gray-300 hover:text-gray-100 transition-colors text-2xl font-bold leading-none">
          <span className="sr-only">Đóng</span>
          &times;
        </button>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="p-4">
        {/* Ô nhập Đối tượng nhận */}
        <div className="mb-4">
          <input
            id="recipient"
            type="text"
            value={formData.recipient}
            onChange={handleChangeRecipient}
            className="
              block w-full border 
              border-gray-300 rounded 
              px-3 py-2 
              focus:outline-none 
              focus:border-blue-500
            "
            placeholder="Nhập đối tượng nhận"
          />
        </div>

        {/* Ô nhập Chủ đề */}
        <div className="mb-4">
          <input
            id="subject"
            type="text"
            value={formData.subject}
            onChange={handleChangeSubject}
            className="
              block w-full border 
              border-gray-300 rounded 
              px-3 py-2 
              focus:outline-none 
              focus:border-blue-500
            "
            placeholder="Nhập chủ đề"
          />
        </div>

        {/* Editor TinyMCE */}
        <div className="mb-4">
          <Editor
            apiKey="iu2djsyo88cp8fxvbws4mwehia8n8ja0o4wqijxn71qises1"
            value={formData.content}
            onEditorChange={handleEditorChange}
            init={{
              height: 350,
              menubar: true,
              branding: false,
              statusbar: false,
              plugins: [
                'advlist autolink lists link image charmap print preview anchor',
                'searchreplace visualblocks code fullscreen',
                'insertdatetime media table paste code help wordcount',
              ],
              toolbar:
                'undo redo | formatselect | ' +
                'bold italic underline strikethrough | forecolor backcolor | ' +
                'alignleft aligncenter alignright alignjustify | ' +
                'bullist numlist outdent indent | link image media table | ' +
                'removeformat code fullscreen',
            }}
          />
        </div>

        {/* Nút Gửi */}
        <div className="flex justify-center">
          <Button className="primary">Gửi</Button>
        </div>
      </form>
    </div>
  );
};

export default NotificationForm;
