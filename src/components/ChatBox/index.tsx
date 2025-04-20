import React, { useRef, useState } from 'react';
import teacherAvt from '../../assets/images/teacher.png';

const ChatBox: React.FC<ChatBoxProps> = ({ classname }) => {
  const [isRotated, setRotate] = useState(false);
  const [activeTab, setActiveTab] = useState<{ id: number; title: string } | null>(null);
  const arrowRef = useRef<HTMLParagraphElement>(null);
  const boxRef = useRef<HTMLDivElement>(null);
  const boixContentRef = useRef<HTMLDivElement>(null);

  const tabs = [
    { id: 0, title: 'Trò chuyện với lớp' },
    { id: 1, title: 'Hỏi đáp' },
    { id: 2, title: 'Tin nhắn đã ghim' },
  ];

  const handleSetTab = (item: any) => {
    setActiveTab(item);
  };

  const handleSetRotate = () => {
    setRotate(!isRotated);
    if (arrowRef.current) {
      arrowRef.current.style.transform = isRotated ? 'rotate(0deg)' : 'rotate(-90deg)';
      arrowRef.current.style.transition = 'transform 0.3s ease';
    }
    setActiveTab(null);
  };

  const dataMau = [
    { avt: 'teacher.png', text: 'hello!' },
    { avt: 'teacher.png', text: 'xin chào!' },
    { avt: 'teacher.png', text: 'hi!' },
    { avt: 'teacher.png', text: 'halo!' },
    { avt: 'teacher.png', text: 'ohayo!' },
    { avt: 'teacher.png', text: 'ciao!' },
    { avt: 'teacher.png', text: 'ciaolo!' },
    { avt: 'teacher.png', text: 'ê!' },
    {
      avt: 'teacher.png',
      text: `Đoạn văn là một khái niệm quan trọng trong viết văn, tạo nên sự tổ chức và sắp xếp logic cho nội dung. 
      Nó không chỉ mang trong mình một nội dung nhất định mà còn phản ánh sự phân đoạn hình thức của văn bản.!`,
    },
    { avt: 'teacher.png', text: 'hello!' },
  ];

  return (
    <div className={`w-full ${classname} rounded-t-2xl bg-white shadow-[-8px_7px_15px_0px_rgba(186,222,255,0.35)]`}>
      <button className="w-full h-[40px] rounded-t-lg bg-[#F0F3F6] shadow-[0px_0px_10px_0px_rgba(71,138,200,0.25)]" onClick={handleSetRotate}>
        <p className="text-center pb-0 w-full flex items-center justify-center font-bold text-[#373839]">
          <span className="text-orange-500" ref={arrowRef}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-7">
              <path
                fillRule="evenodd"
                d="M7.72 12.53a.75.75 0 0 1 0-1.06l7.5-7.5a.75.75 0 1 1 1.06 1.06L9.31 12l6.97 6.97a.75.75 0 1 1-1.06 1.06l-7.5-7.5Z"
                clipRule="evenodd"
              />
            </svg>
          </span>
          {activeTab?.id ? activeTab?.title : 'Trò truyện vói lớp'}
          <span>
            <span className="relative flex h-3 w-3 ms-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-500 opacity-75"></span>
              <span className="relative inline-flex items-center justify-center rounded-full h-3 w-3 bg-orange-500 text-[10px] text-white font-bold">
                9
              </span>
            </span>
          </span>
        </p>
      </button>
      <div
        className="w-full overflow-hidden transition-all duration-300 ease-in-out"
        ref={boxRef}
        style={{
          maxHeight: isRotated ? '500px' : '0px',
        }}
      >
        <div className="">
          {activeTab === null ? (
            <div className="flex flex-col items-start ps-5 bg-yellow-50">
              {tabs.map((item, index) => (
                <button className="hover:text-sky-500" key={index} onClick={handleSetTab.bind(null, item)}>
                  {item.title}
                </button>
              ))}
            </div>
          ) : (
            <div className="w-full max-h-[500px] overflow-auto relative flex flex-col">
              <div className="flex-1 overflow-y-auto p-3 space-y-2">
                {dataMau.map((item, index) => (
                  <div key={index} className="flex items-center">
                    <img src={`${teacherAvt}`} alt="avt" className="max-w-[30px]" />
                    <div className="bg-gray-200 p-2 rounded-lg w-fit max-w-xs ms-4">{item?.text}</div>
                  </div>
                ))}
              </div>
              <div className="p-3 border-t border-gray-300 flex gap-3 bg-white items-center h-[140px]">
                <textarea
                  placeholder={'Nhập tin nhắn'}
                  className="flex-1 p-3 text-lg border rounded-lg outline-none bg-transparent resize-none h-full max-h-32 overflow-auto"
                ></textarea>
                <button className="text-orange-500 text-xl">➤</button>
              </div>
            </div>
          )} 
        </div>
      </div>
    </div>
  );
};

export default ChatBox;

interface ChatBoxProps {
  classname?: String;
  style?: React.CSSProperties;
}
