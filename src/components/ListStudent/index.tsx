import { useState, useEffect, useRef } from 'react';
import './style.css';
import micOrg from '../../assets/icons/mic-org.png';
import micOff from '../../assets/icons/mic-off.png';
import micWhite from '../../assets/icons/mic-white.png';
import threeVertical from '../../assets/icons/Three-vertical.png';
import addStudent from '../../assets/icons/add-student.png';

interface Student {
  id: number;
  name: string;
  img: string;
}

interface ListStudentProps {
  students: Student[];
  className?: string;
}

const ListStudent: React.FC<ListStudentProps> = ({ students, className }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<number | null>(null);
  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const [micStatus, setMicStatus] = useState<{ [key: number]: boolean }>({});

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
        setOpenDropdown(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const toggleMic = (id: number) => {
    setMicStatus((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  return (
    <div className={`fixed left-0 h-screen w-64 bg-white shadow-lg left-20 ${className}`}>
      <div className="text-white p-4 flex justify-between items-center" style={{ backgroundColor: '#823B00' }}>
        <span className="titleStudent text-center">Danh sách học viên</span>
        <button onClick={() => setIsOpen(!isOpen)}>
          <img src={threeVertical} alt="More options" className="threeVertical" />
        </button>
        {isOpen && (
          <div ref={dropdownRef} className="dropdown1">
            <ul className="text-black">
              <li className="ps-2 hover:bg-gray-200 cursor-pointer">Tắt tiếng tất cả học sinh</li>
              <hr className="border-t-2 my-2" style={{ borderColor: '#823B00' }} />
              <li className="ps-2 hover:bg-gray-200 cursor-pointer">Tắt camera tất cả học sinh</li>
            </ul>
          </div>
        )}
      </div>

      <div className="p-2 overflow-y-auto h-[calc(95vh-56px)] no-scrollbar ps-5 pt-4 pr-5">
        {students.map((student, index) => (
          <div key={student.id} className="mb-2 relative">
            <img
              alt={`Ảnh của ${student.name}`}
              className="w-full h-24 object-cover rounded"
              src={`https://storage.googleapis.com/a1aa/image/${student.img}`}
            />
            <button className="absolute top-1 right-1 rounded" onClick={() => setOpenDropdown(openDropdown === student.id ? null : student.id)}>
              <img src={threeVertical} alt="More options" className="w-5 h-5" />
            </button>
            {openDropdown === student.id && (
              <div className="dropdown2" ref={dropdownRef}>
                <ul className="text-black">
                  <li className="hover:bg-gray-200 cursor-pointer">Tắt tiếng học viên</li>
                  <hr className="border-t-2 my-2" style={{ borderColor: '#823B00' }} />
                  <li className="hover:bg-gray-200 cursor-pointer">Bật/Tắt camera học viên</li>
                  <hr className="border-t-2 my-2" style={{ borderColor: '#823B00' }} />
                  <li className="hover:bg-gray-200 cursor-pointer">Cấp quyền quản trị chi học viên</li>
                  <hr className="border-t-2 my-2" style={{ borderColor: '#823B00' }} />
                  <li className="hover:bg-gray-200 cursor-pointer">Mời học viên ra khỏi tiết học này</li>
                </ul>
              </div>
            )}
            <div className="bg-name absolute bottom-0 left-0 right-0 p-1 text-white flex justify-between items-center">
              <span className="ml-2">{student.name}</span>
              <button className="mr-2" onClick={() => index !== 0 && toggleMic(student.id)}>
                <img src={index === 0 ? micOrg : micStatus[student.id] ? micWhite : micOff} alt="Microphone" className="micWhite" />
              </button>
            </div>
          </div>
        ))}
      </div>
      <div className="addStudent">
        <button>
          <img src={addStudent} alt="" className="iconaddStudent" />
        </button>
      </div>
    </div>
  );
};

export default ListStudent;
