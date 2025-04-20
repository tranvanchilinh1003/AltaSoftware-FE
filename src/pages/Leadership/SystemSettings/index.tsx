import React from 'react';
import { useNavigate } from 'react-router';

const SystemSettings: React.FC = () => {
  const navigator = useNavigate();
  const buttons = [
    {
      variant: 'orange',
      title: (
        <div className="text-center">
          <h1 className="text-white text-[28px] font-bold">Cấu hình</h1>
          <p className="text-white font-bold">Theme, các thông tin khác về cấu hình</p>
        </div>
      ),
      handle: () => {
        navigator('/leadership/system-settings/config');
      }
    },
    {
      variant: 'orange',
      title: (
        <div className="text-center">
          <h1 className="text-white text-[28px] font-bold">Thông tin trường</h1>
          <p className="text-white font-bold">Thông tin chung của trường, các cơ sở</p>
        </div>
      ),
      handle: () => {
        navigator('/leadership/system-settings/school-info');
      }
    },
    {
      variant: 'orange',
      title: (
        <div className="text-center">
          <h1 className="text-white text-[28px] font-bold">Người dùng hệ thống</h1>
          <p className="text-white font-bold px-2">Phần nhóm người dùng, quản lý thông tin người dùng và phân quyền sử dụng</p>
        </div>
      ),
      handle: () => {
        navigator('/leadership/system-settings/user-management');
      }
    },
    {
      variant: 'primary',
      title: (
        <div className="text-center">
          <h1 className="text-white text-[28px] font-bold">Thiết lập lớp học</h1>
          <p className="text-white font-bold">Loại lớp cơ bản, nâng cao</p>
        </div>
      ),
      handle: () => {
        navigator('/leadership/system-settings/classroom-settings');
      }
    },
    {
      variant: 'primary',
      title: (
        <div className="text-center">
          <h1 className="text-white text-[28px] font-bold">Thiết lập môn học</h1>
          <p className="text-white font-bold">Thông tin các hệ đào tạo của trường</p>
        </div>
      ),
      handle: () => {
        navigator('/leadership/system-settings/subject-management');
      }
    },
    {
      variant: 'primary',
      title: (
        <div className="text-center">
          <h1 className="text-white text-[28px] font-bold px-2">Quản lý trình độ đào tạo</h1>
          <p className="text-white font-bold">Thông tin các hệ đào tạo của trường</p>
        </div>
      ),
      handle: () => {
        navigator('/leadership/system-settings/training-level-management');
      }
    },
    {
      variant: 'orange',
      title: (
        <div className="text-center">
          <h1 className="text-white text-[28px] font-bold px-2">Đổi mật khẩu</h1>
          <p className="text-white font-bold">Đổi lại mật khẩu của bạn</p>
        </div>
      ),
      handle: () => {
        navigator('/leadership/system-settings/training-level-management');
      }
    },
  ];
  return (
    <div className="pr-20 pl-10">
      <div className="w-[100%]">
        <p className="text-3xl font-bold mb-5">Cài đặt hệ thống</p>
        <div className="w-full flex justify-around flex-wrap">
          {buttons.map((item, index) => (
            <button
              key={index}
              className={`w-[340px] h-[120px] mb-4 ${
                item?.variant === 'orange' ? 'bg-gradient-to-r from-[#F17F21] to-[#FF5400]' : 'bg-gradient-to-r from-[#56CCF2] to-[#2F80ED]'
              } flex items-center justify-center rounded-xl`}
              onClick={item?.handle}
            >
              {item?.title}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SystemSettings;
