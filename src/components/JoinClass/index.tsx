import { useState } from 'react';
import icon from '../../assets/icons/orange_eye_outline.png';
import icon_minus from '../../assets/icons/orange_eye_outline_minus.png';

interface JoinClassProps {
  className?: string;
  isOpen: boolean;
  onClose: () => void;
}

const JoinClass: React.FC<JoinClassProps> = ({ className = '', isOpen, onClose }) => {
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [classCode, setClassCode] = useState('');

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black opacity-85">
      <div className={`bg-white p-6 rounded-2xl shadow-lg w-96`}>
        <h2 className="text-font-Mulish text-Mulish-2 font-bold text-center mb-6 mt-6">Tham gia lớp học</h2>
        <input
          type="text"
          placeholder="ID hoặc link lớp học"
          className="w-full px-4 py-2 border rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-blue-text text-blue- text-font-Source-Sans-Pro text-Source-Sans-Pro-1 text-Source-Sans-Pro-3 "
          value={classCode}
          onChange={(e) => setClassCode(e.target.value)}
        />

        <div className="relative mb-10">
          <input
            type={showPassword ? 'text' : 'password'}
            placeholder="Mật khẩu lớp học"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-text text-blue-text text-font-Source-Sans-Pro text-Source-Sans-Pro-1 text-Source-Sans-Pro-3 "
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="button" className="absolute inset-y-0 right-3 flex items-center text-xl" onClick={() => setShowPassword(!showPassword)}>
            {showPassword ? (
              <img src={icon} alt="Show Password" className="w-6 h-6 show-password-icon" />
            ) : (
              <img src={icon_minus} alt="Hide Password" className="w-7 h-6 hide-password-icon" />
            )}
          </button>
        </div>

        <div className="flex justify-center gap-[50px]">
          <button onClick={onClose} className="w-full px-4 py-2 bg-[#F2F2F2] rounded-lg text-font-Mulish text-Mulish-4 font-Mulish">
            Hủy
          </button>
          <button className="w-full px-4 py-2 bg-background-orange-1 text-white text-font-Mulish text-Mulish-4 font-Mulish rounded-lg">
            Tham gia
          </button>
        </div>
      </div>
    </div>
  );
};

export default JoinClass;
