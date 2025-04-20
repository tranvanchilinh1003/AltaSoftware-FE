import React, { useState, useEffect } from 'react';
import AddressList from '../../../../components/AddressUrlStack/Index';
import paperclip from '../../../../assets/icons/u_paperclip.png';
import { useTimer } from 'react-timer-hook';

const ExamInfo = () => {
  const addressList = [
    { linkName: 'Bài kiểm tra', link: '#' },
    { linkName: 'Làm bài', link: '#' },
    { linkName: '10A1', link: '#' },
  ];

  const TOTAL_TIME = 3600; // 1 giờ
  const WARNING_TIME = 600; // 10 phút
  const RADIUS_OUTER = 50;
  const RADIUS_INNER = 42;
  const CIRCUMFERENCE_OUTER = 2 * Math.PI * RADIUS_OUTER;
  const CIRCUMFERENCE_INNER = 2 * Math.PI * RADIUS_INNER;

  const expiryTimestamp = new Date();
  expiryTimestamp.setSeconds(expiryTimestamp.getSeconds() + TOTAL_TIME);

  const { totalSeconds, minutes, seconds } = useTimer({ expiryTimestamp, autoStart: true });

  const [showWarningPopup, setShowWarningPopup] = useState(false);
  const [showEndPopup, setShowEndPopup] = useState(false);
  const [countdown, setCountdown] = useState(3);

  useEffect(() => {
    if (totalSeconds === WARNING_TIME) {
      setShowWarningPopup(true);
    }
    if (totalSeconds === 0) {
      setShowEndPopup(true);
      let countdownTimer = setInterval(() => {
        setCountdown((prev) => {
          if (prev === 1) {
            clearInterval(countdownTimer);
            window.location.href = '/student';
          }
          return prev - 1;
        });
      }, 1000);
    }
  }, [totalSeconds]);

  const percent = totalSeconds / TOTAL_TIME;
  const strokeDashoffsetOuter = CIRCUMFERENCE_OUTER * (1 - percent);
  const strokeDashoffsetInner = CIRCUMFERENCE_INNER * (1 - percent);

  return (
    <div className="border-b border-gray-200 px-8">
      <div className="mb-2">
        <AddressList addressList={addressList} />
      </div>

      <div className="flex justify-between items-center">
        <div className="text-sm text-gray-700 space-y-1">
          <div className="grid grid-cols-2 gap-x-8 gap-y-1">
            <p>
              <strong>Môn học:</strong> Toán
            </p>
            <p>
              <strong>Ngày kiểm tra:</strong> Thứ 5 - Ngày 10 Tháng 8, 2020
            </p>
            <p>
              <strong>Lớp:</strong> 10A1
            </p>
            <p>
              <strong>Thời lượng:</strong> 45 phút
            </p>
            <p>
              <strong>Đề bài:</strong> Đề A
            </p>
            <p className="flex items-center">
              <strong className="mr-2">Tệp đính kèm:</strong>
              <span className="bg-gray-100 px-3 py-1 rounded-md flex items-center text-sm">
                <img src={paperclip} alt="" className="w-4 h-4 text-orange-500 mr-1" />
                DSTT_KT45P_12A1.doc
              </span>
            </p>
          </div>
        </div>

        <div className="relative flex flex-col items-center">
          <div className="relative w-24 h-24">
            <svg className="absolute inset-0 w-full h-full" viewBox="0 0 110 110">
              <defs>
                <linearGradient id="gradientOuter">
                  <stop offset="0%" stopColor="#cad8f6" />
                  <stop offset="100%" stopColor="#1E90FF" />
                </linearGradient>
              </defs>
              <circle cx="55" cy="55" r={RADIUS_OUTER} className="stroke-gray-200 stroke-[6] fill-none" />
              <circle
                cx="55"
                cy="55"
                r={RADIUS_OUTER}
                className="stroke-[6] fill-none transition-all duration-1000 ease-linear"
                stroke="url(#gradientOuter)"
                strokeDasharray={CIRCUMFERENCE_OUTER}
                strokeDashoffset={strokeDashoffsetOuter}
                strokeLinecap="round"
              />
              <circle cx="55" cy="55" r={RADIUS_INNER} className="stroke-gray-300 stroke-[1] fill-white" />
              <circle
                cx="55"
                cy="55"
                r={RADIUS_INNER}
                className="stroke-blue-400 stroke-[2] fill-none transition-all duration-1000 ease-linear"
                strokeDashoffset={strokeDashoffsetInner}
                strokeLinecap="round"
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-xs italic">Còn lại</span>
              <span className="text-lg text-blue-500 font-semibold">
                {minutes}:{seconds < 10 ? '0' : ''}
                {seconds}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Popup cảnh báo 10 phút */}
      {showWarningPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-5">
          <div className="bg-white p-6 rounded-lg shadow-lg w-[500px] text-center border border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900">Lưu ý</h2>
            <p className="text-gray-900 mt-2 text-start">Còn 10 phút nữa là hết thời lượng làm bài kiểm tra, học viên kiểm tra và lưu lại bài.</p>
            <button
              className="mt-6 bg-orange-500 text-white px-6 py-2 rounded-md text-lg font-semibold shadow-md hover:bg-orange-600"
              onClick={() => setShowWarningPopup(false)}
            >
              Đã hiểu
            </button>
          </div>
        </div>
      )}

      {/* Popup hết thời gian */}
      {showEndPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-[500px] text-center border border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900">Hết thời gian</h2>
            <p className="text-gray-900 mt-2">Hết thời gian làm bài, bài kiểm tra đã được hệ thống lưu tự động.</p>
            <p className="text-red-500 mt-2 font-semibold">Tự động quay lại trang chủ sau {countdown} giây...</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default ExamInfo;
