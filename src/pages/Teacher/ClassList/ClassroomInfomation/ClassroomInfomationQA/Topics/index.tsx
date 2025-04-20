import React, { useState } from 'react';
import data from './data';
import icon from './icon';

const TopicQA = () => {
  const [isReplying, setIsReplying] = useState(false);

  return (
    <div className="mt-3 rounded-lg shadow-lg w-full h-[600px] mx-auto">
      {/* Header với hiệu ứng mờ */}
      <div className="p-3 bg-white/50 flex items-center justify-between px-4 py-2 rounded-t-lg drop-shadow-2xl shadow-gray-300">
        <div>
          <h1 className="font-bold text-lg mb-2">
            Topic: <span>Tại sao nước biển lại mặn?</span>
          </h1>
          <p className="text-gray-500 text-sm flex items-center">
            <img src={icon.clock} alt="clock" className="w-4 h-4 mr-1" /> 16:00
            <span className="mx-2">|</span>
            <img src={icon.calendar} alt="calendar" className="w-4 h-4 mr-1" /> 22 tháng 10, 2020
          </p>
        </div>
        {!isReplying ? (
          <button
            children="Trả lời"
            className="w-24 h-8 font-bold bg-[#FFD8B8] text-black-text border border-border-orange rounded-md"
            onClick={() => setIsReplying(true)}
          />
        ) : (
          <button children="Hủy" className="w-24 h-8 font-bold text-orange-text" onClick={() => setIsReplying(false)} />
        )}
      </div>

      <div className="p-3 overflow-y-auto max-h-[540px]">
        {data.map((item) => (
          <div key={item.id} className="mb-3 p-2">
            <p className="ml-10 text-black-text mb-10">{item.question}</p>
            {item.replies && item.replies.length > 0 && (
              <div>
                {item.replies.map((reply) => (
                  <div key={reply.id} className="ml-10 ">
                    <div className="mb-2">
                      <div className="flex items-center mb-1">
                        <img src={reply.avatar} alt={reply.author} className="w-8 h-8 rounded-full mr-2" />
                        <div>
                          <h3 className="text-sm font-bold text-orange-text">
                            {reply.author} <span className="text-grey-text font-normal">— {reply.role}</span>
                          </h3>
                          <p className="text-xs text-grey-text">
                            {reply.date} • {reply.time}
                          </p>
                        </div>
                      </div>
                      <div>
                        <p className="text-black-text text-sm ml-10">{reply.text}</p>
                        <img src={reply.imageUrl} alt="" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}

        {isReplying && (
          <div className="flex items-start border border-gray-300 rounded-lg p-3 mt-28 w-full">
            <img
              src={icon.u_paperclip}
              alt="Icon"
              className="w-6 h-6 mt-1 opacity-50 filter invert-[40%] sepia-[80%] saturate-[500%] hue-rotate-[10deg] brightness-[90%] contrast-[90%]"
            />
            <textarea placeholder="Nhập câu trả lời..." className="flex-1 outline-none bg-transparent text-gray-600 resize-none p-2 mx-3" rows={3} />
            <button className="text-orange-500">
              <img src={icon.send} alt="icon" className="w-6 h-6" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default TopicQA;
