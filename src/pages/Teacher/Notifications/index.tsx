import React, { useState } from 'react';
import SwitchTabCustom from '../../../components/SwitchTabCustom';
import Button from '../../../components/Button';
import NotificationUser from './NotificationUser/NotificationUser';
import NotificationSystem from './NotificationSystem/NotificationSystem';
import NotificationForm from './NotificationForm/NotificationForm';
import { NotificationData } from './NotificationForm/type';

const Notifications: React.FC = function Notifications() {
  const [activeTab, setActiveTab] = useState('user');
  const [open, setOpen] = useState(false);

  // Danh sách tab
  const tabs = [
    { label: 'Thông báo người dùng', value: 'user', content: <NotificationUser /> },
    { label: 'Thông báo hệ thống', value: 'system', content: <NotificationSystem /> },
  ];

  // Hàm đổi tab
  const handleTabChange = (tabValue: string) => {
    setActiveTab(tabValue);
  }

  // Hàm toggle trạng thái open/close form
  const handleToggleOpen = () => {
    setOpen((prev) => !prev);
  }

  // Hàm đóng form
  const handleClose = () => {
    setOpen(false);
  }

  // Hàm submit form
  const handleFormSubmit = (data: NotificationData) => {
    console.log('Dữ liệu form:', data);
    // Xử lý gửi API hoặc logic khác...
    setOpen(false);
  }


  const getActiveTabContent = () => {
    const foundTab = tabs.find(function (tab) {
      return tab.value === activeTab;
    });
    return foundTab ? foundTab.content : null;
  }

  return (
    <div>
      <h1 className="text-[#373839] text-5xl font-bold mb-8">Thông báo</h1>

      <div className="flex justify-between mb-8">
        <SwitchTabCustom
          className="h-[48px]"
          tabs={tabs}
          activeTab={activeTab}
          onTabChange={handleTabChange}
        />
        <Button className="mr-5 primary" onClick={handleToggleOpen}>
          Tạo thông báo
        </Button>
      </div>

      {/* Nội dung tab */}
      <div className="mt-4">{getActiveTabContent()}</div>

      {/* Form */}
      {open && (
        <NotificationForm
          visible={open}
          onClose={handleClose}
          onSubmit={handleFormSubmit}
        />
      )}
    </div>
  );
};

export default Notifications;
