import React, { useState } from 'react';
import { Editor } from '@tinymce/tinymce-react';
import AddressList from '../../../components/AddressUrlStack/Index';
import Button from '../../../components/Button';
import { useForm } from 'react-hook-form';
import createAxiosInstance from '../../../utils/axiosInstance';
import { toast } from 'react-toastify';

const labels = [{ link: '', linkName: 'Bạn có thắc mắc?' }];

const Help = () => {
  const [formData, setFormData] = useState({
    type: '',
    title: '',
    content: '',
  });
  const axiosInstance = createAxiosInstance();
  const isFormValid = formData.type && formData.title && formData.content;
  const {
    register,
    reset,
    setError,
    setValue,
    control,
    clearErrors,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm();
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleEditorChange = (content) => {
    setFormData({ ...formData, content: content });
  };
  const onSubmit = async () => {
    try {
      const response = await axiosInstance.post('api/support', formData);
      if (response.status === 200) {
        toast.success('Gửi thành công!');
        setFormData({
          type: '',
          title: '',
          content: '',
        });
      }
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="p-3">
      <div className="relative bg-gray-50 bg-white rounded-[8px] shadow-md mx-auto w-full min-full py-[37px] px-[64px] flex items-center">
        <div className="w-[65%]">
          <AddressList addressList={labels} />
          <div className="flex justify-between items-center mb-6">
            <p className="text-block">Chúng tôi sẽ phản hồi bạn trong thời gian sớm nhất có thể.</p>
          </div>
          <form onSubmit={handleSubmit(onSubmit)} className="w-full">
            <div className="flex gap-4 mb-4">
              {['Đào tạo', 'Học vụ', 'Hỗ trợ tài khoản', 'Khác'].map((option, index) => (
                <label key={index} className="flex items-center gap-2 font-bold">
                  <input type="radio" name="type" className="accent-blue-500" value={index + 1} onChange={handleChange} />
                  {option}
                </label>
              ))}
            </div>

            <input
              type="text"
              name="title"
              placeholder="Chủ đề"
              className="w-full border border-gray-300 rounded-lg p-2 mb-4"
              value={formData.title}
              onChange={handleChange}
            />
            <div className="border border-gray-300 rounded-lg p-2">
              <Editor
                apiKey="g2iyjej12q33eo50eowchns9r0c5fhvijleqryphx5hi0y24"
                value={formData.content}
                init={{
                  height: 320,
                  menubar: false,
                  plugins: 'lists link',
                  toolbar: 'bold italic underline | bullist numlist | alignleft aligncenter alignright',
                  placeholder: 'Để lại lời nhắn của bạn tại đây...',
                }}
                onEditorChange={handleEditorChange}
              />
            </div>
            <div className="flex justify-center mt-4">
              <Button className={`${isFormValid ? 'primary' : 'secondary'}`} type="submit" disabled={!isFormValid}>
                Gửi
              </Button>
            </div>
          </form>
        </div>

        <div className="absolute bg-[#FEF3EF] right-0 rounded-l-[8px] top-1/2 transform -translate-y-1/2 w-[35%] p-8 z-10 shadow-md">
          <h3 className="text-xl font-semibold mb-4">Thông tin</h3>

          <div className="flex items-start gap-2 mb-2">
            <span className="text-orange-600">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-geo-alt" viewBox="0 0 16 16">
                <path d="M12.166 8.94c-.524 1.062-1.234 2.12-1.96 3.07A32 32 0 0 1 8 14.58a32 32 0 0 1-2.206-2.57c-.726-.95-1.436-2.008-1.96-3.07C3.304 7.867 3 6.862 3 6a5 5 0 0 1 10 0c0 .862-.305 1.867-.834 2.94M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10" />
                <path d="M8 8a2 2 0 1 1 0-4 2 2 0 0 1 0 4m0 1a3 3 0 1 0 0-6 3 3 0 0 0 0 6" />
              </svg>
            </span>
            <div className="border-l-[1px] border-black px-4">
              <p>
                <strong>CN1:</strong> 86/33 Âu Cơ, Phường 9, Quận Tân Bình
              </p>
              <p>
                <strong>CN2:</strong> 86/33 Âu Cơ, Phường 9, Quận Tân Bình
              </p>
              <p>
                <strong>CN3:</strong> 86/33 Âu Cơ, Phường 9, Quận Tân Bình
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 mb-2">
            <span className="text-orange-600">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-telephone" viewBox="0 0 16 16">
                <path d="M3.654 1.328a.678.678 0 0 0-1.015-.063L1.605 2.3c-.483.484-.661 1.169-.45 1.77a17.6 17.6 0 0 0 4.168 6.608 17.6 17.6 0 0 0 6.608 4.168c.601.211 1.286.033 1.77-.45l1.034-1.034a.678.678 0 0 0-.063-1.015l-2.307-1.794a.68.68 0 0 0-.58-.122l-2.19.547a1.75 1.75 0 0 1-1.657-.459L5.482 8.062a1.75 1.75 0 0 1-.46-1.657l.548-2.19a.68.68 0 0 0-.122-.58zM1.884.511a1.745 1.745 0 0 1 2.612.163L6.29 2.98c.329.423.445.974.315 1.494l-.547 2.19a.68.68 0 0 0 .178.643l2.457 2.457a.68.68 0 0 0 .644.178l2.189-.547a1.75 1.75 0 0 1 1.494.315l2.306 1.794c.829.645.905 1.87.163 2.611l-1.034 1.034c-.74.74-1.846 1.065-2.877.702a18.6 18.6 0 0 1-7.01-4.42 18.6 18.6 0 0 1-4.42-7.009c-.362-1.03-.037-2.137.703-2.877z" />
              </svg>
            </span>
            <div className="border-l-[1px] border-black px-4">
              <p>(028) 2243 6888</p>
              <p>(028) 6268 1426</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-orange-600">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-envelope" viewBox="0 0 16 16">
                <path d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2zm2-1a1 1 0 0 0-1 1v.217l7 4.2 7-4.2V4a1 1 0 0 0-1-1zm13 2.383-4.708 2.825L15 11.105zm-.034 6.876-5.64-3.471L8 9.583l-1.326-.795-5.64 3.47A1 1 0 0 0 2 13h12a1 1 0 0 0 .966-.741M1 11.105l4.708-2.897L1 5.383z" />
              </svg>
            </span>
            <p className="border-l-[1px] border-black px-4">media_infor@alta.com.vn</p>
          </div>
        </div>

        <div className="absolute right-0 rounded-r-[8px] top-0 h-full bg-[#CC5C00] w-[15%]"></div>
      </div>
    </div>
  );
};

export default Help;
