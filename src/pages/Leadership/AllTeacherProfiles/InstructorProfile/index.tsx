import { useEffect, useRef, useState } from 'react';
import TabSwitch from '../../../../components/TabSwitch/TabSwitch';
import { tabs } from './data';
import { useSearchParams } from 'react-router';
import { TeacherContext } from './TeacherContext';
const right = require('../../../../assets/icons/icon-arrow-right.png');

const InstructorProfile = () => {
  const [searchParams] = useSearchParams();
  const [activeTab, setActiveTab] = useState<string>('general');
  const tabFromURL = searchParams.get('tab') || 'general';
  const formRef = useRef<HTMLFormElement>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [teacherData, setTeacherData] = useState(null);
  const [teacherInfo, setTeacherInfo] = useState(null);
  const [teacherFamily, setTeacherFamily] = useState(null);
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Xử lý form data
    console.log('Form submitted');
  };
  useEffect(() => {
    setActiveTab(tabFromURL);
  }, [tabFromURL]);
  return (
    <TeacherContext.Provider
      value={{
        teacherData,
        teacherInfo,
        teacherFamily,
        setTeacherData,
        setTeacherInfo,
        setTeacherFamily,
      }}
    >
      <div>
        {activeTab === 'edit' ? (
          <div className="flex items-center gap-2 mb-4">
            <span className="text-gray-400 text-sm">Hồ sơ giảng viên</span>
            <img src={right} alt="next" className="w-2 h-2" />
            <h1 className="text-3xl font-bold text-black">Chỉnh sửa thông tin giảng viên</h1>
          </div>
        ) : (
          <h1 className="text-3xl font-bold text-black mb-4">Hồ sơ giảng viên</h1>
        )}

        <TabSwitch
          isSubmitting={isSubmitting}
          onSaveClick={() => formRef.current?.requestSubmit()}
          tabs={tabs}
          activeTab={activeTab}
          onTabChange={setActiveTab}
        />
      </div>
    </TeacherContext.Provider>
  );
};

export default InstructorProfile;
